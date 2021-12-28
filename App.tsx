import React, { useEffect, useState } from "react";
import { ActivityIndicator, Button, StyleSheet, View } from "react-native";
import { FloatingActionButton } from "./components/floating_action_button";
import { HabitCard } from "./components/habit_card";
import { NewHabitModal } from "./components/new_habit_modal";
import {
  Frequency,
  Habit,
  HabitColors,
  NewHabit,
  RootStackParamList,
} from "./utils/models";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import { HabitView } from "./components/habit_view";
import { createStackNavigator } from "@react-navigation/stack";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function App() {
  const Stack = createStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerStyle: { backgroundColor: "#111111" },
            headerTitleStyle: { color: "white" },
          }}
        />
        <Stack.Screen
          name="Viewer"
          component={HabitView}
          options={({navigation, route}) => ({
            headerStyle: { backgroundColor: "#111111" },
            headerTintColor: "#fff",
            headerTitleStyle: { color: "white" },
            headerRight: () => (
              <Button
                title="Edit"
                onPress={() => {
                  navigation.navigate("Edit", {habit: route.params.habit})
                }}
                color={"white"}
              />
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    paddingTop: 50,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#191919",
    alignItems: "center",
    justifyContent: "flex-start",
    color: "#ffffff",
  },
});

const Home = (props: {
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
}) => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    setHabits([
      {
        name: "Floss",
        frequency: Frequency.Daily,
        dates: [],
        color: "#29C26C",
        id: "12345",
        createdDate: new Date("2021/10/10"),
      },
      {
        name: "Work out",
        frequency: Frequency.Biweekly,
        dates: [],
        color: "#EF5A5C",
        id: "123456",
        createdDate: new Date("2021/10/10"),
      },
    ]);
  }, []);

  const markHabitAsDone = (habit: Habit) => {
    const copy = [...habits];
    copy.find((h) => h.id === habit.id)!.dates = habit.dates;

    setHabits(copy);
  };

  const addNewHabit = (newHabit: NewHabit) => {
    const habitCopy = [...habits];

    habitCopy.push({
      name: newHabit.title,
      frequency: newHabit.frequency,
      dates: [],
      color: newHabit.color as HabitColors,
      id: newHabit.title as string,
      createdDate: new Date(),
    });

    setHabits(habitCopy);
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      {!showModal ? (
        !habits.length ? (
          <ActivityIndicator />
        ) : (
          habits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              onPress={markHabitAsDone}
              navigation={props.navigation}
            />
          ))
        )
      ) : (
        <NewHabitModal
          onSave={addNewHabit}
          closeModal={() => setShowModal(false)}
        />
      )}
      {!showModal && (
        <FloatingActionButton text="+" onPress={() => setShowModal(true)} />
      )}
    </View>
  );
};

const EditView = (props: {
  navigation: NativeStackNavigationProp<RootStackParamList, "Edit">;
  route: RouteProp<RootStackParamList, "Edit">;
}) => {
  const { habit } = props.route.params;
  return (
    <View style={styles.container}>
      <NewHabitModal habit={habit} onSave={() => {}} closeModal={() => props.navigation.goBack()} />
    </View>
  );
};
