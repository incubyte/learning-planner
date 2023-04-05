import { cleanup, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SignUp from "./SignUp";

afterEach(() => {
  cleanup();
});

describe("SignUp Component", () => {
  describe("Sign Up Header", () => {
    test("signup header is present", () => {
      render(
        <BrowserRouter>
          <SignUp />
        </BrowserRouter>
      );

      const signUpHeader = screen.getByTestId("signupHeader");

      expect(signUpHeader).toBeInTheDocument();
    });

    test("signup header Text is 'Sign up'", () => {
      render(
        <BrowserRouter>
          <SignUp />
        </BrowserRouter>
      );

      const signUpHeader = screen.getByTestId("signupHeader");

      expect(signUpHeader).toHaveTextContent("Sign Up");
    });
  });

  describe("Sign Up Form is present", () => {
    test("signup form is present", () => {
      render(
        <BrowserRouter>
          <SignUp />
        </BrowserRouter>
      );

      const signUpForm = screen.getByTestId("signupForm");

      expect(signUpForm).toBeInTheDocument();
    });
  });
});
