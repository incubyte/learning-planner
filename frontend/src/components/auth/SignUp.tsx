import Tippy from "@tippyjs/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "tippy.js/dist/tippy.css";
import "../../css/auth/SignUp.css";
import EmailIcon from "../utilities/icons/Email";
import PasswordIcon from "../utilities/icons/Password";
import Input from "../utilities/Input";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const navigator = useNavigate();
  const handleFormSubmit = (data: any) => {
    console.log(data);
    toast("Hurrey! Account created 🥳🥳", {
      autoClose: 2500,
      closeButton: false,
    });

    setTimeout(() => {
      navigator("/auth/signin");
    }, 3000);
  };

  const emailValidation = {
    ...register("email", {
      required: {
        value: true,
        message: "email is required",
      },
      pattern: {
        value: /^\S+@\incubyte.co$/i,
        message: "email must be an incubyte email",
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

  const confirmPasswordValidation = {
    ...register("confirmpassword", {
      validate: {
        confirmPasswordEqual: (value) =>
          value === getValues().password ||
          "Confirm Password must match with Password",
      },
    }),
  };
  const accountText = "Already have an account? ";
  return (
    <>
      <div className="SignUpContainer">
        <div className="SignUpLeftside">
          <img
            className="SignUpImage"
            src="https://wallpapercave.com/wp/wp6480749.jpg"
          ></img>
        </div>

        <div className="SignUpRightside">
          <div className="SignUpRightContent">
            <div className="SignUpHeader" data-testid="signupHeader">
              Sign Up
            </div>

            <form onSubmit={handleSubmit(handleFormSubmit)} data-testid="form">
              <label className="SignUpFormItems">
                <Input
                  icon={EmailIcon}
                  dataTestId="signupEmail"
                  placeholder="email"
                  Id="email"
                  type="text"
                  showPasswordButton={false}
                  validation={emailValidation}
                />

                <div
                  data-testid="signupEmailError"
                  id="signupEmailError"
                  className="SignUpErrors"
                >
                  {errors.email ? <>{errors.email.message}</> : <></>}
                </div>

                <Input
                  icon={PasswordIcon}
                  dataTestId="signupPassword"
                  placeholder="password"
                  Id="password"
                  showPasswordButton={true}
                  validation={passwordValidation}
                />

                <Tippy content="password must contain 1 uppercase, 1 lowercase, 1 special character and 1 number">
                  <div
                    data-testid="signupPasswordError"
                    className="SignUpErrors"
                  >
                    {errors.password ? <>{errors.password.message}</> : <></>}
                  </div>
                </Tippy>

                <Input
                  icon={PasswordIcon}
                  dataTestId="signupConfirmPassword"
                  placeholder="confirm password"
                  Id="confirmpassword"
                  showPasswordButton={true}
                  validation={confirmPasswordValidation}
                />
                <div
                  data-testid="signupConfirmPasswordError"
                  className="SignUpErrors"
                >
                  {errors.confirmpassword ? (
                    <>{errors.confirmpassword.message}</>
                  ) : (
                    <></>
                  )}
                </div>

                <button
                  className="SignUpSubmit"
                  data-testid="signupButton"
                  onClick={handleSubmit(handleFormSubmit)}
                >
                  Sign Up
                </button>

                <div data-testid="signupToast">
                  <ToastContainer />
                </div>

                <label className="SignUpAlreadyAccount">
                  {accountText}
                  <a
                    className="SignInLink"
                    data-testid="signupAccountAlreadyExistsLink"
                    href="/auth/signin"
                  >
                    Sign In
                  </a>
                </label>
              </label>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
