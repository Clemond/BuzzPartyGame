import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation.types";
import ConnectScreen from "../Screens/ConnectScreen";
import CreateUsernameScreen from "../Screens/CreateUsernameScreen";

export default function RootStack() {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator>
      <Stack.Screen name="ConnectScreen" component={ConnectScreen} />
      <Stack.Screen
        name="CreateUsernameScreen"
        component={CreateUsernameScreen}
      />
    </Stack.Navigator>
  );
}
