import { Frequency, HabitColors } from "./constants";

export type Habit = {
  name: string;
  frequency: Frequency;
  dates: HabitCount[];
  color: HabitColors;
  id: string;
  createdDate: number;
  notification?: {
    title: string;
    time: number;
  };
  type: HabitType;
};

export type HabitType = "one-time" | "total count";

export type HabitCount = {
  date: number;
  count: number;
};

export type NewHabit = {
  title: string;
  color?: HabitColors;
  frequency: Frequency;
  notification?: {
    title: string;
    time: number;
  };
  type: HabitType;
};

export type RootStackParamList = {
  Home: undefined;
  Viewer: { habit: Habit };
  Edit: { habit: Habit };
  Settings: undefined;
};
