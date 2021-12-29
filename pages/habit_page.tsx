import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Habit, RootStackParamList } from "../utils/models";
import { Card } from "../components/utility/card";
import { RouteProp } from "@react-navigation/native";
import { faRecycle, faBell, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { getDaysBetween, hexToRgb, toUpper } from "../utils/utils";
import {
  ContributionGraph,
  LineChart,
  ProgressChart,
} from "react-native-chart-kit";
import { ChartConfig } from "react-native-chart-kit/dist/HelperTypes";

import { Dimensions } from "react-native";
import { HabitColors } from "../utils/constants";
const screenWidth = Dimensions.get("window").width;

export const HabitView = (props: {
  habit: Habit;
  route: RouteProp<RootStackParamList, "Viewer">;
}) => {
  const { habit } = props.route.params;
  const rgbVal = hexToRgb(habit.color);

  const chartConfig: ChartConfig = {
    backgroundGradientFrom: "#252525",
    backgroundGradientTo: "#252525",
    color: (opacity = 0.3) =>
      `rgba(${rgbVal.r}, ${rgbVal.g}, ${rgbVal.b}, ${opacity})`,
    strokeWidth: 1, // optional, default 3
    barPercentage: 0.5,
    labelColor: (opacity = 1) => "#ffffff",
    backgroundColor: "#252525",
    fillShadowGradient: habit.color,
    fillShadowGradientOpacity: 0.5,
  };

  const progressChartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) =>
      `rgba(${rgbVal.r}, ${rgbVal.g}, ${rgbVal.b}, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    labelColor: (opacity = 1) => "#ffffff",
    fillShadowGradient: habit.color,
    fillShadowGradientOpacity: 0.5,
  };

  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "April",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        data: [
          habit.dates.filter((h) => new Date(h).getMonth() === 0).length,
          habit.dates.filter((h) => new Date(h).getMonth() === 1).length,
          habit.dates.filter((h) => new Date(h).getMonth() === 2).length,
          habit.dates.filter((h) => new Date(h).getMonth() === 3).length,
          habit.dates.filter((h) => new Date(h).getMonth() === 4).length,
          habit.dates.filter((h) => new Date(h).getMonth() === 5).length,
          habit.dates.filter((h) => new Date(h).getMonth() === 6).length,
          habit.dates.filter((h) => new Date(h).getMonth() === 7).length,
          habit.dates.filter((h) => new Date(h).getMonth() === 8).length,
          habit.dates.filter((h) => new Date(h).getMonth() === 9).length,
          habit.dates.filter((h) => new Date(h).getMonth() === 10).length,
          habit.dates.filter((h) => new Date(h).getMonth() === 11).length,
        ],
        color: (opacity = 1) =>
          `rgba(${rgbVal.r}, ${rgbVal.g}, ${rgbVal.b}, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
  };

  const totalDays = getDaysBetween(new Date(habit.createdDate), new Date());
  const totalPercent: number = habit.dates.length / totalDays;

  console.log(
    habit.dates.map((date) => ({
      date: `${new Date(date).getFullYear()}-${
        new Date(date).getMonth() + 1
      }-${new Date(date).getDate()}`,
      count: 1,
    }))
  );

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
              <FontAwesomeIcon
                icon={faBell}
                color={props.habit?.notification ? "white" : HabitColors.Grey}
              />
              <Text
                style={{
                  color: props.habit?.notification ? "white" : HabitColors.Grey,
                  paddingLeft: 10,
                }}
              >
                Reminder{" "}
                {props.habit?.notification !== undefined ? "On" : "Off"}
              </Text>
            </View>
          </Card>
        </View>
        <Card style={styles.habitStatRow}>
          <ProgressChart
            data={{ data: [totalPercent] }}
            width={(screenWidth * 0.9) / 8}
            height={50}
            fromNumber={0}
            strokeWidth={5}
            radius={10}
            chartConfig={progressChartConfig}
            hideLegend
          />
          <HabitStat top={String(habit.dates.length)} bottom="Times" />
          <VerticalDivider />
          <HabitStat
            top={String(totalDays - habit.dates.length)}
            bottom="Missed"
          />
          <VerticalDivider />
          <HabitStat
            top={`${((habit.dates.length / totalDays) * 100).toFixed(1)}%`}
            bottom="Month"
          />
          <VerticalDivider />
          <HabitStat
            top={`${((habit.dates.length / totalDays) * 100).toFixed(1)}%`}
            bottom="Total"
          />
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
              date: `${new Date(date).getFullYear()}-${
                new Date(date).getMonth() + 1
              }-${new Date(date).getDate()}`,
              count: new Date(date).getDay(),
            }))}
            endDate={new Date()}
            numDays={80}
            width={screenWidth * 0.9}
            height={220}
            chartConfig={chartConfig}
            tooltipDataAttrs={() => ({})}
            gutterSize={3}
            showOutOfRangeDays={false}
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

const VerticalDivider = () => {
  return <Text style={{ color: HabitColors.Grey, fontSize: 35 }}>|</Text>;
};
