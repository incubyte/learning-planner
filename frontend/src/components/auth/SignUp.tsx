import "../../css/auth/SignUp.css";
const SignUp = () => {
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
            <div className="text-3xl mb-5">Sign Up</div>

            <form>
              <label className="FormItems">
                <input type="text" placeholder="Email" className="FormInput" />

                <input
                  type="password"
                  placeholder="Password"
                  className="FormInput"
                />

                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="FormInput"
                />

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
