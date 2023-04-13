import { cleanup, fireEvent, render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Courses from "./Courses";

afterEach(() => {
  cleanup();
});

describe("Course Page ", () => {
  test("Course Page should render all Components", () => {
    const { getByRole } = render(
      <BrowserRouter>
        <Courses />
      </BrowserRouter>
    );
    const navbar = getByRole("navigation");
    expect(navbar).toBeInTheDocument();

    const footer = getByRole("footer");
    expect(footer).toBeInTheDocument();

    const coursePageIndexImage = getByRole("coursePageIndexImage");
    expect(coursePageIndexImage).toBeInTheDocument();

    expect(getByRole("popContent")).toBeInTheDocument();
    expect(getByRole("availContent")).toBeInTheDocument();
  });

  test("filters courses by name when a search query is entered", () => {
    const { getByRole, getByPlaceholderText } = render(
      <BrowserRouter>
        <Courses />
      </BrowserRouter>
    );
    const popularCourseList = [
      {
        courseImage:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtbEno7OdEiusIYUNSglF3c2UxRluhs8ZpR951-9hs&s",
        courseName: "Java",
      },
      {
        courseImage:
          "https://qph.cf2.quoracdn.net/main-qimg-28cadbd02699c25a88e5c78d73c7babc",
        courseName: "Python",
      },
    ];

    const availableCourseList = [
      {
        courseImage:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtbEno7OdEiusIYUNSglF3c2UxRluhs8ZpR951-9hs&s",
        courseName: "Java",
      },
      {
        courseImage:
          "https://qph.cf2.quoracdn.net/main-qimg-28cadbd02699c25a88e5c78d73c7babc",
        courseName: "Python",
      },
    ];

    fireEvent.change(getByPlaceholderText("Search..."), {
      target: { value: "Python" },
    });
    expect(getByRole("popContent")).toHaveTextContent("Python");
    expect(getByRole("availContent")).not.toHaveTextContent("React");
  });

  test("displays all courses when the search query is empty", () => {
    const { getByRole } = render(
      <BrowserRouter>
        <Courses />
      </BrowserRouter>
    );
    const popularCourseList = [
      {
        courseImage:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtbEno7OdEiusIYUNSglF3c2UxRluhs8ZpR951-9hs&s",
        courseName: "Java",
      },
      {
        courseImage:
          "https://qph.cf2.quoracdn.net/main-qimg-28cadbd02699c25a88e5c78d73c7babc",
        courseName: "Python",
      },
    ];

    const availableCourseList = [
      {
        courseImage:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtbEno7OdEiusIYUNSglF3c2UxRluhs8ZpR951-9hs&s",
        courseName: "Java",
      },
      {
        courseImage:
          "https://qph.cf2.quoracdn.net/main-qimg-28cadbd02699c25a88e5c78d73c7babc",
        courseName: "Angular",
      },
    ];
    expect(getByRole("popContent")).toHaveTextContent("Python");
    expect(getByRole("availContent")).toHaveTextContent("Java");
  });
});
