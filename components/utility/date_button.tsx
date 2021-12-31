import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { HabitColors } from "../../utils/constants";
import { HabitType } from "../../utils/models";

export const DateButton = (props: {
  date: Date;
  highlighted: boolean;
  color: HabitColors;
  habitType: HabitType;
  saveFn: (date: Date) => void;
}) => {
  const [highlight, setHighlight] = useState<boolean>(
    props.highlighted ?? false
  );

  return (
    <View
      style={{
        ...styles.habitDay,
        backgroundColor: highlight ? props.color : "none",
      }}
    >
      <TouchableOpacity
        onPress={() => {
          setHighlight(!highlight);
          props.saveFn(props.date);
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
          }}
        >
          {props.date.getDate()}
        </Text>
      </TouchableOpacity>
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
