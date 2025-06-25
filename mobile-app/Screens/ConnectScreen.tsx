import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { getSocket } from "../utils/socket";
import UseTypeNavigation from "../hooks/useTypeNavigation";

export default function ConnectScreen() {
  const [code, setCode] = useState("");
  const socket = getSocket();
  const navigation = UseTypeNavigation();

  const handleSubmit = () => {
    const enteredCode = code.trim();

    if (enteredCode.length === 0) {
      Alert.alert("Error", "Please enter a game code.");
      return;
    }

    socket.once("joinAccepted", () => {
      navigation.navigate("CreateUsernameScreen", { gameCode: enteredCode });
    });

    socket.once("joinRejected", () => {
      Alert.alert("Invalid Code", "Please enter a valid game code.");
    });
    socket.emit("joinGame", code);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter Game Code</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        maxLength={6}
        value={code}
        onChangeText={setCode}
        placeholder="enter game code"
      />
      <Button title="Join Game" onPress={handleSubmit} />
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
  }
});
