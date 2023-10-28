const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

// Middleware
app.use(cors());

const server = http.createServer(app);

// Establishing connection between socket.io server and express server
const io = new Server(server, {
  // To resolve cors issues, informing that the client request will originate from http://localhost:3000
  // and methods
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Socket io works with events
// Listening for connection event
io.on("connection", (socket) => {
  console.log(`User Connected - ${socket.id}`);

  //   Listening for Join Room event
  // data sent from client(socket.emit()) will be in room
  socket.on("Join Study Group", (group) => {
    // Socket io is preferred over http because it sends data from client to server without http request
    socket.join(group);
    console.log(`Socket ${socket.id} joined group ${group}`);
  });

  socket.on("Send Message", (messageData) => {
    console.log(messageData);
    // to - To which room
    console.log("Receive");
    socket.to(messageData.group).emit("Receive Message", messageData);
  });

  //   Disconnect from server, for ex. Closing a tab
  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(3001, () => {
  console.log("Server Running");
});
