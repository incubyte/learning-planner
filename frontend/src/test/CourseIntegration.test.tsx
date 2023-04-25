import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SignIn from "../components/auth/SignIn";
import CoursePage from "../components/courses/Courses";

afterEach(() => {
  cleanup();
});

describe("test courses", () => {
  it("Accessing courses Page", async () => {
    const { getByRole, getAllByText } = render(
      <BrowserRouter>
        <SignIn />
        <CoursePage />
      </BrowserRouter>
    );

    const signInButton = screen.getByTestId(
      "signinButton"
    ) as HTMLButtonElement;
    const signInEmail = screen.getByTestId("signinEmail") as HTMLInputElement;

    const signInPassword = screen.getByTestId(
      "signinPassword"
    ) as HTMLInputElement;

    await act(() => {
      fireEvent.change(signInEmail, {
        target: { value: "shreyas@incubyte.co" },
      });
    });

    await act(() => {
      fireEvent.change(signInPassword, { target: { value: "Shreyas@111" } });
    });

    await act(() => {
      fireEvent.click(signInButton);
    });

    const navbar = getByRole("navigation");
    expect(navbar).toBeInTheDocument();

    const filterByTags = getByRole("filterByTags");
    expect(filterByTags).toBeInTheDocument();

    const coursePageIndexImage = getByRole("coursePageIndexImage");
    expect(coursePageIndexImage).toBeInTheDocument();

    expect(getByRole("popContent")).toBeInTheDocument();
    expect(getByRole("availContent")).toBeInTheDocument();
    // await waitFor(() => {
    const courses = getAllByText("Day 1 clean code kata");
    expect(courses).not.toBeNull();
    // });
  });
});
