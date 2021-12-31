import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { HabitColors } from "../../utils/constants";

export const Counter = (props: {
  count: number;
  hideFn: () => void;
  saveFn: (count: number) => void;
}) => {
  const [count, setCount] = useState<number>(props.count ?? 0);
  return (
    <>
      <View style={styles.counterRow}>
        <TouchableOpacity
          style={{ ...styles.countButton, backgroundColor: HabitColors.Red }}
          onPress={() => count > 0 && setCount(count - 1)}
        >
          <FontAwesomeIcon icon={faMinus} color="white" />
        </TouchableOpacity>
        <View>
          <Text style={{ color: "white", fontSize: 25, fontWeight: "bold" }}>
            {count}
          </Text>
        </View>
        <TouchableOpacity
          style={{ ...styles.countButton, backgroundColor: HabitColors.Green }}
          onPress={() => setCount(count + 1)}
        >
          <FontAwesomeIcon icon={faPlus} color="white" />
        </TouchableOpacity>
      </View>
      <View style={{ ...styles.counterRow, marginVertical: 15, width: "80%" }}>
        <TouchableOpacity
          style={{
            ...styles.deleteBtn,
            backgroundColor: HabitColors.Grey,
          }}
          onPress={() => {
            props.hideFn();
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.deleteBtn,
            backgroundColor: HabitColors.Grey,
          }}
          onPress={() => {
            props.saveFn(count);
            props.hideFn();
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>Save</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  counterRow: {
    display: "flex",
    flexDirection: "row",
    width: "60%",
    justifyContent: "space-evenly",
    alignItems: "center",
    margin: "auto",
    paddingVertical: 15,
  },
  countButton: {
    zIndex: 100,
    padding: 10,
    borderRadius: 5,
  },
  deleteBtn: {
    padding: 10,
    color: "white",
    width: 100,
    borderRadius: 5,
  },
});
