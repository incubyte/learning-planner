import "../../css/auth/SignIn.css";

const SignIn = () => {
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

            <form>
              <label className="FormItems">
                <input type="text" placeholder="Email" className="FormInput" />

                <input
                  type="password"
                  placeholder="Password"
                  className="FormInput"
                />

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
