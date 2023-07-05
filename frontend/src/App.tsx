import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import Footer from "./components/utilities/Footer";
import LoadingScreen from "./components/utilities/LoadingScreen";
function App() {
  const [page, setPage] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { instance } = useMsal();

  const handleSignIn = async () => {
    const tokenResponse = await instance.handleRedirectPromise();
    const accounts = instance.getAllAccounts();
    console.log(tokenResponse?.accessToken);
    localStorage.setItem("authToken", tokenResponse?.accessToken || "not");
    if (accounts.length === 0) {
      instance.loginRedirect({
        scopes: ["user.read"],
      });
    }
  };

  const isAuthenticated = useIsAuthenticated();
  const handleSignOut = async () => {
    await instance.logoutRedirect({});
  };
  const fetchPage = async () => {
    if (!isAuthenticated) {
      handleSignIn();
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
  ) : (
    <div className="App" data-testid="App">
      <button onClick={handleSignIn}>Sign In</button>
      <button onClick={handleSignOut}>Sign Out</button>

      <Outlet></Outlet>
      <Footer />
    </div>
  );
}

export default App;
