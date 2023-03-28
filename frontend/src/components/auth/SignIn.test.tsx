import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SignIn from "./SignIn";

afterEach(() => {
  cleanup();
});

describe("Sign In Component", () => {
  describe("Sign In Header", () => {
    test("signin header is present", () => {
      render(
        <BrowserRouter>
          <SignIn />
        </BrowserRouter>
      );
      const signInHeader = screen.getByTestId("signinHeader");

      expect(signInHeader).toBeInTheDocument();
    });

    test("signin header Text is 'Login'", () => {
      render(
        <BrowserRouter>
          <SignIn />
        </BrowserRouter>
      );
      const signInHeader = screen.getByTestId("signinHeader");

      expect(signInHeader).toHaveTextContent("Login");
    });
  });

  describe("Sign In Email", () => {
    test("signin email is present", () => {
      render(
        <BrowserRouter>
          <SignIn />
        </BrowserRouter>
      );

      const signInEmail = screen.getByTestId("signinEmail");

      expect(signInEmail).toBeInTheDocument();
    });

    test("signin email is required", async () => {
      render(
        <BrowserRouter>
          <SignIn />
        </BrowserRouter>
      );

      const signInButton = screen.getByTestId(
        "signinButton"
      ) as HTMLButtonElement;

      const signInEmailError = screen.getByTestId(
        "signinEmailError"
      ) as HTMLDivElement;

      await act(() => {
        fireEvent.click(signInButton);
      });

      expect(signInEmailError).toBeInTheDocument();
      expect(signInEmailError.innerHTML).toEqual("email is required");
    });

    test("signin email must be an incubyte email", async () => {
      render(
        <BrowserRouter>
          <SignIn />
        </BrowserRouter>
      );

      const signInButton = screen.getByTestId(
        "signinButton"
      ) as HTMLButtonElement;

      const signInEmail = screen.getByTestId("signinEmail") as HTMLInputElement;

      const signInEmailError = screen.getByTestId(
        "signinEmailError"
      ) as HTMLDivElement;

      await act(() => {
        fireEvent.change(signInEmail, { target: { value: "john@gmail.co" } });
      });

      await act(() => {
        fireEvent.click(signInButton);
      });
      expect(signInEmailError).toBeInTheDocument();
      expect(signInEmailError.innerHTML).toEqual(
        "email must be an incubyte email"
      );
    });
  });

  describe("Sign In Password", () => {
    test("Password is present", () => {
      render(
        <BrowserRouter>
          <SignIn />
        </BrowserRouter>
      );

      const signInPassword = screen.getByTestId(
        "signinPassword"
      ) as HTMLInputElement;
      expect(signInPassword).toBeInTheDocument();
    });

    test("signin password is required", async () => {
      render(
        <BrowserRouter>
          <SignIn />
        </BrowserRouter>
      );

      const signInButton = screen.getByTestId(
        "signinButton"
      ) as HTMLButtonElement;

      const signInPasswordError = screen.getByTestId(
        "signinPasswordError"
      ) as HTMLDivElement;

      await act(() => {
        fireEvent.click(signInButton);
      });

      expect(signInPasswordError).toBeInTheDocument();
      expect(signInPasswordError.innerHTML).toEqual("password is required");
    });

    test("signin password is not valid", async () => {
      render(
        <BrowserRouter>
          <SignIn />
        </BrowserRouter>
      );

      const signInButton = screen.getByTestId(
        "signinButton"
      ) as HTMLButtonElement;

      const SignInPassword = screen.getByTestId(
        "signinPassword"
      ) as HTMLInputElement;

      const signInPasswordError = screen.getByTestId(
        "signinPasswordError"
      ) as HTMLDivElement;

      await act(() => {
        fireEvent.change(SignInPassword, { target: { value: "john" } });
        fireEvent.click(signInButton);
      });

      expect(signInPasswordError).toBeInTheDocument();
      expect(signInPasswordError.innerHTML).toEqual("password is not valid");
    });
  });

  describe("Sign In Don't Have AccountLink", () => {
    test("Signin Don't Have Account Link is present", () => {
      render(
        <BrowserRouter>
          <SignIn />
        </BrowserRouter>
      );

      const signInDontHaveAccountLink = screen.getByTestId(
        "signinDontHaveAccountLink"
      ) as HTMLInputElement;
      expect(signInDontHaveAccountLink).toBeInTheDocument();
    });
  });

  describe("Sign In  Forgot PassowrdLink", () => {
    test("Signin Forgot Password Link is present", () => {
      render(
        <BrowserRouter>
          <SignIn />
        </BrowserRouter>
      );

      const signInForgotPasswordLink = screen.getByTestId(
        "signinForgotPasswordLink"
      ) as HTMLInputElement;
      expect(signInForgotPasswordLink).toBeInTheDocument();
    });
  });

  describe("signIn Button", () => {
    test("signIn button is present", () => {
      render(
        <BrowserRouter>
          <SignIn />
        </BrowserRouter>
      );

      const signInButton = screen.getByTestId("signinButton");

      expect(signInButton).toBeInTheDocument();
    });

    test("signIn button Text is 'Sign In'", () => {
      render(
        <BrowserRouter>
          <SignIn />
        </BrowserRouter>
      );

      const signInButton = screen.getByTestId("signinButton");

      expect(signInButton).toHaveTextContent("Sign In");
    });
  });
});
