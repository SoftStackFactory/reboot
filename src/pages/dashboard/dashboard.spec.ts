import "reflect-metadata";
import { DashboardPage } from './dashboard';
import { Testability } from "@angular/core";

let page = null;

beforeEach(() => {
    page = new DashboardPage();
  });

describe("", () => {

    test("test-color", () => {

        expect.assertions(1);

        let color = page.color;
        expect(color).toEqual("black");
    })

} )