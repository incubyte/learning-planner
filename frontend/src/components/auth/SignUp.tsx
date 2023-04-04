import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "tippy.js/dist/tippy.css";
import "../../css/auth/SignUp.css";
import SignUpForm from "../utilities/SignUpForm";

const SignUp = () => {
  const navigator = useNavigate();

  const handleFormSubmit = async (data: any) => {
    // toast("Hurray! Account created 🥳🥳", {
    //   autoClose: 2500,
    //   closeButton: false,
    // });
    console.log("outside fetch");

    // const response = await fetch(
    //   "https://backend-mu-plum.vercel.app/auth/signup",
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ email: data.email, password: data.password }),
    //   }
    // );

    // if (response.ok) {
    //   console.log("success  !!");
    //   toast("Hurray! Account created 🥳🥳", {
    //     autoClose: 2500,
    //     closeButton: false,
    //   });
    //   console.log("success!!");
    //   setTimeout(() => {
    //     navigator("/auth/signin");
    //   }, 3000);
    // } else {
    //   console.log("fail!!");
    //   const jsonResponse = await response.json();
    //   toast.error(jsonResponse.message, {
    //     autoClose: 2500,
    //     closeButton: false,
    //   });
    // }

    const response = await fetch(
      "https://backend-mu-plum.vercel.app/auth/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email, password: data.password }),
      }
    )
      .then(async (response) => {
        if (response.ok) {
          console.log("success  !!");
          toast("Hurray! Account created 🥳🥳", {
            autoClose: 2500,
            closeButton: false,
          });
          console.log("success!!");
          setTimeout(() => {
            navigator("/auth/signin");
          }, 3000);
        } else {
          console.log("fail!!");
          const jsonResponse = await response.json();
          toast.error(jsonResponse.message, {
            autoClose: 2500,
            closeButton: false,
          });
        }
      })
      .catch((error) => {
        console.log("fail!!");
        // const jsonResponse = await response.json();
        toast.error(error.message, {
          autoClose: 2500,
          closeButton: false,
        });
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
