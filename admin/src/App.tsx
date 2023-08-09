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
  const { instance, inProgress } = useMsal();
  const navigator = useNavigate();

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

  const handleSignOut = async () => {
    await localStorage.removeItem("authToken");
    const accounts = instance.getAllAccounts();
    if (accounts.length !== 0) {
      await instance.logoutRedirect({});
    }
  };
  const fetchPage = async () => {
    const accessToken = localStorage.getItem("authToken");
    const response = await fetch("https://backend-mu-plum.vercel.app/roles", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.ok) {
      setIsSignInCompleted(true);
    } else {
      navigator("/auth/error");
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
          <div className="App" data-testid="App">
            <button onClick={handleSignOut}>Sign Out</button>
            <Outlet></Outlet>
            <Footer></Footer>
          </div>
        </>
      </AuthenticatedTemplate>
    </>
  );
}

export default App;
