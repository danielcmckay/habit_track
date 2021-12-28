import { Text, View, StyleSheet } from "react-native";
import { toUpper } from "../utils/utils";
import { DailyCounter } from "./daily_counter";

export type Habit = {
  name: string;
  frequency: "daily" | "weekly" | "biweekly" | "monthly";
  dates: Date[];
  color: string;
  id: string;
};

export const HabitCard = (props: { habit: Habit , onPress: (habit: Habit) => void}) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Text style={{ color: "#fff" }}>{props.habit.name}</Text>
        <Text style={{ color: "#595959" }}>
          {toUpper(props.habit.frequency)}
        </Text>
      </View>
      <DailyCounter habit={props.habit} onPress={props.onPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: 125,
    marginVertical: 10,
    backgroundColor: "#252525",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
  },
  titleRow: {
    display: "flex",
    color: "white",
    marginVertical: 15,
    flexDirection: "row",
    width: "90%",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
