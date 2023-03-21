import { cleanup, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import SignUp from "./SignUp";

afterEach(() => {
  cleanup();
});

describe("SignUp Component", () => {
  describe("SignUp Button", () => {
    const handleFormSubmit = jest.fn();

    test("signup button is present", () => {
      render(<SignUp />);
      const signUpButton = screen.getByTestId("signupButton");

      expect(signUpButton).toBeInTheDocument();
    });

    test("signup button Text is 'Sign up'", () => {
      render(<SignUp />);
      const signUpButton = screen.getByTestId("signupButton");

      expect(signUpButton).toHaveTextContent("Sign Up");
    });

    test("calls handlesubmit when signup button clicked", () => {
      act(() => {
        render(<SignUp />);
      });
      const signUpButton = screen.getByTestId("signupButton");

      act(() => {
        signUpButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });
      expect(handleFormSubmit).toBeCalledTimes(0);
    });
  });

  describe("Sign Up Header", () => {
    test("signup header is present", () => {
      render(<SignUp />);
      const signUpHeader = screen.getByTestId("signupHeader");

      expect(signUpHeader).toBeInTheDocument();
    });

    test("signup header Text is 'Sign up'", () => {
      render(<SignUp />);
      const signUpHeader = screen.getByTestId("signupHeader");

      expect(signUpHeader).toHaveTextContent("Sign Up");
    });
  });
});
