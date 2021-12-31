import { dateIsInRange, getDateRange, getDaysBetween } from "../utils/utils";

test("getDaysBetween", () => {
  const startDate: Date = new Date("12-01-2021");
  const endDate: Date = new Date("12-25-21");

  expect(getDaysBetween(startDate, endDate)).toEqual(25);
});

test("getDateRange", () => {
  const startDate: number = new Date("12-01-2021").valueOf();
  const endDate: number = new Date("12-05-21").valueOf();

  expect(getDateRange(startDate, endDate)).toEqual([
    new Date("12-01-2021"),
    new Date("12-02-2021"),
    new Date("12-03-2021"),
    new Date("12-04-2021"),
    new Date("12-05-2021"),
  ]);
});

test("dateIsInRange", () => {
  const startDate: number = new Date("12-01-2021").valueOf();
  const endDate: number = new Date("12-05-21").valueOf();

  const range = getDateRange(startDate, endDate);

  expect(
    dateIsInRange(
      new Date("11-01-2021").valueOf(),
      range.map((r) => r.valueOf())
    )
  ).toBe(false);
  expect(
    dateIsInRange(
      new Date("12-01-2021").valueOf(),
      range.map((r) => r.valueOf())
    )
  ).toBe(true);
});
