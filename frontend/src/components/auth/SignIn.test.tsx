import { cleanup, fireEvent, render, screen } from "@testing-library/react";
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

    test("signin Email is editable", () => {
      render(
        <BrowserRouter>
          <SignIn />
        </BrowserRouter>
      );

      const signInEmail = screen.getByTestId("signinEmail") as HTMLInputElement;
      fireEvent.change(signInEmail, {
        target: { value: "testing" },
      });
      expect(signInEmail.value).toMatch("testing");
    });
  });
});
