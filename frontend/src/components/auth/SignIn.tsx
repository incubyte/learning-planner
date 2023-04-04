import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "tippy.js/dist/tippy.css";
import "../../css/auth/SignIn.css";
import SignInForm from "../utilities/SignInForm";

const SignIn = () => {
  const navigator = useNavigate();

  const handleFormSubmit = async (data: any) => {
    const response = await fetch(
      "https://backend-mu-plum.vercel.app/auth/signin",
      {
        method: "POST",
        // mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email, password: data.password }),
      }
    )
      .then(async (response) => {
        if (response.ok) {
          const authToken = await response.text();
          localStorage.setItem("authToken", authToken);
          navigator("/");
        } else {
          console.log(response);
          const jsonResponse = await response.json();
          toast.error(jsonResponse.message, {
            autoClose: 2500,
            closeButton: false,
          });
        }
      })
      .catch((error) => {
        toast.error(error.message, {
          autoClose: 2500,
          closeButton: false,
        });
      });
    // console.log(response);
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
