export const getDateRange = (startDate: Date, endDate: Date) => {
  let dates: Date[] = [];

  const theDate = new Date(startDate);
  while (theDate < new Date(endDate)) {
    dates = [...dates, new Date(theDate)];
    theDate.setDate(theDate.getDate() + 1);
  }
  dates = [...dates, new Date(endDate)];

  return dates;
};

export const toUpper = (word: string) =>
  word.substring(0, 1).toUpperCase() + word.substring(1);
