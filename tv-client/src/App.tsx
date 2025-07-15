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
      <p>Join Code: {gameCode || "Generating..."}</p>
      <div>
        <h2>Players:</h2>
        <p>
          {players.map((player, index) => (
            <p className="PlayerCard" key={index}>
              {player}
            </p>
          ))}
        </p>
      </div>
    </div>
  );
}
