import { Frequency, HabitColors } from "./constants";

export type Habit = {
  name: string;
  frequency: Frequency;
  dates: number[];
  color: string;
  id: string;
  createdDate: number;
  notification?: {
    title: string;
    time: number;
  };
};

export type NewHabit = {
  title: string;
  color?: HabitColors;
  frequency: Frequency;
  notification?: {
    title: string;
    time: number;
  };
};

export type RootStackParamList = {
  Home: undefined;
  Viewer: { habit: Habit };
  Edit: { habit: Habit };
  Settings: undefined;
};
