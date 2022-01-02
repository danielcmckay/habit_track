import React from "react";
import { StyleSheet, TextInput } from "react-native";
import { HabitColors } from "../../utils/constants";

export const HabitTextInput = (props: {
  value: string;
  onChange: (text: string) => void;
}) => {
  return (
    <TextInput
      style={styles.newHabitText}
      placeholder="New habit title"
      placeholderTextColor={HabitColors.Grey}
      value={props.value}
      onChangeText={(text) => props.onChange(text)}
    />
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
});
