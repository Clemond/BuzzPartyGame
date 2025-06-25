import { RootStackParamList } from "../types/navigation.types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Button, View, StyleSheet, Text, TextInput } from "react-native";
import { getSocket } from "../utils/socket";

type Props = NativeStackScreenProps<RootStackParamList, "CreateUsernameScreen">;

export default function CreateUsernameScreen({ route }: Props) {
  const { gameCode } = route.params;
  const [username, setUsername] = useState("");
  const socket = getSocket();

  const handleSubmit = () => {
    socket.emit("usernameChosen", { gameCode, username });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter Username</Text>
      <TextInput
        style={styles.input}
        keyboardType="default"
        value={username}
        onChangeText={setUsername}
        placeholder="ex. quackshows"
      />
      <Button title="Submit" onPress={handleSubmit} />
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
