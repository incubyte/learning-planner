import { cleanup, render } from "@testing-library/react";
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
});
