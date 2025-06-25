import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

export default function App() {
  const [code, setCode] = useState("");
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    socket.on("joinAccepted", () => {
      setConnected(true);
      console.log("✅ Connected to game!");
    });

    socket.on("joinRejected", () => {
      Alert.alert("Invalid Code", "Please enter a valid game code.");
    });

    return () => {
      socket.off("joinAccepted");
      socket.off("joinRejected");
    };
  }, []);

  const handleSubmit = () => {
    socket.emit("joinGame", code);
  };

  return (
    <View style={styles.container}>
      {connected ? (
        <Text style={styles.success}>You're in the game!</Text>
      ) : (
        <>
          <Text style={styles.label}>Enter Game Code</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            maxLength={6}
            value={code}
            onChangeText={setCode}
            placeholder="123456"
          />
          <Button title="Join Game" onPress={handleSubmit} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    backgroundColor: "#f7f7f7"
  },
  label: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center"
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    fontSize: 18,
    textAlign: "center",
    backgroundColor: "#fff"
  },
  success: {
    fontSize: 24,
    textAlign: "center",
    color: "green"
  }
});
