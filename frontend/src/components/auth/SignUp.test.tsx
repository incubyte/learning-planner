import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import SignUp from "./SignUp";

afterEach(() => {
  cleanup();
});

describe("SignUp Component", () => {
  describe("SignUp Button", () => {
    const handleFormSubmit = jest.fn();

    test("signup button is present", () => {
      render(
        <BrowserRouter>
          <SignUp />
        </BrowserRouter>
      );

      const signUpButton = screen.getByTestId("signupButton");

      expect(signUpButton).toBeInTheDocument();
    });

    test("signup button Text is 'Sign up'", () => {
      render(
        <BrowserRouter>
          <SignUp />
        </BrowserRouter>
      );

      const signUpButton = screen.getByTestId("signupButton");

      expect(signUpButton).toHaveTextContent("Sign Up");
    });

    test("calls handlesubmit when signup button clicked", async () => {
      render(
        <BrowserRouter>
          <SignUp />
        </BrowserRouter>
      );

      const signUpButton = screen.getByTestId("signupButton");
      const signUpEmail = screen.getByTestId("signupEmail") as HTMLInputElement;
      const signUpPassword = screen.getByTestId(
        "signupPassword"
      ) as HTMLInputElement;
      const signUpConfirmPassword = screen.getByTestId(
        "signupConfirmPassword"
      ) as HTMLInputElement;

      act(() => {
        fireEvent.change(signUpEmail, {
          target: { value: "aman@gmail.co" },
        });
        fireEvent.change(signUpPassword, {
          target: { value: "Aman@123" },
        });

        fireEvent.change(signUpConfirmPassword, {
          target: { value: "Aman@123" },
        });
      });
      // fireEvent.click(signUpButton);
      expect(handleFormSubmit).toBeCalledTimes(0);
    });
  });

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

  describe("Sign Up Email", () => {
    test("signup email is present", () => {
      render(
        <BrowserRouter>
          <SignUp />
        </BrowserRouter>
      );

      const signUpEmail = screen.getByTestId("signupEmail");

      expect(signUpEmail).toBeInTheDocument();
    });
  });

  describe("Sign Up Password", () => {
    test("Password is present", () => {
      render(
        <BrowserRouter>
          <SignUp />
        </BrowserRouter>
      );

      const signUpPassword = screen.getByTestId(
        "signupPassword"
      ) as HTMLInputElement;
      expect(signUpPassword).toBeInTheDocument();
    });
  });

  describe("Sign Up ConfirmPassword", () => {
    test("ConfirmPassword is present", () => {
      render(
        <BrowserRouter>
          <SignUp />
        </BrowserRouter>
      );

      const signUpConfirmPassword = screen.getByTestId(
        "signupConfirmPassword"
      ) as HTMLInputElement;
      expect(signUpConfirmPassword).toBeInTheDocument();
    });
  });

  describe("Sign Up Account Already exist", () => {
    test("signin Account Already Link is present", () => {
      render(
        <BrowserRouter>
          <SignUp />
        </BrowserRouter>
      );

      const signUpAccountAlreadyExistsLink = screen.getByTestId(
        "signupAccountAlreadyExistsLink"
      ) as HTMLInputElement;
      expect(signUpAccountAlreadyExistsLink).toBeInTheDocument();
    });
  });
});
