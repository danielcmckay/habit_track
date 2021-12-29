import { TouchableOpacity, Text, StyleSheet } from "react-native";

export const FloatingActionButton = (props: {
  text: string;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity style={styles.actionBtn} onPress={props.onPress}>
      <Text style={styles.btnText}>{props.text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  actionBtn: {
    zIndex: 1000,
    position: "absolute",
    bottom: 25,
    right: 50,
    backgroundColor: "#867BF5",
    height: 35,
    width: 35,
    borderRadius: 35 / 2,
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
  },
  btnText: {
    color: "#fff",
    fontSize: 25,
    textAlign: "center",
  },
});
