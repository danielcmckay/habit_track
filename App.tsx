import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Habit, HabitCard } from "./components/habit_card";

export default function App() {
  const [habits, setHabits] = useState<Habit[]>([]);

  const dummyHabit: Habit = {
    name: "Floss",
    frequency: "daily",
    dates: [new Date()],
    color: "#29C26C",
    id: "12345",
  };

  useEffect(() => {
    setHabits([
      {
        name: "Floss",
        frequency: "daily",
        dates: [new Date()],
        color: "#29C26C",
        id: "12345",
      },
      {
        name: "Work out",
        frequency: "biweekly",
        dates: [new Date()],
        color: "#29C26C",
        id: "123456",
      },
    ]);
  }, []);

  const markHabitAsDone = (habit: Habit) => {
    const copy = [...habits];
    copy.find((h) => h.id === habit.id)?.dates === habit.dates;

    setHabits(copy);
  };

  return (
    <View style={styles.container}>
      {!habits.length ? (
        <ActivityIndicator />
      ) : (
        habits.map((habit) => (
          <HabitCard key={habit.id} habit={habit} onPress={markHabitAsDone} />
        ))
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
