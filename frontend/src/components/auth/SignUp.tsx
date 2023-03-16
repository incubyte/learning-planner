import { useForm } from "react-hook-form";
import signupImage from "../../assets/signup-page.png";
import "../../css/auth/SignUp.css";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <div className="SignUpContainer">
        <div className="Leftside">
          <img className="Image" src={signupImage}></img>
        </div>

        <div className="Rightside">
          <div className="RightContent">
            <div className="text-3xl mb-5">Sign Up</div>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <label className="FormItems">
                <input
                  type="text"
                  id="email"
                  placeholder="Email"
                  className="FormInput"
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
                {errors.email ? <>{errors.email.message}</> : <></>}

                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  className="FormInput"
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

                {errors.password ? <>{errors.password.message}</> : <></>}

                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  className="FormInput"
                  {...register("confirmPassword", {
                    required: {
                      value: true,
                      message: "Confirm password is required",
                    },
                    pattern: {
                      value:
                        /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,20})/,
                      message: "Confirm password is not valid",
                    },
                    validate: {
                      confirmEqual: (value) =>
                        value === getValues("password") ||
                        " Confirm Password must match with Password",
                    },
                  })}
                />

                {errors.confirmPassword ? (
                  <>{errors.confirmPassword.message}</>
                ) : (
                  <></>
                )}

                <button className="Submit">Sign Up</button>

                <label className="AlreadyAccount">
                  Already have an account?{" "}
                  <a className="SignIn" href="/auth/signin">
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
