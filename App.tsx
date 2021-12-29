import React from "react";
import { RootStackParamList } from "./utils/models";
import { NavigationContainer } from "@react-navigation/native";
import { HabitView } from "./components/habit_view";
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "./pages/home_page";
import { EditView } from "./pages/edit_page";
import { Button, TouchableOpacity } from "react-native";
import { SettingsView } from "./pages/settings_page";

import { faCog, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export default function App() {
  const Stack = createStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={({ navigation }) => ({
            headerStyle: { backgroundColor: "#111111" },
            headerTitleStyle: { color: "white" },
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Settings");
                }}
              >
                <FontAwesomeIcon
                  icon={faCog}
                  color="white"
                  style={{ marginRight: 15 }}
                />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="Viewer"
          component={HabitView}
          options={({ navigation, route }) => ({
            headerStyle: { backgroundColor: "#111111" },
            headerTintColor: "#fff",
            headerTitleStyle: { color: "white" },
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Edit", { habit: route.params.habit });
                }}
              >
                <FontAwesomeIcon icon={faPen} color="white" style={{marginRight: 15}}/>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="Edit"
          component={EditView}
          options={{
            headerStyle: { backgroundColor: "#111111" },
            headerTitleStyle: { color: "white" },
          }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsView}
          options={{
            headerStyle: { backgroundColor: "#111111" },
            headerTitleStyle: { color: "white" },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
