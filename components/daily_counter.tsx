import { StyleSheet, View, Text, Button, TouchableOpacity } from "react-native";
import { getDateRange } from "../utils/utils";
import { Habit } from "./habit_card";

export const DailyCounter = (props: {
  habit: Habit;
  onPress: (habit: Habit) => void;
}) => {
  const today = new Date();

  const dateRange = getDateRange(
    new Date().setDate(today.getDate() - 3),
    new Date().setDate(today.getDate() + 3)
  );

  return (
    <View style={styles.container}>
      {dateRange.map((d) => {
        return (
          <View key={d.toISOString()}>
            <Text
              style={{
                color: d.getDate() === today.getDate() ? "white" : "#595959",
                textAlign: "center",
              }}
            >
              {d.toLocaleString("en-us", { weekday: "short" })}
            </Text>
            <View
              style={{
                backgroundColor: props.habit.dates
                  .map((date) => date.toDateString())
                  .includes(d.toDateString())
                  ? props.habit.color
                  : "none",
                marginTop: 10,
                height: 30,
                width: 30,
                borderRadius: 30 / 2,
                display: "flex",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  !props.habit.dates
                    .map((d) => d.toDateString())
                    .includes(d.toDateString())
                    ? props.habit.dates.push(d)
                    : (props.habit.dates = props.habit.dates.filter(
                        (date) => date.toDateString() !== d.toDateString()
                      ));

                  props.onPress(props.habit);
                }}
              >
                <Text style={{ color: "white", textAlign: "center" }}>
                  {d.getDate()}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});
