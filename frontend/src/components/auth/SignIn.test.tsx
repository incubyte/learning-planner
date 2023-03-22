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

    test("signin Password is editable", () => {
      render(
        <BrowserRouter>
          <SignIn />
        </BrowserRouter>
      );

      const signInPassword = screen.getByTestId(
        "signinPassword"
      ) as HTMLInputElement;

      fireEvent.change(signInPassword, {
        target: { value: "testing" },
      });
      expect(signInPassword.value).toMatch("testing");
    });

    test("Default type for Password is password ", () => {
      render(
        <BrowserRouter>
          <SignIn />
        </BrowserRouter>
      );

      const signInPassword = screen.getByTestId(
        "signinPassword"
      ) as HTMLInputElement;
      expect(signInPassword.type).toBe("password");
    });

    test("toggle Password type when show button clicked", () => {
      render(
        <BrowserRouter>
          <SignIn />
        </BrowserRouter>
      );

      const signInPassword = screen.getByTestId(
        "signinPassword"
      ) as HTMLInputElement;

      const signInPasswordButton = screen.getByTestId("signinPasswordButton");

      expect(signInPassword.type).toBe("password");

      fireEvent.click(signInPasswordButton);

      expect(signInPassword.type).toBe("text");

      fireEvent.click(signInPasswordButton);

      expect(signInPassword.type).toBe("password");
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
