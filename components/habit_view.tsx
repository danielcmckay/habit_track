import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Habit, HabitColors, RootStackParamList } from "../utils/models";
import { Card } from "./card";
import { RouteProp } from "@react-navigation/native";
import { faRecycle, faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { toUpper } from "../utils/utils";
import {
  ContributionGraph,
  LineChart,
  ProgressChart,
} from "react-native-chart-kit";
import { ChartConfig } from "react-native-chart-kit/dist/HelperTypes";

import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;

export const HabitView = (props: {
  habit: Habit;
  route: RouteProp<RootStackParamList, "Viewer">;
}) => {
  const { habit } = props.route.params;

  const chartConfig: ChartConfig = {
    backgroundGradientFrom: "#252525",
    backgroundGradientTo: "#252525",
    color: (opacity = .5) => habit.color,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    labelColor: (opacity = 1) => "#ffffff",
    style: { borderColor: habit.color },
    backgroundColor: "#252525",
  };

  const data = {
    labels: ["October", "November", "December"],
    datasets: [
      {
        data: [1, 3, 5, 6, 7],
        color: (opacity = 1) => habit.color, // optional
        strokeWidth: 2, // optional
      },
    ],
  };

  const progressData = {
    data: [0.5],
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.topRow}>
          <Card style={styles.topRowCard}>
            <View style={styles.row}>
              <FontAwesomeIcon icon={faRecycle} color="white" />
              <Text style={{ color: "white", paddingLeft: 10 }}>
                {toUpper(habit.frequency)}
              </Text>
            </View>
          </Card>
          <Card style={styles.topRowCard}>
            <View style={styles.row}>
              <FontAwesomeIcon icon={faBell} color="white" />
              <Text style={{ color: "white", paddingLeft: 10 }}>
                Reminder off
              </Text>
            </View>
          </Card>
        </View>
        <Card style={styles.habitStatRow}>
          <ProgressChart
            data={progressData}
            width={(screenWidth * 0.9) / 8}
            height={50}
            strokeWidth={5}
            radius={15}
            chartConfig={chartConfig}
            hideLegend
          />
          <HabitStat top="125" bottom="Times" />
          <Text style={{ color: HabitColors.Grey, fontSize: 35 }}>|</Text>
          <HabitStat top="12" bottom="Missed" />
          <Text style={{ color: HabitColors.Grey, fontSize: 35 }}>|</Text>
          <HabitStat top="45%" bottom="Month" />
          <Text style={{ color: HabitColors.Grey, fontSize: 35 }}>|</Text>
          <HabitStat top="45%" bottom="Total" />
        </Card>
        <Card
          style={{ height: 300 }}
          title={
            <Text style={{ color: "white", fontWeight: "bold" }}>
              Statistics
            </Text>
          }
        >
          <LineChart
            data={data}
            width={screenWidth * 0.9}
            height={200}
            verticalLabelRotation={30}
            chartConfig={chartConfig}
            bezier={false}
          />
        </Card>
        <Card
          title={
            <Text style={{ color: "white", fontWeight: "bold" }}>History</Text>
          }
          style={{ height: 300 }}
        >
          <ContributionGraph
            values={habit.dates.map((date) => ({
              date: `${date.getFullYear()}-${
                date.getMonth() + 1
              }-${date.getDate()}`,
              count: 1,
            }))}
            endDate={new Date()}
            numDays={75}
            width={screenWidth * 0.9}
            height={220}
            chartConfig={chartConfig}
            tooltipDataAttrs={() => ({})}
          />
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    paddingTop: 10,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#191919",
    alignItems: "center",
    justifyContent: "flex-start",
    color: "#ffffff",
  },
  topRow: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  topRowCard: {
    width: "48%",
    height: 50,
  },
  row: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  habitStatRow: {
    height: 80,
    width: "90%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  habitStatView: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});

const HabitStat = (props: { top: string; bottom: string }) => {
  return (
    <View style={styles.habitStatView}>
      <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
        {props.top}
      </Text>
      <Text style={{ color: HabitColors.Grey }}>{props.bottom}</Text>
    </View>
  );
};
