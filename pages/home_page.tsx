import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState, useEffect } from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { FloatingActionButton } from "../components/floating_action_button";
import { HabitCard } from "../components/habit_card";
import { NewHabitModal } from "../components/new_habit_modal";
import {
  RootStackParamList,
  Habit,
  NewHabit,
  HabitColors,
} from "../utils/models";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Home = (props: {
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
}) => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    try {
      getHabitsFromLS();
    } catch (error) {
      console.log(error);
    }
  }, [habits]);

  const getHabitsFromLS = async () => {
    try {
      let habitData: Habit[] = [];
      await AsyncStorage.getItem("@habits")
        .then((data) => data)
        .then((res) => (habitData = JSON.parse(res ?? "") as Habit[]))
        .finally(() =>
          setHabits(habitData)
        );

      return null;
    } catch (error) {
      console.log(error);
    }
  };

  const saveHabitsToLS = async (data: Habit[]) => {
    console.log(JSON.stringify(data));
    try {
      await AsyncStorage.setItem(
        "@habits",
        JSON.stringify(data)
      );
    } catch (error) {
      console.log(error);
    }
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
      id: newHabit.title as string,
      createdDate: new Date().valueOf(),
      notification: newHabit.notification,
    });

    setHabits(habitCopy);
    setShowModal(false);
    await saveHabitsToLS(habitCopy);
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
