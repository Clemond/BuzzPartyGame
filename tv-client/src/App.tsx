import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

export default function App() {
  const [gameCode, setGameCode] = useState<string | null>(null);

  useEffect(() => {
    socket.on("gameCreated", (code: string) => {
      setGameCode(code);
    });

    return () => {
      socket.off("gameCreated");
    };
  }, []);

  return (
    <div className="Container">
      <h1>Lobby</h1>
      <p>Join Code: {gameCode || "Generating..."}</p>
    </div>
  );
}
