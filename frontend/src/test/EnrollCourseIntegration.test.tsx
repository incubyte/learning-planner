import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import SignIn from "../components/auth/SignIn";
import CourseDetails from "../components/courseDetails/CourseDetails";

afterEach(() => {
  cleanup();
});

function sleep(ms: any) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
describe("test course detail", () => {
  jest.setTimeout(30000);
  it("Accessing courses detail Page", async () => {
    const mockId = "bacd123445afha";
    render(
      <MemoryRouter initialEntries={[`/course/${mockId}`]}>
        <SignIn />
        <Routes>
          <Route path="/course/:id" element={<CourseDetails />}></Route>
        </Routes>
      </MemoryRouter>
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

    const enrollButton = screen.getByTestId(
      "courseEnroll"
    ) as HTMLButtonElement;

    await act(async () => {
      fireEvent.click(enrollButton);
    });
    await sleep(20000);
    await waitFor(() => expect(screen.getByRole("alert")).toBeInTheDocument());
  });
});
