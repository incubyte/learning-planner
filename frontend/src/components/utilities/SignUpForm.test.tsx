import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SignUpForm from "./SignUpForm";

afterEach(() => {
  cleanup();
});

const handleFormSubmit = jest.fn();

describe("SignUp Component", () => {
  describe("SignUpForm Email", () => {
    test("signup email is present", () => {
      render(
        <BrowserRouter>
          <SignUpForm handleFormSubmit={handleFormSubmit} />
        </BrowserRouter>
      );
      const signUpEmail = screen.getByTestId("signupEmail");

      expect(signUpEmail).toBeInTheDocument();
    });

    test("signup email is required", async () => {
      render(
        <BrowserRouter>
          <SignUpForm handleFormSubmit={handleFormSubmit} />
        </BrowserRouter>
      );

      const signUpButton = screen.getByTestId(
        "signupButton"
      ) as HTMLButtonElement;

      const signUpEmailError = screen.getByTestId(
        "signupEmailError"
      ) as HTMLDivElement;

      await act(() => {
        fireEvent.click(signUpButton);
      });

      expect(signUpEmailError).toBeInTheDocument();
      expect(signUpEmailError.innerHTML).toEqual("email is required");
    });

    test("signup email must be an incubyte email", async () => {
      render(
        <BrowserRouter>
          <SignUpForm handleFormSubmit={handleFormSubmit} />
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
        fireEvent.change(signUpEmail, { target: { value: "john@gmail.co" } });
      });

      await act(() => {
        fireEvent.click(signUpButton);
      });
      expect(signUpEmailError).toBeInTheDocument();
      expect(signUpEmailError.innerHTML).toEqual(
        "email must be an incubyte email"
      );
    });
  });
  describe("Sign Up Password", () => {
    test("Password is present", () => {
      render(
        <BrowserRouter>
          <SignUpForm handleFormSubmit={handleFormSubmit} />
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
          <SignUpForm handleFormSubmit={handleFormSubmit} />
        </BrowserRouter>
      );

      const signUpButton = screen.getByTestId(
        "signupButton"
      ) as HTMLButtonElement;

      const signUpPasswordError = screen.getByTestId(
        "signupPasswordError"
      ) as HTMLDivElement;

      await act(() => {
        fireEvent.click(signUpButton);
      });

      expect(signUpPasswordError).toBeInTheDocument();
      expect(signUpPasswordError.innerHTML).toEqual("password is required");
    });

    test("signup password is not valid", async () => {
      render(
        <BrowserRouter>
          <SignUpForm handleFormSubmit={handleFormSubmit} />
        </BrowserRouter>
      );

      const signUpButton = screen.getByTestId(
        "signupButton"
      ) as HTMLButtonElement;

      const SignUpPassword = screen.getByTestId(
        "signupPassword"
      ) as HTMLInputElement;

      const signUpPasswordError = screen.getByTestId(
        "signupPasswordError"
      ) as HTMLDivElement;

      await act(() => {
        fireEvent.change(SignUpPassword, { target: { value: "john" } });
        fireEvent.click(signUpButton);
      });

      expect(signUpPasswordError).toBeInTheDocument();
      expect(signUpPasswordError.innerHTML).toEqual("password is not valid");
    });
  });

  describe("Sign Up ConfirmPassword", () => {
    test("ConfirmPassword is present", () => {
      render(
        <BrowserRouter>
          <SignUpForm handleFormSubmit={handleFormSubmit} />
        </BrowserRouter>
      );

      const signUpConfirmPassword = screen.getByTestId(
        "signupConfirmPassword"
      ) as HTMLInputElement;
      expect(signUpConfirmPassword).toBeInTheDocument();
    });

    test("signup confirmpassword must match with password", async () => {
      render(
        <BrowserRouter>
          <SignUpForm handleFormSubmit={handleFormSubmit} />
        </BrowserRouter>
      );

      const signUpButton = screen.getByTestId(
        "signupButton"
      ) as HTMLButtonElement;

      const SignUpPassword = screen.getByTestId(
        "signupPassword"
      ) as HTMLInputElement;

      const SignUpConfirmPassword = screen.getByTestId(
        "signupConfirmPassword"
      ) as HTMLInputElement;

      const signUpConfirmPasswordError = screen.getByTestId(
        "signupConfirmPasswordError"
      ) as HTMLDivElement;

      await act(() => {
        fireEvent.change(SignUpPassword, {
          target: { value: "John@123" },
        });
        fireEvent.change(SignUpConfirmPassword, {
          target: { value: "John@122" },
        });
        fireEvent.click(signUpButton);
      });

      expect(signUpConfirmPasswordError).toBeInTheDocument();
      expect(signUpConfirmPasswordError.innerHTML).toEqual(
        "Confirm Password must match with Password"
      );
    });
  });

  describe("Sign Up Account Already exist", () => {
    test("signin Account Already Link is  present", () => {
      render(
        <BrowserRouter>
          <SignUpForm handleFormSubmit={handleFormSubmit} />
        </BrowserRouter>
      );

      const signUpAccountAlreadyExistsLink = screen.getByTestId(
        "signupAccountAlreadyExistsLink"
      ) as HTMLInputElement;
      expect(signUpAccountAlreadyExistsLink).toBeInTheDocument();
    });
  });

  describe("SignUp Button", () => {
    test("signup button is present", () => {
      render(
        <BrowserRouter>
          <SignUpForm handleFormSubmit={handleFormSubmit} />
        </BrowserRouter>
      );

      const signUpButton = screen.getByTestId("signupButton");

      expect(signUpButton).toBeInTheDocument();
    });

    test("signup button Text is 'Sign up'", () => {
      render(
        <BrowserRouter>
          <SignUpForm handleFormSubmit={handleFormSubmit} />
        </BrowserRouter>
      );

      const signUpButton = screen.getByTestId("signupButton");

      expect(signUpButton).toHaveTextContent("Sign Up");
    });

    test("sign up handle submit  clicked when signup success", async () => {
      const handleFormSubmit = jest.fn();
      render(
        <BrowserRouter>
          <SignUpForm handleFormSubmit={handleFormSubmit} />
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

      act(() => {
        fireEvent.change(signUpEmail, {
          target: { value: "john@incubyte.co" },
        });
      });

      await act(() => {
        fireEvent.change(signUpPassword, { target: { value: "John@123" } });
      });
      await act(() => {
        fireEvent.change(signUpConfirmPassword, {
          target: { value: "John@123" },
        });
      });
      await act(() => {
        fireEvent.click(signUpButton);
      });
      expect(handleFormSubmit).toBeCalledTimes(1);
    });
  });
});
