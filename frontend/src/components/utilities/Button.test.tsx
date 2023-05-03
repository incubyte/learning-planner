import { cleanup, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Button from "./Button";

afterEach(() => {
  cleanup();
});

describe("Button", () => {
  test("Button is present in coursecard", () => {
    render(
      <BrowserRouter>
        <Button title="Explore" />
      </BrowserRouter>
    );

    const courseButton = screen.getByTestId("courseCardButton");
    expect(courseButton).toBeInTheDocument();
  });
});