import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "tippy.js/dist/tippy.css";
import "../../css/auth/SignIn.css";
import SignInForm from "../utilities/SignInForm";

const SignIn = () => {
  const navigator = useNavigate();

  const handleFormSubmit = async (data: any) => {
    const response = await fetch("http://localhost:5000/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: data.email, password: data.password }),
    });

    if (response.ok) {
      const authToken = await response.text();
      localStorage.setItem("authToken", authToken);
      navigator("/");
    } else {
      const jsonResponse = await response.json();
      toast.error(jsonResponse.message, {
        autoClose: 2500,
        closeButton: false,
      });
    }
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
