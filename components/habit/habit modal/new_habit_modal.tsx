import React, { useState } from "react";
import { View, StyleSheet, Text, Switch } from "react-native";
import { Habit, HabitType, NewHabit } from "../../../utils/models";
import { Card } from "../../utility/card";
import { Frequency, HabitColors } from "../../../utils/constants";
import { NotificationSelector } from "../../utility/notification_components";
import { ColorSelect } from "../../utility/color_select";
import { HabitTextInput } from "../../utility/habit_text_input";
import { LabelAndInput } from "../../utility/label_and_input";
import { NewHabitModalHeader } from "./new_habit_modal_header";

const INITIAL_NEW_HABIT: NewHabit = {
  title: "",
  color: undefined,
  frequency: Frequency.Daily,
  type: "one-time",
};

export const NewHabitModal = (props: {
  onSave: (newHabit: NewHabit) => void;
  closeModal: () => void;
  habit?: Habit;
}) => {
  const [newHabit, setNewHabit] = useState<NewHabit>(
    props.habit
      ? {
          title: props.habit.name as string,
          color: props.habit.color as HabitColors,
          frequency: props.habit.frequency,
          notification: props.habit.notification,
          type: props.habit.type,
        }
      : INITIAL_NEW_HABIT
  );

  const [enableNotification, setEnableNotification] = useState<boolean>(false);

  return (
    <>
      <Card
        style={styles.newHabitModal}
        title={
          <NewHabitModalHeader
            title={props.habit ? props.habit.name : "New Habit"}
            closeFn={() => props.closeModal()}
            saveFn={() => props.onSave(newHabit)}
          />
        }
      >
        <HabitTextInput
          value={newHabit.title}
          onChange={(text) => setNewHabit({ ...newHabit, title: text })}
        />
        <ColorSelect
          onSelect={(color: HabitColors) =>
            setNewHabit({ ...newHabit, color: color })
          }
          selectedColor={newHabit.color}
        />
        <LabelAndInput
          options={["one-time", "total count"]}
          selectedOption={newHabit.type}
          label="Habit type"
          onSelect={(item) =>
            setNewHabit({ ...newHabit, type: item as HabitType })
          }
          styles={styles.newHabitAttribute}
        />
        <LabelAndInput
          options={Array.from(Object.values(Frequency))}
          selectedOption={newHabit.frequency}
          label="Frequency"
          onSelect={(item) =>
            setNewHabit({ ...newHabit, frequency: item as Frequency })
          }
          styles={{ ...styles.newHabitAttribute, zindex: 2 }}
        />

        <View style={{ ...styles.newHabitAttribute, zIndex: 0 }}>
          <Text style={{ color: "white" }}>Notification</Text>
          <Switch
            style={{ zIndex: 0 }}
            value={enableNotification}
            onChange={() => {
              setEnableNotification(!enableNotification);
              if (newHabit.notification) {
                setNewHabit({ ...newHabit, notification: undefined });
              } else {
                setNewHabit({
                  ...newHabit,
                  notification: { time: new Date().valueOf(), title: "" },
                });
              }
              console.log(newHabit);
            }}
          />
        </View>
        {enableNotification ? (
          <NotificationSelector
            notificationTime={new Date(newHabit.notification!.time)}
            notificationTitle={newHabit.notification!.title}
            updateFn={(update: string) =>
              setNewHabit({
                ...newHabit,
                notification: {
                  time: newHabit!.notification!.time,
                  title: update,
                },
              })
            }
          />
        ) : (
          <></>
        )}
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
  newHabitModal: {
    height: "90%",
    width: "90%",
    paddingTop: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    color: "#ffffff",
    zIndex: 10000,
  },
  colorRow: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  colorIcon: {
    height: 30,
    width: 30,
    padding: 7,
    borderRadius: 30 / 2,
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
  },
  newHabitText: {
    height: 40,
    width: "90%",
    marginVertical: 20,
    borderWidth: 1,
    padding: 10,
    color: "white",
    borderColor: HabitColors.Grey,
  },
  newHabitAttribute: {
    marginVertical: 15,
    width: "90%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  frequencyList: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#191919",
    zIndex: 5000,
    elevation: 5,
    width: 120,
    position: "absolute",
    textAlign: "right",
    right: 0,
    top: -10,
    height: 150,
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
