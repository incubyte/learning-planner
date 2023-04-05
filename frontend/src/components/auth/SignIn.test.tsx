import { cleanup, render, screen } from "@testing-library/react";
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

  describe("Sign in Form is present", () => {
    test("signin form is present", () => {
      render(
        <BrowserRouter>
          <SignIn />
        </BrowserRouter>
      );

      const signInForm = screen.getByTestId("signinForm");

      expect(signInForm).toBeInTheDocument();
    });
  });
});
