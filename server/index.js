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
      socket.join(enteredCode);
      socket.emit("joinAccepted");
    } else {
      socket.emit("joinRejected");
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);

    for (const [code, id] of Object.entries(activeGames)) {
      if (id === socket.id) {
        delete activeGames[code];
        console.log(`Game code ${code} removed`);
        break;
      }
    }
  });

  socket.on("usernameChosen", ({ gameCode, username }) => {
    console.log(`User ${username} joined the game ${gameCode}`);

    io.to(gameCode).emit("newPlayer", username);
  });
});
