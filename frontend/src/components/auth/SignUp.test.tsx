import { cleanup, render, screen } from "@testing-library/react";
import SignUp from "./SignUp";

afterEach(() => {
  cleanup();
});

describe("SignUp Component", () => {
  render(<SignUp />);

  const signUpButton = screen.getByTestId("signupButton");
  test("signup button is present", () => {
    expect(signUpButton).toBeInTheDocument();
  });

  test("signup button Text is 'Sign up'", () => {
    expect(signUpButton).toHaveTextContent("Sign Up");
  });
});
