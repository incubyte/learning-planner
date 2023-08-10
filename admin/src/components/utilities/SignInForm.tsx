import Tippy from "@tippyjs/react";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import "../../css/auth/SignIn.css";
import Input from "./Input";
import EmailIcon from "./icons/Email";
import PasswordIcon from "./icons/Password";

interface signInFormProps {
  handleFormSubmit: any;
  dataTestId?: string;
}
const SignInForm = (props: signInFormProps) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const emailValidation = {
    ...register("email", {
      required: {
        value: true,
        message: "email is required",
      },
      pattern: {
        value: /^\S+@\incubyte.co$/i,
        message: "email must be with incubyte domain",
      },
    }),
  };

  const passwordValidation = {
    ...register("password", {
      required: {
        value: true,
        message: "password is required",
      },
      pattern: {
        value: /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,20})/,
        message: "password is not valid",
      },
    }),
  };
  const accountText = "Don't have an account? ";
  return (
    <form
      data-testid={props.dataTestId}
      onSubmit={handleSubmit(props.handleFormSubmit)}
    >
      <label className="SignInFormItems">
        <Input
          icon={EmailIcon}
          dataTestId="signinEmail"
          placeholder="email"
          Id="email"
          type="text"
          showPasswordButton={false}
          validation={emailValidation}
        />

        <div data-testid="signinEmailError" className="SignInErrors">
          {errors.email ? <>{errors.email.message}</> : <></>}
        </div>

        <Input
          icon={PasswordIcon}
          dataTestId="signinPassword"
          placeholder="password"
          Id="password"
          showPasswordButton={true}
          validation={passwordValidation}
        />
        <Tippy content="password must contain 1 uppercase, 1 lowercase, 1 special character and 1 number">
          <div data-testid="signinPasswordError" className="SignInErrors">
            {errors.password ? <>{errors.password.message}</> : <></>}
          </div>
        </Tippy>

        <a
          href="/auth/forgot_password"
          data-testid="signinForgotPasswordLink"
          className="ForgotPass"
        >
          Forgot password?
        </a>
        <button data-testid="signinButton" className="SignInSubmit">
          Sign In
        </button>

        <div data-testid="signinToast">
          <ToastContainer />
        </div>
      </label>
    </form>
  );
};

export default SignInForm;
