import { useEffect, useState } from "react";
import io from "socket.io-client";
import "./App.css";

const socket = io("http://localhost:3001");

export default function App() {
  const [gameCode, setGameCode] = useState<string | null>(null);
  const [players, setPlayers] = useState<string[]>([]);

  useEffect(() => {
    socket.on("gameCreated", (code: string) => {
      setGameCode(code);
    });
    socket.on("playersUpdated", (updatedPlayers: string[]) => {
      setPlayers(updatedPlayers);
    });

    return () => {
      socket.off("gameCreated");
      socket.off("playersUpdated");
    };
  }, []);

  return (
    <div className="Container">
      <h1>Welcome to the Lobby</h1>
      <div className="JoinCode">{gameCode || "Generating..."}</div>
      <h2>Players:</h2>
      <div className="PlayerList">
        {players.map((player, index) => (
          <div className="PlayerCard" key={index}>
            {player}
          </div>
        ))}
      </div>
    </div>
  );
}
