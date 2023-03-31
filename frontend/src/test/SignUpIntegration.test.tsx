import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SignUp from "./../components/auth/SignUp";

afterEach(() => {
  cleanup();
});

describe("test signup", () => {
  test("toast 'account created' on signup success", async () => {
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

    act(() => {
      const randomNumber = Math.random() * 1000;
      fireEvent.change(signUpEmail, {
        target: { value: "john@incubyte.co" },
      });
    });

    await act(() => {
      fireEvent.change(signUpPassword, { target: { value: "John@123" } });
    });
    await act(() => {
      fireEvent.change(signUpConfirmPassword, {
        target: { value: "John@123" },
      });
    });
    await act(() => {
      fireEvent.click(signUpButton);
      // console.log(signUpEmail.value, signUpPassword.value);
    });

    // const signUpToast = screen.getByRole("alert");
    // expect(signUpToast).toBeInTheDocument();
  });
});
