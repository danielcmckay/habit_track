import React from "react";
import { Text, View } from "react-native";
import { DropdownSelect } from "./dropdown_select";

export const LabelAndInput = (props: {
  styles: {};
  label: string;
  options: string[];
  selectedOption: string;
  onSelect: (selection: string) => void;
}) => {
  return (
    <View style={props.styles}>
      <Text style={{ color: "white" }}>{props.label}</Text>
      <DropdownSelect
        options={props.options}
        selectedOption={props.selectedOption}
        onSelect={(item) => props.onSelect(item)}
      />
    </View>
  );
};
