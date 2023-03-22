import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../css/auth/SignUp.css";
import EmailIcon from "../icons/Email";
import PasswordIcon from "../icons/Password";
import PasswordHideIcon from "../icons/PasswordHide";
import PasswordShowIcon from "../icons/PasswordShow";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const [passwordShow, setPasswordShow] = useState<boolean>(false);
  const navigator = useNavigate();
  const [confirmPasswordShow, setConfirmPasswordShow] =
    useState<boolean>(false);

  const handleFormSubmit = (data: any) => {
    console.log(data);
    toast("Hurrey! Account created 🥳🥳");
    setTimeout(() => {
      navigator("/auth/signin");
    }, 6000);
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
            <div
              className="text-5xl lg:text-4xl md:text-7xl xsm:text-4xl mb-5"
              data-testid="signupHeader"
            >
              Sign Up
            </div>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <label className="SignUpFormItems">
                <div className="space-y-2 text-gray-700">
                  <div className="relative focus-within:text-gray-900 dark:focus-within:text-gray-800 ">
                    <EmailIcon />
                    <input
                      type="text"
                      id="email"
                      placeholder="email"
                      data-testid="signupEmail"
                      className="SignUpFormInput"
                      {...register("email", {
                        required: {
                          value: true,
                          message: "email is required",
                        },
                        pattern: {
                          value: /^\S+@\incubyte.co$/i,
                          message: "email is not valid",
                        },
                      })}
                    />
                  </div>
                </div>

                <div
                  data-testid="signupEmailError"
                  id="signupEmailError"
                  className="text-red-600 font-bold  md:text-2xl lg:text-base"
                >
                  {errors.email ? <>{errors.email.message}</> : <></>}
                </div>

                <div className="space-y-2 text-gray-700">
                  <div className="relative  focus-within:text-gray-900 dark:focus-within:text-gray-800 ">
                    <PasswordIcon />
                    <input
                      className="SignUpFormInput"
                      id="password"
                      data-testid="signupPassword"
                      type={passwordShow ? "text" : "password"}
                      placeholder="password"
                      {...register("password", {
                        required: {
                          value: true,
                          message: "password is required",
                        },
                        pattern: {
                          value:
                            /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,20})/,
                          message: "password is not valid",
                        },
                      })}
                    />

                    <div className="absolute right-0 z-30 inset-y-1 flex items-center px-4 ">
                      <button
                        data-testid="signupPasswordButton"
                        type="button"
                        onClick={() => {
                          setPasswordShow(!passwordShow);
                        }}
                        className="z-30 "
                      >
                        {passwordShow ? (
                          <PasswordShowIcon />
                        ) : (
                          <PasswordHideIcon />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="text-red-600 font-bold md:text-2xl lg:text-base">
                  {errors.password ? <>{errors.password.message}</> : <></>}
                </div>

                <div className="space-y-2 text-gray-700">
                  <div className="relative focus-within:text-gray-900 dark:focus-within:text-gray-800 ">
                    <PasswordIcon />
                    <input
                      className="SignUpFormInput"
                      id="password"
                      data-testid="signupConfirmPassword"
                      type={confirmPasswordShow ? "text" : "password"}
                      placeholder="confirm password"
                      {...register("confirmpassword", {
                        required: {
                          value: true,
                          message: "confirm password is required",
                        },
                        pattern: {
                          value:
                            /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,20})/,
                          message: "confirm password is not valid",
                        },
                        validate: {
                          confirmPasswordEqual: (value) =>
                            value === getValues().password ||
                            "Confirm Password must match with Password",
                        },
                      })}
                    />

                    <div className="absolute right-0 z-30 inset-y-1 flex items-center px-4 ">
                      <button
                        type="button"
                        data-testid="signupConfirmPasswordButton"
                        onClick={() => {
                          setConfirmPasswordShow(!confirmPasswordShow);
                        }}
                        className="z-30"
                      >
                        {confirmPasswordShow ? (
                          <PasswordShowIcon />
                        ) : (
                          <PasswordHideIcon />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-red-600 font-bold md:text-2xl lg:text-base">
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
                <ToastContainer />

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
