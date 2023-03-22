import { cleanup, render, screen } from "@testing-library/react";
import SignIn from "./SignIn";

afterEach(() => {
  cleanup();
});

describe("Sign In Component", () => {
  describe("Sign In Header", () => {
    test("signin header is present", () => {
      render(<SignIn />);
      const signInHeader = screen.getByTestId("signinHeader");

      expect(signInHeader).toBeInTheDocument();
    });

    test("signin header Text is 'Login'", () => {
      render(<SignIn />);
      const signInHeader = screen.getByTestId("signinHeader");

      expect(signInHeader).toHaveTextContent("Login");
    });
  });
});
