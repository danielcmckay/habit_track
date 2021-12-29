import { StyleSheet, View, Text, Button, TouchableOpacity } from "react-native";
import { Habit } from "../utils/models";
import { getDateRange } from "../utils/utils";

const today = new Date();
const startDate: number = new Date().setDate(today.getDate() - 3);
const endDate: number = new Date().setDate(today.getDate() + 3);

const dateRange = getDateRange(startDate, endDate);

export const DailyCounter = (props: {
  habit: Habit;
  onPress: (habit: Habit) => void;
}) => {
  const dateIsInRange = (date: number, range: number[]) => {
    return range.map((d) => new Date(d).toDateString()).includes(new Date(date).toDateString());
  };

  const handleTap = (habitDate: number) => {
    const habitCopy = {...props.habit}
    !dateIsInRange(habitDate, props.habit.dates)
      ? habitCopy.dates.push(habitDate)
      : (habitCopy.dates = props.habit.dates.filter(
          (date) => new Date(date).toDateString() !== new Date(habitDate).toDateString()
        ));

    props.onPress(habitCopy);
  };

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
                ...styles.habitDay,
                backgroundColor: dateIsInRange(d.valueOf(), props.habit.dates)
                  ? props.habit.color
                  : "none",
              }}
            >
              <TouchableOpacity onPress={() => handleTap(d.valueOf())}>
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                  }}
                >
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
  habitDay: {
    marginTop: 10,
    height: 30,
    width: 30,
    borderRadius: 30 / 2,
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
  },
});
