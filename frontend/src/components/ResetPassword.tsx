import Tippy from "@tippyjs/react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "tippy.js/dist/tippy.css";
import "../css/auth/PasswordFiles.css";
import Input from "./utilities/Input";
import PasswordIcon from "./utilities/icons/Password";

const ResetPassword = () => {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const urlParams = useParams();

  const navigator = useNavigate();

  const handleFormSubmit = async (data: any) => {
    try {
      const response = await fetch(
        "https://backend-mu-plum.vercel.app/auth/resetPassword/" +
          urlParams.token,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password: data.password }),
        }
      );

      if (response.ok) {
        toast.success("Password Changed", {
          autoClose: 2500,
          closeButton: false,
        });
        setTimeout(() => {
          navigator("/auth/sign_in");
        }, 3000);
      } else {
        const jsonResponse = await response.json();
        toast.error(jsonResponse.message, {
          autoClose: 2500,
          closeButton: false,
        });
      }
    } catch (error) {
      toast.error("An error occurred" + error, {
        autoClose: 2500,
        closeButton: false,
      });
    }
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
    <div className="PasswordForm">
      <div className="PasswordFormContainer">
        <img
          data-testid="resetImage"
          className="h-28 w-28"
          src="https://res.cloudinary.com/dxepcudkt/image/upload/v1685686631/change-password_zsunue.svg"
        ></img>
        <p data-testid="resetHeader" className="PasswordFormHeader">
          Reset password
        </p>
        <label data-testid="resetForm" className="PasswordFormItems">
          <Input
            icon={PasswordIcon}
            dataTestId="resetPassword"
            placeholder="password"
            Id="password"
            showPasswordButton={true}
            validation={passwordValidation}
          />

          <Tippy content="password must contain 1 uppercase, 1 lowercase, 1 special character and 1 number">
            <div
              data-testid="resetPasswordError"
              className="PasswordFormErrors"
            >
              {errors.password ? <>{errors.password.message}</> : <></>}
            </div>
          </Tippy>

          <Input
            icon={PasswordIcon}
            dataTestId="resetConfirmPassword"
            placeholder="confirm password"
            Id="confirmpassword"
            showPasswordButton={true}
            validation={confirmPasswordValidation}
          />
          <div
            data-testid="resetConfirmPasswordError"
            className="PasswordFormErrors"
          >
            {errors.confirmpassword ? (
              <>{errors.confirmpassword.message}</>
            ) : (
              <></>
            )}
          </div>

          <button
            className="PasswordFormSubmit"
            onClick={handleSubmit(handleFormSubmit)}
            data-testid="resetButton"
          >
            Submit
          </button>

          <div data-testid="resetToast">
            <ToastContainer />
          </div>
        </label>
      </div>
    </div>
  );
};

export default ResetPassword;
