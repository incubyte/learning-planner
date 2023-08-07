import { cleanup, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CoursePageIndex from "./CoursePageIndex";
import Symbol from "../../assets/symbol.png";

afterEach(() => {
  cleanup();
});

describe("Welcome Image", () => {
  test("Image is present", () => {
    render(
      <BrowserRouter>
        <CoursePageIndex />
      </BrowserRouter>
    );

    const indexImage = screen.getByRole("coursePageIndexImage");
    expect(indexImage).toBeInTheDocument();
  });
});