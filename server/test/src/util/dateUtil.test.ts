import { expect } from "chai";
import { getLocalDate, getLocalDateTomorrow } from "../../../src/util/dateUtil";

describe("getLocalDate", () => {
  it("Should return today's date string", () => {
    const today = new Date();
    const todayString = today.toISOString().split("T")[0];
    expect(getLocalDate()).to.equal(todayString);
  });
});

describe("getLocalDateTomorrow", () => {
  it("Should return tomorrow's date string", () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowString = tomorrow.toISOString().split("T")[0];
    expect(getLocalDateTomorrow()).to.equal(tomorrowString);
  });
});
