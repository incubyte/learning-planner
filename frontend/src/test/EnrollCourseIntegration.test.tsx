import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import SignIn from "../components/auth/SignIn";
import CourseDetails from "../components/courseDetails/CourseDetails";

afterEach(() => {
  cleanup();
});

function sleep(ms: any) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
beforeAll(async () => {
  render(
    <BrowserRouter>
      <SignIn />
    </BrowserRouter>
  );

  const signInButton = screen.getByTestId("signinButton") as HTMLButtonElement;
  const signInEmail = screen.getByTestId("signinEmail") as HTMLInputElement;

  const signInPassword = screen.getByTestId(
    "signinPassword"
  ) as HTMLInputElement;

  await act(() => {
    fireEvent.change(signInEmail, {
      target: { value: "aman.r@incubyte.co" },
    });
  });

  await act(() => {
    fireEvent.change(signInPassword, { target: { value: "Aman@111" } });
  });

  await act(() => {
    fireEvent.click(signInButton);
  });
});

describe("test course detail", () => {
  jest.setTimeout(30000);
  it("Accessing courses detail Page", async () => {
    const mockId = "123";
    render(
      <MemoryRouter initialEntries={[`/course/${mockId}`]}>
        <Routes>
          <Route path="/course/:id" element={<CourseDetails />}></Route>
        </Routes>
      </MemoryRouter>
    );

    const enrollButton = screen.getByTestId(
      "courseEnroll"
    ) as HTMLButtonElement;

    await act(() => {
      fireEvent.click(enrollButton);
    });
    await sleep(10000);
    await waitFor(() => expect(screen.getByRole("alert")).toBeInTheDocument());
  });
});
