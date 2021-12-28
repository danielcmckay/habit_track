import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Card } from "./components/card";
import { FloatingActionButton } from "./components/floating_action_button";
import { HabitCard } from "./components/habit_card";
import { NewHabitModal } from "./components/new_habit_modal";
import { Frequency, Habit, HabitColors, NewHabit } from "./utils/models";

export default function App() {
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
      },
      {
        name: "Work out",
        frequency: Frequency.Biweekly,
        dates: [],
        color: "#EF5A5C",
        id: "123456",
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
            <HabitCard key={habit.id} habit={habit} onPress={markHabitAsDone} />
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
