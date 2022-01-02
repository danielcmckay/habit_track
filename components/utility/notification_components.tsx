import React from "react";
import { StyleSheet, View } from "react-native";
import { HabitColors } from "../../utils/constants";
import { Card } from "./card";
import DateTimePicker from "@react-native-community/datetimepicker";
import { HabitTextInput } from "./habit_text_input";

export const NotificationSelector = (props: {
  notificationTime: Date;
  notificationTitle: string;
  updateFn: (update: string) => void;
}) => {
  return (
    <View style={styles.topRow}>
      <Card style={styles.topRowCard}>
        <View style={styles.row}>
          <DateTimePicker
            style={{
              zIndex: 10000,
              elevation: 10000,
              height: 200,
              width: "70%",
            }}
            testID="dateTimePicker"
            value={new Date(props.notificationTime) ?? new Date()}
            mode={"time"}
            is24Hour={true}
            display="default"
          />
        </View>
      </Card>
      <Card style={styles.topRowCard}>
        <View style={styles.row}>
          <HabitTextInput
            value={props.notificationTitle}
            onChange={(text) => props.updateFn(text)}
          />
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  newHabitText: {
    height: 40,
    width: "90%",
    marginVertical: 20,
    borderWidth: 1,
    padding: 10,
    color: "white",
    borderColor: HabitColors.Grey,
  },
  topRow: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  topRowCard: {
    width: "48%",
    height: 50,
  },
  row: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
