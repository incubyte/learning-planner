import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "../utilities/Carousel";

const Profile = () => {
  const navigator = useNavigate();

  const [activeCourse, setActiveCourse] = useState<any[]>([]);

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
  return (
    <>
      {" "}
      <div>Profile</div>
      <Carousel
        titleName="My Courses"
        courses={activeCourse}
        contentId="popContent"
      />
    </>
  );
};

export default Profile;
