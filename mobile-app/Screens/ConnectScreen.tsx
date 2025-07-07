import React, { useState } from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ImageBackground,
  TouchableOpacity
} from "react-native";
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
    <ImageBackground
      source={require("../assets/buzz-game-bg.jpg")}
      resizeMode="cover"
      style={styles.container}
    >
      <Text style={styles.label}>Enter Game Code</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        maxLength={6}
        value={code}
        onChangeText={setCode}
        placeholder="enter game code"
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Join Game</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    gap: 20
  },
  label: {
    fontSize: 20,
    textAlign: "center",
    color: "white"
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
    padding: 15,
    fontSize: 18,
    textAlign: "center",
    backgroundColor: "#fff"
  },
  button: {
    backgroundColor: "#0277f9",
    alignSelf: "center",
    padding: 15,
    borderRadius: 15
  },
  buttonText: {
    color: "white",
    fontSize: 18
  }
});
