import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "tippy.js/dist/tippy.css";
import "../css/auth/SignUp.css";
import Input from "./utilities/Input";
import EmailIcon from "./utilities/icons/Email";

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
    const response = await fetch(
      "https://backend-mu-plum.vercel.app/auth/admin/forgotPassword",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email }),
      }
    );

    if (response.ok) {
      toast.success("email sent", {
        autoClose: 2500,
        closeButton: false,
      });
    } else {
      const jsonResponse = await response.json();
      toast.error(jsonResponse.message, {
        autoClose: 2500,
        closeButton: false,
      });
    }
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
  return (
    <div className="flex justify-center items-center bg-slate-100 h-screen">
      <div className="rounded overflow-hidden shadow-lg max-w-fit max-h-fit bg-white p-10 flex flex-col items-center">
        <img
          className="h-28 w-28"
          src="https://res.cloudinary.com/dxepcudkt/image/upload/v1685686631/change-password_zsunue.svg"
        ></img>
        <p className="text-3xl font-bold font-sans text-sky-900 m-5">
          Forget Password
        </p>
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
