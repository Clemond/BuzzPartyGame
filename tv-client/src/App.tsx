import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [gameCode, setGameCode] = useState<string | null>(null);

  return (
    <div className="Container">
      <h1>Lobby</h1>
      <p>Join Code: {gameCode || "Generating..."}</p>
    </div>
  );
}
