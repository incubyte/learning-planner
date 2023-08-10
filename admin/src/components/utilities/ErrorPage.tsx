import { useMsal } from "@azure/msal-react";
import { useNavigate } from "react-router-dom";
const ErrorPage = () => {
  const { instance, inProgress } = useMsal();
  const navigator = useNavigate();
  const handleSignOut = async () => {
    await localStorage.removeItem("authToken");
    const accounts = instance.getAllAccounts();
    if (accounts.length !== 0) {
      await instance.logoutRedirect();
    }
  };

  return (
    <>
      <button onClick={handleSignOut}>Sign Out</button>
      <br />
      <button
        onClick={() => {
          navigator("/");
        }}
      >
        Home
      </button>
      <h3>Something Wrong please check.</h3>
      <br />
      <div>Your session may expired try signing out</div>
      <br />
      <div>Try to signin using admin account</div>
      <br />
    </>
  );
};

export default ErrorPage;
