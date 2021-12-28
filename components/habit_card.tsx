import { Text, View, StyleSheet } from "react-native";
import { Habit } from "../utils/models";
import { toUpper } from "../utils/utils";
import { Card } from "./card";
import { DailyCounter } from "./daily_counter";

export const HabitCard = (props: {
  habit: Habit;
  onPress: (habit: Habit) => void;
}) => {
  console.log("rerender");
  return (
    <Card
      title={
        <>
          <Text style={{ color: "#fff" }}>{props.habit.name}</Text>
          <Text style={{ color: "#595959" }}>
            {toUpper(props.habit.frequency)}
          </Text>
        </>
      }
    >
      <DailyCounter habit={props.habit} onPress={props.onPress} />
    </Card>
  );
};
