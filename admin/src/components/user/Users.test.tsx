import { cleanup, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Users from "./Users";

afterEach(() => {
  cleanup();
});

describe("Users Component", () => {
  describe("User Table", () => {
    test("User Table is present", () => {
      render(
        <BrowserRouter>
          <Users />
        </BrowserRouter>
      );
      const usersTable = screen.getByTestId("UsersTable");

      expect(usersTable).toBeInTheDocument();
    });
  });
});
