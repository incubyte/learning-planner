import { BrowserRouter } from "react-router-dom";
import { cleanup, render, screen } from "@testing-library/react";
import CourseCard from "./CourseCard";

afterEach(() => {
  cleanup();
});

describe("Course Card", () => {
  test("Course card consist of Course Image, Course Name and button", () => {
    render(
      <BrowserRouter>
        <CourseCard
          courseImage={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtbEno7OdEiusIYUNSglF3c2UxRluhs8ZpR951-9hs&s"
          }
          courseName={"Java"}
          id={"1"}
        />
      </BrowserRouter>
    );

    const courseCardImage = screen.getByTestId("courseCardImage");
    expect(courseCardImage).toBeInTheDocument();

    const courseCardName = screen.getByTestId("courseCardName");
    expect(courseCardName).toBeInTheDocument();

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });
});
