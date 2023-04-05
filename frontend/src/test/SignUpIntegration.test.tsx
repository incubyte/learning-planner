import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SignUp from "../components/auth/SignUp";

afterEach(() => {
  cleanup();
});

function sleep(ms: any) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe("Test sign up ", () => {
  jest.setTimeout(30000);
  it("toast 'account created' on signup success", async () => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );
    const signUpButton = screen.getByTestId(
      "signupButton"
    ) as HTMLButtonElement;
    const signUpEmail = screen.getByTestId("signupEmail") as HTMLInputElement;

    const signUpPassword = screen.getByTestId(
      "signupPassword"
    ) as HTMLInputElement;

    const signUpConfirmPassword = screen.getByTestId(
      "signupConfirmPassword"
    ) as HTMLInputElement;

    await act(() => {
      fireEvent.change(signUpEmail, {
        target: { value: "aman.r@incubyte.co" },
      });
    });

    await act(() => {
      fireEvent.change(signUpPassword, { target: { value: "John@111" } });
    });
    await act(() => {
      fireEvent.change(signUpConfirmPassword, {
        target: { value: "John@111" },
      });
    });
    await act(() => {
      fireEvent.click(signUpButton);
    });
    await sleep(10000);
    await waitFor(() => expect(screen.getByRole("alert")).toBeInTheDocument());
  });
});
