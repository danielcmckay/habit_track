import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  Button,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { Habit, RootStackParamList } from "../../utils/models";
import { toUpper } from "../../utils/utils";
import { Card } from "../utility/card";
import { DailyCounter } from "./daily_counter";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import { HabitColors } from "../../utils/constants";

export const HabitCard = (props: {
  habit: Habit;
  onPress: (habit: Habit) => void;
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
  deleteFn: (id: string) => void;
}) => {
  const [deleteMode, setDeleteMode] = useState<boolean>(false);

  return (
    <TouchableOpacity
      style={{ ...styles.card }}
      onLongPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setDeleteMode(true);
      }}
    >
      <Card
        title={
          !deleteMode ? (
            <>
              <TouchableHighlight
                onPress={() =>
                  props.navigation.navigate("Viewer", { habit: props.habit })
                }
              >
                <Text style={{ color: "#fff" }}>{props.habit.name}</Text>
              </TouchableHighlight>
              <Text style={{ color: "#595959" }}>
                {toUpper(props.habit.frequency)}
              </Text>
            </>
          ) : (
            <Text style={{ color: "#fff" }}>Are you sure?</Text>
          )
        }
      >
        {!deleteMode ? (
          <DailyCounter habit={{ ...props.habit }} onPress={props.onPress} />
        ) : (
          <View style={{ ...styles.titleRow, width: "80%" }}>
            <TouchableOpacity
              style={{
                ...styles.deleteBtn,
                backgroundColor: HabitColors.Grey,
              }}
              onPress={() => {
                setDeleteMode(false);
              }}
            >
              <Text style={{ color: "white", textAlign: "center" }}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.deleteBtn,
                backgroundColor: HabitColors.Red,
              }}
              onPress={() => {
                props.deleteFn(props.habit.id);
                setDeleteMode(false);
              }}
            >
              <Text style={{ color: "white", textAlign: "center" }}>
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
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
  deleteBtn: {
    padding: 10,
    color: "white",
    width: 100,
    borderRadius: 5,
  },
});
