import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import * as router from "react-router";
import { BrowserRouter } from "react-router-dom";
import SignIn from "../components/auth/SignIn";
import SignUp from "../components/auth/SignUp";

afterEach(() => {
  cleanup();
});

const navigate = jest.fn();
beforeEach(() => {
  jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
});

describe("test authentication", () => {
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
        target: { value: "john" + randomNumber + "@incubyte.co" },
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
    });
    await waitFor(() => screen.getByRole("alert"));
    const signUpToast = await screen.getByRole("alert");
    expect(signUpToast).toBeInTheDocument();
  });

  test("redirect to homepage on signin success", async () => {
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

    act(() => {
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
    expect(window.location.href).toEqual("http://localhost/");
  });
});
