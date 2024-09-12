require("dotenv").config();

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

const socketIo = require("socket.io");
const http = require("http");
const Database = require("./config/database");

// const db =
//   process.env.NODE_ENV === "production"
//     ? new Database(process.env.DB_HOST, {})
//     : new Database(process.env.DB_LOCAL, {});

const db = new Database(process.env.DB_HOST, {})


db.connect();

const app = require("./app");

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
  console.log(`App is running on port ${process.env.PORT}`);
});

const io = socketIo(server, {
  pingTimeout: 60000,
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Connected to Socket.io");

  socket.on("setup", (userId) => {
    console.log(userId);
    socket.join(userId);
    socket.emit("connected");
  });

  socket.on("join-chat", (room) => {
    socket.join(room);
    console.log(`User Joined Room: ${room}`);
  });

  socket.on("new-message", (newMessage) => {
    const { chat } = newMessage;

    chat.users.forEach((user) => {
      if (user === newMessage.sender._id) return;

      socket.in(user).emit("message-received", newMessage);
    });
  });
});

process.on("SIGINT", async () => {
  try {
    await db.disconnect();
    console.log("Disconnected from database.");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// for deploying heroku
process.on("SIGTERM", () => {
  console.log("👋 SIGTERM RECEIVED. Shutting down gracefully");
  server.close(() => {
    console.log("💥 Process terminated!");
  });
});
