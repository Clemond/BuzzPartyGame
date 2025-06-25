import { RootStackParamList } from "../types/navigation.types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { useEffect, useState } from "react";
import { Button, View, StyleSheet, Text, TextInput } from "react-native";
import { getSocket } from "../utils/socket";

type Props = NativeStackScreenProps<RootStackParamList, "CreateUsernameScreen">;

export default function CreateUsernameScreen({ route }: Props) {
  const { gameCode } = route.params;

  const [username, setUsername] = useState("");
  const [connected, setConnected] = useState(false);
  const socket = getSocket();

  useEffect(() => {
    socket.on("joinAccepted", () => {
      setConnected(true);
      console.log("✅ Connected to game!");
    });

    return () => {
      socket.off("joinAccepted");
      socket.off("joinRejected");
    };
  }, []);

  const handleSubmit = () => {
    socket.emit("usernameChosen", { gameCode, username: username });
  };

  return (
    <View style={styles.container}>
      {connected ? (
        <Text style={styles.success}>You're in the game!</Text>
      ) : (
        <>
          <Text style={styles.label}>Enter Username</Text>
          <TextInput
            style={styles.input}
            keyboardType="default"
            value={username}
            onChangeText={setUsername}
            placeholder="ex. quackshows"
          />
          <Button title="Submit" onPress={handleSubmit} />
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
