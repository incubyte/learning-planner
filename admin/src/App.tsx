import { InteractionType, RedirectRequest } from "@azure/msal-browser";
import {
  AuthenticatedTemplate,
  useMsal,
  useMsalAuthentication,
} from "@azure/msal-react";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./App.css";
import Footer from "./components/utilities/Footer";
import LoadingScreen from "./components/utilities/LoadingScreen";

function App() {
  const [page, setPage] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSignInCompleted, setIsSignInCompleted] = useState(false);
  const navigator = useNavigate();
  const { inProgress } = useMsal();

  const makeJWTRequest = async (result: any) => {
    try {
      const response = await fetch(
        "https://backend-mu-plum.vercel.app/auth/admin/signin",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${result.accessToken}`,
          },
        }
      );
      if (response.ok) {
        const authToken = await response.text();
        await localStorage.setItem("authToken", authToken);
        setIsSignInCompleted(true);
      } else {
        navigator("/auth/error");
      }
    } catch (error) {
      toast.error("An error occurred during login" + error, {
        autoClose: 2500,
        closeButton: false,
      });
    }
  };
  const loginRequest: RedirectRequest = {
    scopes: ["User.Read"],
  };
  const { login, result, error } = useMsalAuthentication(
    InteractionType.Redirect,
    loginRequest
  );

  if (result) {
    makeJWTRequest(result);
  } else {
    //cmnt
  }

  const fetchPage = async () => {
    if (inProgress === "none") {
      const accessToken = localStorage.getItem("authToken");
      const response = await fetch("https://backend-mu-plum.vercel.app/roles", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.ok) {
        setIsSignInCompleted(true);
      } else if (response.status === 403) {
        navigator("/auth/error");
      }
    }
  };
  const fetchData = async () => {
    setIsLoading(true);

    await Promise.all([fetchPage()]);

    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, [page, isSignInCompleted]);
  return isLoading ? (
    <LoadingScreen />
  ) : (
    <>
      <AuthenticatedTemplate>
        <>
          <div className="App font-nunito" data-testid="App">
            <Outlet></Outlet>
          </div>
          <div className="mt-7">
            <Footer></Footer>
          </div>
        </>
      </AuthenticatedTemplate>
    </>
  );
}

export default App;
