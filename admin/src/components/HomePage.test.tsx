import { cleanup, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import HomePage from "./HomePage";

afterEach(() => {
  cleanup();
});

describe("Home Component", () => {
  test("user card is present in Home", () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    const userCard = screen.getByTestId("userCard") as HTMLInputElement;
    expect(userCard).toBeInTheDocument();
  });
  test("Course card is present in Home", () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    const courseCard = screen.getByTestId("courseCard") as HTMLInputElement;
    expect(courseCard).toBeInTheDocument();
  });
});
