const fs = require("fs");
const User = require("../src/api/v1/models/user.model");
const Company = require("../src/out/models/company.model");
const University = require("../src/out/models/university.model");
const Connection = require("../src/api/v1/models/connection.model");
const Relationship = require("../src/api/v1/models/relationship.model");

require("dotenv").config();
const Database = require("../config/database");

// const db =
//   process.env.NODE_ENV === "production"
//     ? new Database(process.env.DB_HOST, {})
//     : new Database(process.env.DB_LOCAL, {});

const db = new Database(process.env.DB_HOST, {})

db.connect();

let users;
let companies;
let universities;
let jobs;
let chats;
let messages;
let connections;
let relationships;

async function createConnection() {
  await Promise.all(
    connections.map(async (connection) => {
      const reqConnection = await Connection.create({
        requester: connection.requester,
        recipient: connection.recipient,
        status: connection?.status || 1,
        note: connection.note,
      });

      const recConnection = await Connection.create({
        requester: connection.recipient,
        recipient: connection.requester,
        status: connection?.status || 2,
        note: connection.note,
      });

      await User.findByIdAndUpdate(connection.requester, {
        $push: { connections: reqConnection._id },
      });

      await User.findByIdAndUpdate(connection.recipient, {
        $push: { connections: recConnection._id },
      });

      if (connection.status === 3) {
        await Relationship.create({
          follower: connection.requester,
          following: connection.recipient,
        });
        await Relationship.create({
          follower: connection.recipient,
          following: connection.requester,
        });
        await Promise.all([
          User.findByIdAndUpdate(
            connection.requester,
            {
              $addToSet: { following: connection.recipient },
            },
            { new: true },
          ),
          User.findByIdAndUpdate(
            connection.recipient,
            {
              $addToSet: { followers: connection.requester },
            },
            { new: true },
          ),
        ]);
        await Promise.all([
          User.findByIdAndUpdate(
            connection.recipient,
            {
              $addToSet: { following: connection.requester },
            },
            { new: true },
          ),
          User.findByIdAndUpdate(
            connection.requester,
            {
              $addToSet: { followers: connection.recipient },
            },
            { new: true },
          ),
        ]);
      }
    }),
  );
}

async function deleteConnection() {
  await Connection.deleteMany();
  await User.updateMany({}, { $set: { connections: [] } });
  await Relationship.deleteMany();
  await User.updateMany({}, { $set: { followers: [], following: [] } });
}

async function createRelationship() {
  await Promise.all(
    relationships.map(async (relationship) => {
      await Relationship.create({
        follower: relationship.follower,
        following: relationship.following,
      });
      await Promise.all([
        User.findByIdAndUpdate(
          relationship.follower,
          {
            $addToSet: { following: relationship.following },
          },
          { new: true },
        ),
        User.findByIdAndUpdate(
          relationship.following,
          {
            $addToSet: { followers: relationship.follower },
          },
          { new: true },
        ),
      ]);
    }),
  );
}

async function deleteRelationship() {
  await Relationship.deleteMany();
  await User.updateMany({}, { $set: { followers: [], following: [] } });
}

// READ DATA FROM FILE JSON
switch (process.argv[3]) {
  case "--users":
    users = JSON.parse(
      fs.readFileSync(`${__dirname}/users.json`, { encoding: "utf-8" }),
    );
    console.log("Importing users...");
    break;
  case "--companies":
    companies = JSON.parse(
      fs.readFileSync(`${__dirname}/companies.json`, { encoding: "utf-8" }),
    );
    console.log("Importing companies...");
    break;
  case "--universities":
    universities = JSON.parse(
      fs.readFileSync(`${__dirname}/universities.json`, { encoding: "utf-8" }),
    );
    console.log("Importing universities...");
    break;
  case "--jobs":
    break;
  case "--chats":
    break;
  case "--messages":
    break;
  case "--connections":
    connections = JSON.parse(
      fs.readFileSync(`${__dirname}/connections.json`, { encoding: "utf-8" }),
    );
    console.log("Importing connections...");
    break;
  case "--relationships":
    relationships = JSON.parse(
      fs.readFileSync(`${__dirname}/relationships.json`, { encoding: "utf-8" }),
    );
    console.log("Importing relationship...");
    break;
  default:
    break;
}

// IMPORT DATA INTO DATABASE
const importData = async () => {
  try {
    switch (process.argv[3]) {
      case "--users":
        await User.create(users);
        break;
      case "--companies":
        await Company.create(companies);
        break;
      case "--universities":
        await University.create(universities);
        break;
      case "--jobs":
        break;
      case "--chats":
        break;
      case "--messages":
        break;
      case "--connections":
        await createConnection();
        break;
      case "--relationships":
        await createRelationship();
        break;
      default:
        break;
    }
    console.log("Data successfully loaded!");
  } catch (err) {
    console.error(err);
  }

  process.exit();
};
// DELETE ALL DATA FROM DATABASE
const deleteData = async () => {
  try {
    switch (process.argv[3]) {
      case "--users":
        await User.deleteMany();
        break;
      case "--companies":
        await Company.deleteMany();
        break;
      case "--universities":
        await University.deleteMany();
        break;
      case "--jobs":
        break;
      case "--chats":
        break;
      case "--messages":
        break;
      case "--connections":
        await deleteConnection();
        break;
      case "--relationships":
        await deleteRelationship();
        break;
      default:
        break;
    }

    console.log("Data successfully deleted!");
  } catch (err) {
    console.error(err);
  }
  process.exit();
};
// CHECK ARGUMENTS
if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--destroy") {
  deleteData();
}
