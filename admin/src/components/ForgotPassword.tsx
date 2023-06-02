import Tippy from "@tippyjs/react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import Input from "./utilities/Input";
import PasswordIcon from "./utilities/icons/Password";
import { useNavigate } from "react-router-dom";
import "../css/auth/SignUp.css";
import "tippy.js/dist/tippy.css";

const ForgotPassword = () => {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigator = useNavigate();

  const handleFormSubmit = async (data: any) => {
    console.log(data);
    //   const response = await fetch(
    //     "https://backend-mu-plum.vercel.app/auth/signup",
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({ email: data.email, password: data.password }),
    //     }
    //   );

    //   if (response.ok) {
    //     toast("Hurray! Account created 🥳🥳", {
    //       autoClose: 2500,
    //       closeButton: false,
    //     });
    //     setTimeout(() => {
    //       navigator("/auth/signin");
    //     }, 3000);
    //   } else {
    //     const jsonResponse = await response.json();
    //     toast.error(jsonResponse.message, {
    //       autoClose: 2500,
    //       closeButton: false,
    //     });
    //   }
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
  return (
    <div className="flex justify-center items-center bg-slate-100 h-screen">
      <div className="rounded overflow-hidden shadow-lg max-w-fit max-h-fit bg-white p-10 flex flex-col items-center">
        <img
          className="h-28 w-28"
          src="https://res.cloudinary.com/dxepcudkt/image/upload/v1685686631/change-password_zsunue.svg"
        ></img>
        <p className="text-3xl font-bold font-sans text-sky-900 m-5">
          Reset Password
        </p>
        <label className="SignUpFormItems">
          <Input
            icon={PasswordIcon}
            dataTestId="signupPassword"
            placeholder="password"
            Id="password"
            showPasswordButton={true}
            validation={passwordValidation}
          />

          <Tippy content="password must contain 1 uppercase, 1 lowercase, 1 special character and 1 number">
            <div data-testid="signupPasswordError" className="SignUpErrors">
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
            onClick={handleSubmit(handleFormSubmit)}
            data-testid="signupButton"
          >
            Submit
          </button>

          <div data-testid="signupToast">
            <ToastContainer />
          </div>
        </label>
      </div>
    </div>
  );
};

export default ForgotPassword;
