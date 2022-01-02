import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Habit, HabitCount } from "../../../utils/models";
import { getDateRange, getDayName } from "../../../utils/utils";
import { Card } from "../../utility/card";
import { Counter } from "../../utility/counter";
import { DateButton } from "../../utility/date_button";

const today = new Date();
const startDate: number = new Date().setDate(today.getDate() - 3).valueOf();
const endDate: number = new Date().setDate(today.getDate() + 3).valueOf();

const dateRange = getDateRange(startDate, endDate);

export const DailyCounter = (props: {
  habit: Habit;
  onPress: (habit: Habit) => void;
}) => {
  const [showCountModal, setShowCountModal] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<number>();

  const handleTap = (habitDate: number) => {
    if (props.habit.type === "total count") {
      setSelectedDate(habitDate);
      setShowCountModal(true);
    } else {
      let copy = { ...props.habit };
      if (copy.dates.find((a: HabitCount) => a.date === habitDate)) {
        copy.dates = copy.dates.filter((c: HabitCount) => c.date !== habitDate);
      } else {
        copy.dates.push({ date: habitDate, count: 1 } as HabitCount);
      }

      props.onPress(copy);
    }
  };

  return (
    <View style={styles.container}>
      {dateRange.map((d) => {
        return (
          <View key={props.habit.id + d.valueOf()}>
            <Text
              style={{
                color: d.getDate() === today.getDate() ? "white" : "#595959",
                textAlign: "center",
              }}
            >
              {getDayName(d)}
            </Text>
            <DateButton
              color={props.habit.color}
              date={d}
              habitType={props.habit.type}
              highlighted={props.habit.dates
                .map((d) => d.date)
                .includes(d.valueOf())}
              saveFn={(date) => handleTap(date.valueOf())}
            />
          </View>
        );
      })}
      {showCountModal && (
        <Card style={styles.countModal}>
          <Counter
            count={
              props.habit.dates.find((a) => a.date === selectedDate!)?.count ??
              0
            }
            hideFn={() => setShowCountModal(false)}
            saveFn={(count) => {
              let copy = { ...props.habit };

              if (
                copy.dates.find((d: HabitCount) => d.date === selectedDate!)
              ) {
                if (count === 0) {
                  copy = {
                    ...copy,
                    dates: copy.dates.filter((a) => a.date !== selectedDate),
                  };
                }
              } else if (count > 0) {
                copy.dates.push({
                  count: count,
                  date: selectedDate!,
                } as HabitCount);
              }

              props.onPress(copy);
            }}
          />
        </Card>
      )}
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
    overflow: "hidden",
  },
  countModal: {
    height: 200,
    position: "absolute",
    zIndex: 50,
    top: 15,
    marginHorizontal: "auto",
    backgroundColor: "#121212",
  },
});
