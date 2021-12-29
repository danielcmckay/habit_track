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

export enum Frequency {
  Daily = "daily",
  Weekly = "weekly",
  Biweekly = "biweekly",
  Monthly = "monthly"
}

export enum HabitColors {
  Red = "#EF5A5C",
  Yellow = "#F5EF7B",
  Green = "#29C26C",
  Blue = "#4C5BF1",
  Purple = "#867BF5",
  Tan = "#A68467",
  Grey = "#979797",
}

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
  Settings: undefined
};