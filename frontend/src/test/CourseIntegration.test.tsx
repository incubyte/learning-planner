import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CoursePage from "../components/courses/Courses";
import SignIn from "../components/auth/SignIn";

afterEach(() => {
  cleanup();
});

describe("test courses", () => {
  it("Accessing courses Page", async () => {
    const { getByRole } = render(
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

    const footer = getByRole("footer");
    expect(footer).toBeInTheDocument();

    const coursePageIndexImage = getByRole("coursePageIndexImage");
    expect(coursePageIndexImage).toBeInTheDocument();

    expect(getByRole("popContent")).toBeInTheDocument();
    expect(getByRole("availContent")).toBeInTheDocument();
  });
});
