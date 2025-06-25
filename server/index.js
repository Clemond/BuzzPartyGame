const { Server } = require("socket.io");

const io = new Server(3001, {
  cors: {
    origin: "*"
  }
});

console.log("Server is running...");

const activeGames = {};

function generateJoinCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  const code = generateJoinCode();
  activeGames[code] = socket.id;
  socket.emit("gameCreated", code);

  socket.on("joinGame", (enteredCode) => {
    if (activeGames[enteredCode]) {
      socket.emit("joinAccepted");
    } else {
      socket.emit("joinRejected");
    }
  });
});
