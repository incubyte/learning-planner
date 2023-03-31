import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "tippy.js/dist/tippy.css";
import "../../css/auth/SignUp.css";
import SignUpForm from "../utilities/SignUpForm";

const SignUp = () => {
  const navigator = useNavigate();

  const handleFormSubmit = async (data: any) => {
    await axios
      .post("http://localhost:5000/auth/signup", {
        email: data.email,
        password: data.password,
      })
      .then((response) => {
        console.log(response);
        toast("Hurray! Account created 🥳🥳", {
          autoClose: 2500,
          closeButton: false,
        });
        setTimeout(() => {
          navigator("/auth/signin");
        }, 3000);
      })
      .catch((error) => {
        console.log(error);

        toast.error(error.response.data.message, { autoClose: 2500 });
      });
  };

  return (
    <>
      <div className="SignUpContainer">
        <div className="SignUpLeftside">
          <img
            className="SignUpImage"
            src="https://wallpapercave.com/wp/wp6480749.jpg"
          ></img>
        </div>

        <div className="SignUpRightside">
          <div className="SignUpRightContent">
            <div className="SignUpHeader" data-testid="signupHeader">
              Sign Up
            </div>
            <SignUpForm
              dataTestId="signupForm"
              handleFormSubmit={handleFormSubmit}
            ></SignUpForm>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
