import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, View } from "react-native";
import { NewHabitModal } from "../components/habit/new_habit_modal";
import { RootStackParamList } from "../utils/models";

export const EditView = (props: {
  navigation: NativeStackNavigationProp<RootStackParamList, "Edit">;
  route: RouteProp<RootStackParamList, "Edit">;
}) => {
  const { habit } = props.route.params;
  return (
    <View style={styles.container}>
      <NewHabitModal
        habit={habit}
        onSave={() => {}}
        closeModal={() => props.navigation.goBack()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    paddingTop: 50,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#191919",
    alignItems: "center",
    justifyContent: "flex-start",
    color: "#ffffff",
  },
});
