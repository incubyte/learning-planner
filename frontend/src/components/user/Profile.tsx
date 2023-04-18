import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigator = useNavigate();

  const fetchUser = async () => {
    const response = await fetch("https://backend-mu-plum.vercel.app/user", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    if (response.ok) {
      console.log(response);
    } else {
      navigator("/auth/signin");
    }
  };

  const authToken = localStorage.getItem("authToken");
  useEffect(() => {
    // fetchUser();
  });
  return <div>Profile</div>;
};

export default Profile;
