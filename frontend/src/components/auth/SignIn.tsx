import { useForm } from "react-hook-form";
import "../../css/auth/SignIn.css";

const SignIn = () => {
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
          <img
            className="Image"
            src="https://wallpapercave.com/wp/wp6480749.jpg"
          ></img>
        </div>

        <div className="Rightside">
          <div className="RightContent">
            <div className="text-3xl mb-5">Login</div>

            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <label className="FormItems">
                <input
                  type="text"
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

                <button className="Submit">Sign In</button>

                <label className="AlreadyAccount">
                  Do not have an account?{" "}
                  <a className="SignIn" href="/auth/signup">
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
