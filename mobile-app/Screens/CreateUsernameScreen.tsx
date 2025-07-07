import { RootStackParamList } from "../types/navigation.types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import {
  Button,
  View,
  StyleSheet,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Alert
} from "react-native";
import { getSocket } from "../utils/socket";

type Props = NativeStackScreenProps<RootStackParamList, "CreateUsernameScreen">;

export default function CreateUsernameScreen({ route }: Props) {
  const { gameCode } = route.params;
  const [username, setUsername] = useState("");
  const socket = getSocket();

  const handleSubmit = () => {
    socket.emit("usernameChosen", { gameCode, username });
  };

  useEffect(() => {
    socket.on("usernameRejected", ({ reason }) => {
      Alert.alert("Oops!", reason);
    });

    return () => {
      socket.off("usernameRejected");
    };
  }, []);

  return (
    <ImageBackground
      source={require("../assets/buzz-game-bg.jpg")}
      resizeMode="cover"
      style={styles.container}
    >
      <Text style={styles.label}>Enter Username</Text>
      <TextInput
        style={styles.input}
        keyboardType="default"
        value={username}
        onChangeText={setUsername}
        placeholder="ex. quackshows"
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    backgroundColor: "#f7f7f7",
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
