import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text, TouchableOpacity } from "react-native";
import { Habit, RootStackParamList } from "../../utils/models";
import { toUpper } from "../../utils/utils";
import { Card } from "../utility/card";
import { DailyCounter } from "./daily_counter";

export const HabitCard = (props: {
  habit: Habit;
  onPress: (habit: Habit) => void;
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
}) => {
  return (
    <Card
      title={
        <>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("Viewer", { habit: props.habit })
            }
          >
            <Text style={{ color: "#fff" }}>{props.habit.name}</Text>
          </TouchableOpacity>
          <Text style={{ color: "#595959" }}>
            {toUpper(props.habit.frequency)}
          </Text>
        </>
      }
    >
      <DailyCounter habit={props.habit} onPress={props.onPress} />
    </Card>
  );
};
