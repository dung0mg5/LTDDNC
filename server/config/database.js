const mongoose = require("mongoose");

class Database {
  constructor(uri, options) {
    this.uri = uri;
    this.options = options;
  }

  async connect() {
    await mongoose.connect(this.uri, this.options);

    console.log(
      `Connected to database: ${mongoose.connection.db.databaseName}`,
    );
  }

  async disconnect() {
    await mongoose.disconnect();

    console.log(
      `Disconnected from database: ${mongoose.connection.db.databaseName}`,
    );
  }
}

module.exports = Database;
