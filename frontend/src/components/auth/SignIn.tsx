import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "tippy.js/dist/tippy.css";
import "../../css/auth/SignIn.css";
import SignInForm from "../utilities/SignInForm";

const SignIn = () => {
  const navigator = useNavigate();

  const handleFormSubmit = async (data: any) => {
    await axios
      .post("http://localhost:5000/auth/signin", {
        email: data.email,
        password: data.password,
      })
      .then((response) => {
        localStorage.setItem("authToken", response.data);
        navigator("/");
      })
      .catch((error) => {
        toast.error(error.response.data.message, { autoClose: 2500 });
      });
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
            <div data-testid="signinHeader" className="SignInHeader">
              Login
            </div>
            <SignInForm
              dataTestId="signinForm"
              handleFormSubmit={handleFormSubmit}
            ></SignInForm>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
