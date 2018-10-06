import "reflect-metadata";
import { AssessmentPage } from './assessment';

/**
 * Block level variable for assigning the Mock DatesProvider service to
 *
 */
let page = null;

/**
 * Re-create the MockDatesProvider class object before each
 * unit test is run
 *
 */
beforeEach(() => {
  page = new AssessmentPage();
});

/**
 * Group the unit tests for the MockDatesProvider into one
 * test suite
 *
 */
describe("Dates service", () => {

  /**
   * Test that the returned value matches today's date
   */
  test("Returns the current date", () => {
    expect.assertions(1); // Number of tests that need to pass
    let currentDate = page.returnCurrentDate(); // Execute the returnCurentDate() function and set return
    expect(currentDate).toEqual("2018-10-06"); // Test if the value is equal to this date
  });

  /**
   * Test that the total months of the year are returned
   */
  test("Returns all of the months of the year", () => {
    expect.assertions(2); // Number of tests that need to pass
    let months = page.returnMonthsOfTheYear(), // Execute the returnMonthsOfTheYear() function and set return
    expected = ["July", "November"]; // Expected array of possible values

    expect(months).toHaveLength(12); // Test of Months length
    expect(months).toEqual(expect.arrayContaining(expected)); // Test if array of expected value exists against returned value
  });

  /**
   * Test that the current month is returned
   */
  test("Returns the current month", () => {
    expect.assertions(1); // Number of tests that need to pass
    let currentMonth = page.returnCurrentMonth(); // Execute the returnCurrentMonth() function and set return

    expect(currentMonth).toBe("October"); // Test if current month equals the month listed
  });

  /**
   * Test that the current timestamp is returned
   */
  test("Returns the current timestamp", () => {
    expect.assertions(1); // Number of tests that need to pass
    let timestamp = page.returnCurrentTimestamp(); // Execute the returnCurrentTimestamp() function and set return

    expect(timestamp).toBeGreaterThanOrEqual(Math.floor(Date.now() / 1000)); // Test if the returned value equals the current time stamp 
  });

});
