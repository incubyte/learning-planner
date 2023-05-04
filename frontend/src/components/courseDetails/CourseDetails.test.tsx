import { cleanup, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CourseDetails from "./CourseDetails";

afterEach(() => {
  cleanup();
});

describe("Course Component", () => {
  describe("Course Image", () => {
    test("Course Image is present", () => {
      render(
        <BrowserRouter>
          <CourseDetails />
        </BrowserRouter>
      );
      const courseImage = screen.getByTestId("courseImage");

      expect(courseImage).toBeInTheDocument();
    });
  });
  describe("Course Name", () => {
    test("Course Name is present", () => {
      render(
        <BrowserRouter>
          <CourseDetails />
        </BrowserRouter>
      );
      const courseName = screen.getByTestId("courseName");

      expect(courseName).toBeInTheDocument();
    });
  });
  describe("Course Description", () => {
    test("Course Description is present", () => {
      render(
        <BrowserRouter>
          <CourseDetails />
        </BrowserRouter>
      );
      const courseDescription = screen.getByTestId("courseDescription");

      expect(courseDescription).toBeInTheDocument();
    });
  });
  describe("Course Tag", () => {
    test("Course Tag is present", () => {
      render(
        <BrowserRouter>
          <CourseDetails />
        </BrowserRouter>
      );
      const courseTags = screen.getByTestId("courseTags");

      expect(courseTags).toBeInTheDocument();
    });
  });
  describe("Course Button", () => {
    test("Course Button is present", () => {
      render(
        <BrowserRouter>
          <CourseDetails />
        </BrowserRouter>
      );
      const courseButton = screen.getByTestId("courseButton");

      expect(courseButton).toBeInTheDocument();
    });
  });
});
