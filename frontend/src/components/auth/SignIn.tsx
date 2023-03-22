import { useState } from "react";
import { useForm } from "react-hook-form";
import "../../css/auth/SignIn.css";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const [passwordShow, setPasswordShow] = useState<boolean>(false);

  const accountText = "Don't have an account? ";

  const handleFormSubmit = (data: any) => {
    console.log(data);
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
            <div
              data-testid="signinHeader"
              className="text-5xl lg:text-4xl md:text-7xl xsm:text-4xl mb-5"
            >
              Login
            </div>

            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <label className="SignInFormItems">
                <div className="space-y-2 text-gray-700">
                  <div className="relative focus-within:text-gray-900 dark:focus-within:text-gray-800 ">
                    <div
                      aria-hidden="true"
                      className="absolute inset-y-0 flex items-center px-4 pointer-events-none"
                    >
                      <svg
                        className="h-5 w-5 md:h-8 md:w-8 lg:h-5 lg:w-5 sm:h-5 sm:w-5 xsm:h-5 xsm:w-5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="email"
                      data-testid="signinEmail"
                      placeholder="email"
                      className="SignInFormInput"
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

                <div className="text-red-600 font-bold md:text-2xl lg:text-base">
                  {errors.email ? <>{errors.email.message}</> : <></>}
                </div>

                <div className="space-y-2 text-gray-700">
                  <div className="relative  focus-within:text-gray-900 dark:focus-within:text-gray-800 ">
                    <div
                      aria-hidden="true"
                      className="absolute inset-y-0 flex items-center px-4 pointer-events-none"
                    >
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 md:h-8 md:w-8 lg:h-5 lg:w-5 sm:h-5 sm:w-5 xsm:h-5 xsm:w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        ></path>
                      </svg>
                    </div>
                    <input
                      className="SignInFormInput"
                      id="password"
                      data-testid="signinPassword"
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
                        type="button"
                        data-testid="signinPasswordButton"
                        onClick={() => {
                          setPasswordShow(!passwordShow);
                        }}
                        className="z-30 "
                      >
                        {passwordShow ? (
                          <svg
                            aria-hidden="true"
                            className="w-5 h-5 md:h-8 md:w-8 lg:h-5 lg:w-5 sm:h-5 sm:w-5 xsm:h-5 xsm:w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                            ></path>
                          </svg>
                        ) : (
                          <svg
                            aria-hidden="true"
                            className="w-5 h-5 md:h-8 md:w-8 lg:h-5 lg:w-5 sm:h-5 sm:w-5 xsm:h-5 xsm:w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            ></path>
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            ></path>
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="text-red-600 font-bold md:text-2xl lg:text-base">
                  {errors.password ? <>{errors.password.message}</> : <></>}
                </div>

                <a href="" className="ForgotPass">
                  forgot password?
                </a>
                <button className="SignInSubmit">Sign In</button>

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
