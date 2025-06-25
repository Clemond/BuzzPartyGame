import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

export default function App() {
  const [gameCode, setGameCode] = useState<string | null>(null);
  const [players, setPlayers] = useState<string[]>([]);

  useEffect(() => {
    socket.on("gameCreated", (code: string) => {
      setGameCode(code);
    });
    socket.on("newPlayer", ({ username }: { username: string }) => {
      console.log("TV received new player:", username);

      setPlayers((prev) => [...prev, username]);
    });

    return () => {
      socket.off("gameCreated");
      socket.off("newPlayer");
    };
  }, []);

  return (
    <div className="Container">
      <h1>Lobby</h1>
      <p>Join Code: {gameCode || "Generating..."}</p>
      <div>
        <h2>Players:</h2>
        <ul>
          {players.map((player, index) => (
            <li key={index}>{player}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
