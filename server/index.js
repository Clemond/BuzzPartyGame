const { Server } = require("socket.io");

const io = new Server(3001, {
  cors: {
    origin: "*"
  }
});

const activeGames = {};

function generateJoinCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

io.on("connection", (socket) => {
  const code = generateJoinCode();
  activeGames[code] = socket.id;
  socket.join(code);
  socket.emit("gameCreated", code);

  socket.on("joinGame", (enteredCode) => {
    if (activeGames[enteredCode]) {
      socket.join(enteredCode);
      socket.emit("joinAccepted");
    } else {
      socket.emit("joinRejected");
    }
  });

  socket.on("usernameChosen", ({ gameCode, username }) => {
    io.to(gameCode).emit("newPlayer", { username });
  });

  socket.on("disconnect", () => {
    for (const [code, id] of Object.entries(activeGames)) {
      if (id === socket.id) {
        delete activeGames[code];
        break;
      }
    }
  });
});
