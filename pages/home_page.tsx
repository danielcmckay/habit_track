import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState, useEffect } from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { FloatingActionButton } from "../components/utility/floating_action_button";
import { HabitCard } from "../components/habit/habit_card";
import { NewHabitModal } from "../components/habit/new_habit_modal";
import { RootStackParamList, Habit, NewHabit } from "../utils/models";
import { HabitColors } from "../utils/constants";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { useLocalStorage } from "../hooks/use_local_storage";

export const Home = (props: {
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
}) => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [getItemsFromLS, saveItemsToLS] = useLocalStorage<Habit>("@habits");

  useEffect(() => {
    try {
      fetchItems();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const fetchItems = async () => {
    let items = await getItemsFromLS();
    setHabits(items);
  };

  const markHabitAsDone = (habit: Habit) => {
    const copy = [...habits];
    copy.find((h) => h.id === habit.id)!.dates = habit.dates;

    setHabits(copy);
  };

  const addNewHabit = async (newHabit: NewHabit) => {
    const habitCopy = [...habits];

    habitCopy.push({
      name: newHabit.title,
      frequency: newHabit.frequency,
      dates: [],
      color: newHabit.color as HabitColors,
      id: uuidv4(),
      createdDate: new Date().valueOf(),
      notification: newHabit.notification,
    });

    setHabits(habitCopy);
    setShowModal(false);
    await saveItemsToLS(habitCopy);
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
