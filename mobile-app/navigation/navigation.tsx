import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation.types";
import ConnectScreen from "../Screens/ConnectScreen";

export default function RootStack() {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator>
      <Stack.Screen name="ConnectScreen" component={ConnectScreen} />
    </Stack.Navigator>
  );
}
