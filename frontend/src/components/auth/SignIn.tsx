import { useForm } from "react-hook-form";
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
        message: "email is not valid",
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
                <Input
                  icon={EmailIcon}
                  dataTestId="signinEmail"
                  placeholder="email"
                  Id="email"
                  type="text"
                  showPasswordButton={false}
                  validation={emailValidation}
                />

                <div
                  data-testid="signinEmailError"
                  className="text-red-600 font-bold md:text-2xl lg:text-base"
                >
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
                <div
                  data-testid="signinPasswordError"
                  className="text-red-600 font-bold md:text-2xl lg:text-base"
                >
                  {errors.password ? <>{errors.password.message}</> : <></>}
                </div>

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
