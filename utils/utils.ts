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
