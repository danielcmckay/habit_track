import React, { ReactElement } from "react";
import { StyleSheet, View } from "react-native";

export const Card = (props: {
  children: ReactElement | ReactElement[];
  style?: {};
  title?: ReactElement | ReactElement[];
}) => {
  return (
    <View style={{ ...styles.card, ...props.style }}>
      {props.title && <View style={styles.titleRow}>{props.title}</View>}
      {props.children}
    </View>
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
});
