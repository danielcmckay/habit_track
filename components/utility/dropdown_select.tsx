import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { toUpper } from "../../utils/utils";
import { Card } from "./card";

export function DropdownSelect(props: {
  options: string[];
  selectedOption: string;
  onSelect: (item: string) => void;
}) {
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);

  return (
    <>
      {!dropdownVisible ? (
        <TouchableOpacity onPress={() => setDropdownVisible(true)}>
          <Text
            style={{
              color: "white",
            }}
          >
            {toUpper(props.selectedOption)}
          </Text>
        </TouchableOpacity>
      ) : (
        <Card style={styles.dropdown}>
          {props.options.map((opt) => (
            <TouchableOpacity
              key={opt}
              onPress={() => {
                props.onSelect(opt);
                setDropdownVisible(false);
              }}
            >
              <Text style={{ color: "white" }}>{toUpper(opt)}</Text>
            </TouchableOpacity>
          ))}
        </Card>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    width: "40%",
    backgroundColor: "#191919",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    paddingLeft: 10,
    position: "absolute",
    right: 0,
    top: -10,
    elevation: 1000,
    zIndex: 1000,
    overflow: "scroll",
  },
});
