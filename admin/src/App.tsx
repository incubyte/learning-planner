import { InteractionType, RedirectRequest } from "@azure/msal-browser";
import {
  AuthenticatedTemplate,
  useMsal,
  useMsalAuthentication,
} from "@azure/msal-react";
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
  const { instance, inProgress } = useMsal();

  // const handleSignIn = async () => {
  //   // if (inProgress === InteractionStatus.None) {

  //   const tokenResponse = await instance.handleRedirectPromise();
  //   console.log(tokenResponse);
  //   const accounts = instance.getAllAccounts();
  //   // if (accounts.length === 0) {
  //   //   console.log(accounts);
  //   instance
  //     .loginRedirect({
  //       scopes: ["user.read"],
  //     })
  //     .then(() => {
  //       console.log("first");
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  //   // }
  //   console.log(tokenResponse?.accessToken);
  // try {
  //   const response = await fetch(
  //     "https://backend-mu-plum.vercel.app/auth/admin/signin",
  //     {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${tokenResponse?.accessToken}`,
  //       },
  //     }
  //   );

  //   if (response.ok) {
  //     const authToken = await response.text();
  //     console.log(authToken);
  //     await localStorage.setItem("authToken", authToken);
  //     setIsSignInCompleted(true);
  //     console.log(isAuthenticated);
  //   }
  // } catch (error) {
  //   toast.error("An error occurred during login" + error, {
  //     autoClose: 2500,
  //     closeButton: false,
  //   });
  // }
  //   // }
  // };

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
        console.log(authToken);
        await localStorage.setItem("authToken", authToken);
        setIsSignInCompleted(true);
        // console.log(isAuthenticated);
      }
    } catch (error) {
      toast.error("An error occurred during login" + error, {
        autoClose: 2500,
        closeButton: false,
      });
    }
  };
  // const isAuthenticated = useIsAuthenticated();
  const loginRequest: RedirectRequest = {
    scopes: ["User.Read"],
  };
  const { login, result, error } = useMsalAuthentication(
    InteractionType.Redirect,
    loginRequest
  );

  if (error) {
    // handle error...
  }

  if (result) {
    console.log(result);
    makeJWTRequest(result);
  }

  const handleSignOut = async () => {
    await localStorage.removeItem("authToken");
    const accounts = instance.getAllAccounts();
    if (accounts.length !== 0) {
      await instance.logoutRedirect({});
    }
  };
  // const authToken = localStorage.getItem("authToken");
  const fetchPage = async () => {
    console.log(result, "");
    // if (!isAuthenticated) {
    //   handleSignIn();
    // } else {
    // const accessToken = localStorage.getItem("authToken");
    // const response = await fetch("https://backend-mu-plum.vercel.app/", {
    //   headers: {
    //     Authorization: `Bearer ${accessToken}`,
    //   },
    // });
    // console.log(response);
    // if (response.ok) {
    //   setIsSignInCompleted(true);
    // }
    // }
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
      {/* {result ? ( */}
      <AuthenticatedTemplate>
        <>
          <div className="App" data-testid="App">
            <button onClick={handleSignOut}>Sign Out</button>
            <Outlet></Outlet>
            <Footer></Footer>
          </div>
        </>
      </AuthenticatedTemplate>
      {/* ) : (
        <div>not</div>
      )} */}
      {/* <UnauthenticatedTemplate>
        <div>hello</div>
      </UnauthenticatedTemplate> */}
    </>
  );
}

export default App;
