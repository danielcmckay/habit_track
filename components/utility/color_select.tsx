import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { HabitColors } from "../../utils/constants";

export const ColorSelect = (props: {
  onSelect: (color: HabitColors) => void;
  selectedColor?: HabitColors;
}) => {
  return (
    <View style={styles.colorRow}>
      {Array.from(Object.values(HabitColors)).map((color) => (
        <TouchableOpacity key={color} onPress={() => props.onSelect(color)}>
          <View style={{ ...styles.colorIcon, backgroundColor: color }}>
            {props.selectedColor === color && (
              <FontAwesomeIcon
                icon={faCheck}
                color={
                  color === HabitColors.Yellow || color === HabitColors.Grey
                    ? "black"
                    : "white"
                }
              />
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
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
});
