import { HabitCount } from "./models";

/*
 * DATE UTILS
 */
export const getDateRange = (startDate: number, endDate: number) => {
  let dates: Date[] = [];
  const theDate = new Date(new Date(startDate).setHours(0, 0, 0, 0));
  while (theDate < new Date(new Date(endDate).setHours(0, 0, 0, 0))) {
    dates = [...dates, new Date(theDate)];
    theDate.setDate(theDate.getDate() + 1);
  }
  return [...dates, new Date(endDate)];
};

export const getDaysBetween = (startDate: Date, endDate: Date): number => {
  return Math.floor(
    (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24) + 1
  );
};

export const getDayName = (date: Date) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
};

export const dateIsInRange = (date: number, range: number[]) => {
  return range
    .map((d) => new Date(d).toDateString())
    .includes(new Date(date).toDateString());
};

export const MONTHS = [
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
];

export const filterDataByMonths = (dates: HabitCount[]) => {
  let result = [];
  for (let i = 0; i < 12; i++) {
    result.push(
      dates.map((d) => d.date).filter((d) => new Date(d).getMonth() === i)
        .length
    );
  }

  return result;
};

/*
 * COLOR UTILS
 */
export function hexToRgb(hex: string) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: String(parseInt(result[1], 16)),
        g: String(parseInt(result[2], 16)),
        b: String(parseInt(result[3], 16)),
      }
    : { r: "", g: "", b: "" };
}

/*
 * STRING UTILS
 */
export const toUpper = (word: string) =>
  word.substring(0, 1).toUpperCase() + word.substring(1);
