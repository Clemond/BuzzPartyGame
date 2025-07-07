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
  activeGames[code] = {
    hostId: socket.id,
    players: []
  };
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
    const game = activeGames[gameCode];
    if (!game) return;

    if (game.players.includes(username)) {
      socket.emit("usernameRejected", { reason: "Username already taken" });
      return;
    }

    game.players.push(username);

    io.to(gameCode).emit("playersUpdated", game.players);
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
