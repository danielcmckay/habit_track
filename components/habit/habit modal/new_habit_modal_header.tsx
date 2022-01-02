import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { HabitColors } from "../../../utils/constants";

export const NewHabitModalHeader = (props: {
  closeFn: () => void;
  saveFn: () => void;
  title: string;
}) => {
  return (
    <>
      <TouchableOpacity onPress={() => props.closeFn()}>
        <Text style={{ color: HabitColors.Grey }}>Cancel</Text>
      </TouchableOpacity>
      <Text style={{ color: "#fff", fontWeight: "bold" }}>{props.title}</Text>
      <TouchableOpacity
        onPress={() => props.saveFn()}
        style={{
          paddingHorizontal: 10,
          paddingVertical: 5,
          backgroundColor: HabitColors.Red,
          borderRadius: 5,
        }}
      >
        <Text style={{ color: "#fff" }}>Save</Text>
      </TouchableOpacity>
    </>
  );
};
