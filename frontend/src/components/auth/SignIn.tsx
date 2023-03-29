import Tippy from "@tippyjs/react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "tippy.js/dist/tippy.css";
import "../../css/auth/SignIn.css";
import EmailIcon from "../utilities/icons/Email";
import PasswordIcon from "../utilities/icons/Password";
import Input from "../utilities/Input";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const accountText = "Don't have an account? ";

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

  const navigator = useNavigate();

  const handleFormSubmit = async (data: any) => {
    await axios
      .post("http://localhost:5000/auth/signin", {
        email: data.email,
        password: data.password,
      })
      .then((response) => {
        localStorage.setItem("authToken", response.data);
        navigator("/");
      })
      .catch((error) => {
        toast.error(error.response.data.message, { autoClose: 2500 });
      });
  };

  return (
    <>
      <div className="SignInContainer">
        <div className="SignInLeftside">
          <img
            className="SignInImage"
            src="https://wallpapercave.com/wp/wp6480749.jpg"
          ></img>
        </div>

        <div className="SignInRightside">
          <div className="SignInRightContent">
            <div data-testid="signinHeader" className="SignInHeader">
              Login
            </div>

            <form onSubmit={handleSubmit(handleFormSubmit)}>
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

                <div data-testid="signinEmailError" className="SignInErors">
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
                  <div
                    data-testid="signinPasswordError"
                    className="SignInErors"
                  >
                    {errors.password ? <>{errors.password.message}</> : <></>}
                  </div>
                </Tippy>

                <a
                  href=""
                  data-testid="signinForgotPasswordLink"
                  className="ForgotPass"
                >
                  forgot password?
                </a>
                <button data-testid="signinButton" className="SignInSubmit">
                  Sign In
                </button>

                <div data-testid="signinToast">
                  <ToastContainer />
                </div>

                <label className="SignInNewAcc">
                  {accountText}
                  <a
                    className="SignUplink"
                    data-testid="signinDontHaveAccountLink"
                    href="/auth/signup"
                  >
                    Sign Up
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

export default SignIn;
