export const getDateRange = (startDate: number, endDate: number) => {
  let dates: Date[] = [];
  const theDate = new Date(startDate);
  while (theDate < new Date(endDate)) {
    dates = [...dates, new Date(theDate)];
    theDate.setDate(theDate.getDate() + 1);
  }
  return [...dates, new Date(endDate)];
};

export const toUpper = (word: string) =>
  word.substring(0, 1).toUpperCase() + word.substring(1);

export const getDaysBetween = (startDate: Date, endDate: Date): number => {
  return Math.floor(
    (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24) + 1
  );
};

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
