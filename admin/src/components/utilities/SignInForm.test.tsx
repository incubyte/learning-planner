import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SignInForm from "./SignInForm";

afterEach(() => {
  cleanup();
});
const handleFormSubmit = jest.fn();
describe("Sign In Form", () => {
  describe("Sign In Email", () => {
    test("signin email is present", () => {
      render(
        <BrowserRouter>
          <SignInForm handleFormSubmit={handleFormSubmit} />
        </BrowserRouter>
      );

      const signInEmail = screen.getByTestId("signinEmail");

      expect(signInEmail).toBeInTheDocument();
    });

    test("signin email is required", async () => {
      render(
        <BrowserRouter>
          <SignInForm handleFormSubmit={handleFormSubmit} />
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

    test("signin email must be an incubyte domain", async () => {
      render(
        <BrowserRouter>
          <SignInForm handleFormSubmit={handleFormSubmit} />
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
        "email must be with incubyte domain"
      );
    });
  });

  describe("Sign In Password", () => {
    test("Password is present", () => {
      render(
        <BrowserRouter>
          <SignInForm handleFormSubmit={handleFormSubmit} />
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
          <SignInForm handleFormSubmit={handleFormSubmit} />
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
          <SignInForm handleFormSubmit={handleFormSubmit} />
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

  describe("Sign In  Forgot PassowrdLink", () => {
    test("Signin Forgot Password Link is present", () => {
      render(
        <BrowserRouter>
          <SignInForm handleFormSubmit={handleFormSubmit} />
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
          <SignInForm handleFormSubmit={handleFormSubmit} />
        </BrowserRouter>
      );

      const signInButton = screen.getByTestId("signinButton");

      expect(signInButton).toBeInTheDocument();
    });

    test("signIn button Text is 'Sign In'", () => {
      render(
        <BrowserRouter>
          <SignInForm handleFormSubmit={handleFormSubmit} />
        </BrowserRouter>
      );

      const signInButton = screen.getByTestId("signinButton");

      expect(signInButton).toHaveTextContent("Sign In");
    });

    test("sign in handle submit  clicked when signIn success", async () => {
      const handleFormSubmit = jest.fn();
      render(
        <BrowserRouter>
          <SignInForm handleFormSubmit={handleFormSubmit} />
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
          target: { value: "john@incubyte.co" },
        });
      });

      await act(() => {
        fireEvent.change(signInPassword, { target: { value: "John@123" } });
      });
      await act(() => {
        fireEvent.click(signInButton);
      });
      expect(handleFormSubmit).toBeCalledTimes(1);
    });
  });
});
