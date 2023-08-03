import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import "./App.css";
import Footer from "./components/utilities/Footer";
import LoadingScreen from "./components/utilities/LoadingScreen";
function App() {
  const [page, setPage] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSignInCompleted, setIsSignInCompleted] = useState(false);
  const { instance } = useMsal();

  const handleSignIn = async () => {
    const tokenResponse = await instance.handleRedirectPromise();
    const accounts = instance.getAllAccounts();
    if (accounts.length === 0) {
      instance.loginRedirect({
        scopes: ["user.read"],
      });
    }
    try {
      const response = await fetch(
        "https://backend-mu-plum.vercel.app/auth/signin",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${tokenResponse?.accessToken}`,
          },
        }
      );
      if (response.ok) {
        const authToken = await response.text();
        await localStorage.setItem("authToken", authToken);
        setIsSignInCompleted(true);
      }
    } catch (error) {
      toast.error("An error occurred during login" + error, {
        autoClose: 2500,
        closeButton: false,
      });
    }
  };

  const isAuthenticated = useIsAuthenticated();
  
  const fetchPage = async () => {
    if (!isAuthenticated) {
      handleSignIn();
    } else {
      const accessToken = localStorage.getItem("authToken");
      const response = await fetch("https://backend-mu-plum.vercel.app/user/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.ok) {
        setIsSignInCompleted(true);
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
  }, page);
  return isLoading ? (
    <LoadingScreen />
  ) : isSignInCompleted ? (
    <>
      <div className="App" data-testid="App">
        <Outlet></Outlet>
      </div>
      <Footer />
    </>
  ) : null;
}

export default App;
