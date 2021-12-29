import React, { useState } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Switch,
} from "react-native";
import { Habit, NewHabit } from "../../utils/models";
import { Card } from "../utility/card";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { toUpper } from "../../utils/utils";
import { Frequency, HabitColors } from "../../utils/constants";
import { NotificationSelector } from "./notification_components";
import { ColorSelect } from "../utility/color_select";

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
        }
      : {
          title: "",
          color: undefined,
          frequency: Frequency.Daily,
        }
  );
  const [showFrequencyDropdown, setShowFrequencyDropdown] =
    useState<boolean>(false);
  const [enableNotification, setEnableNotification] = useState<boolean>(false);

  const onSave = () => {
    // do validation
    props.onSave(newHabit);
  };

  return (
    <>
      <Card
        style={styles.newHabitModal}
        title={
          <>
            <TouchableOpacity onPress={() => props.closeModal()}>
              <Text style={{ color: HabitColors.Grey }}>Cancel</Text>
            </TouchableOpacity>
            <Text style={{ color: "#fff", fontWeight: "bold" }}>
              {props.habit ? props.habit.name : "New Habit"}
            </Text>
            <TouchableOpacity
              onPress={() => onSave()}
              style={{
                paddingHorizontal: 10,
                backgroundColor: HabitColors.Red,
                borderRadius: 5,
              }}
            >
              <Text style={{ color: "#fff" }}>Save</Text>
            </TouchableOpacity>
          </>
        }
      >
        <TextInput
          style={styles.newHabitText}
          placeholder="New habit title"
          placeholderTextColor={HabitColors.Grey}
          value={newHabit.title}
          onChangeText={(text) => setNewHabit({ ...newHabit, title: text })}
        />
        <ColorSelect
          onSelect={(color: HabitColors) =>
            setNewHabit({ ...newHabit, color: color })
          }
          selectedColor={newHabit.color}
        />
        <View style={styles.newHabitAttribute}>
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
        <View style={styles.newHabitAttribute}>
          <Text style={{ color: "white" }}>Frequency</Text>
          {!showFrequencyDropdown ? (
            <TouchableOpacity onPress={() => setShowFrequencyDropdown(true)}>
              <Text style={{ color: "white" }}>
                {toUpper(newHabit.frequency)}
              </Text>
            </TouchableOpacity>
          ) : (
            <Card style={styles.frequencyList}>
              {Array.from(Object.values(Frequency)).map((freq) => (
                <TouchableOpacity
                  onPress={() => {
                    setNewHabit({ ...newHabit, frequency: freq });
                    setShowFrequencyDropdown(false);
                  }}
                >
                  <Text style={{ color: "white" }}>{toUpper(freq)}</Text>
                </TouchableOpacity>
              ))}
            </Card>
          )}
        </View>
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
  newHabitModal: {
    height: "90%",
    width: "90%",
    paddingTop: 50,
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
