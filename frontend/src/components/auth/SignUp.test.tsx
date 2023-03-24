import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

    test("toast 'Account created' when signup success", async () => {
      render(
        <BrowserRouter>
          <SignUp />
        </BrowserRouter>
      );

      const signUpButton = screen.getByTestId(
        "signupButton"
      ) as HTMLButtonElement;
      const signUpEmail = screen.getByTestId("signupEmail") as HTMLInputElement;
      const signUpPassword = screen.getByTestId(
        "signupPassword"
      ) as HTMLInputElement;
      const signUpConfirmPassword = screen.getByTestId(
        "signupConfirmPassword"
      ) as HTMLInputElement;

      const signUpPasswordError = screen.getByTestId(
        "signupPasswordError"
      ) as HTMLDivElement;

      const signUpConfirmPasswordError = screen.getByTestId(
        "signupConfirmPasswordError"
      ) as HTMLDivElement;

      await act(() => {
        // userEvent.type(signUpEmail, "john@incubyte.co");
      });

      await act(() => {
        userEvent.type(signUpPassword, "Aman@123");
      });
      await act(() => {
        userEvent.type(signUpConfirmPassword, "Aman@123");
      });
      await act(() => {
        userEvent.click(signUpButton);
      });
      const signUpToast = screen.getByTestId("signupToast");
      console.log(signUpEmail.value);
      expect(signUpToast).toBeInTheDocument();
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

    test("signup email is required", async () => {
      render(
        <BrowserRouter>
          <SignUp />
        </BrowserRouter>
      );

      const signUpButton = screen.getByTestId(
        "signupButton"
      ) as HTMLButtonElement;

      const signUpEmailError = screen.getByTestId(
        "signupEmailError"
      ) as HTMLDivElement;

      await act(() => {
        userEvent.click(signUpButton);
      });

      expect(signUpEmailError).toBeInTheDocument();
      expect(signUpEmailError.innerHTML).toEqual("email is required");
    });

    test("signup email is not valid", async () => {
      render(
        <BrowserRouter>
          <SignUp />
        </BrowserRouter>
      );

      const signUpButton = screen.getByTestId(
        "signupButton"
      ) as HTMLButtonElement;

      const signUpEmail = screen.getByTestId("signupEmail") as HTMLInputElement;

      const signUpEmailError = screen.getByTestId(
        "signupEmailError"
      ) as HTMLDivElement;

      await act(() => {
        userEvent.type(signUpEmail, "john@gmail.co");
        userEvent.click(signUpButton);
      });

      expect(signUpEmailError).toBeInTheDocument();
      expect(signUpEmailError.innerHTML).toEqual("email is not valid");
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

    test("signup password is required", async () => {
      render(
        <BrowserRouter>
          <SignUp />
        </BrowserRouter>
      );

      const signUpButton = screen.getByTestId(
        "signupButton"
      ) as HTMLButtonElement;

      const signUpPasswordError = screen.getByTestId(
        "signupPasswordError"
      ) as HTMLDivElement;

      await act(() => {
        userEvent.click(signUpButton);
      });

      expect(signUpPasswordError).toBeInTheDocument();
      expect(signUpPasswordError.innerHTML).toEqual("password is required");
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

    test("signup confirmpassword is required", async () => {
      render(
        <BrowserRouter>
          <SignUp />
        </BrowserRouter>
      );

      const signUpButton = screen.getByTestId(
        "signupButton"
      ) as HTMLButtonElement;

      const signUpConfirmPasswordError = screen.getByTestId(
        "signupConfirmPasswordError"
      ) as HTMLDivElement;

      await act(() => {
        userEvent.click(signUpButton);
      });

      expect(signUpConfirmPasswordError).toBeInTheDocument();
      expect(signUpConfirmPasswordError.innerHTML).toEqual(
        "confirm password is required"
      );
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
