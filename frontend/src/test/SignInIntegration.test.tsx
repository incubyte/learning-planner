import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SignIn from "../components/auth/SignIn";

afterEach(() => {
  cleanup();
});

describe("test signin", () => {
  jest.setTimeout(30000);
  it("alert 'user not exists' for new user", async () => {
    render(
      <BrowserRouter>
        <SignIn />
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
        target: { value: "john@incubyte.co" },
      });
    });

    await act(() => {
      fireEvent.change(signInPassword, { target: { value: "John@123" } });
    });

    await act(() => {
      fireEvent.click(signInButton);
    });
    await waitFor(() => expect(screen.getByRole("alert")).toBeInTheDocument());
  });
});
