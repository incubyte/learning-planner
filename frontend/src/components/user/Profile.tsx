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
    }
  };

  const authToken = localStorage.getItem("authToken");
  useEffect(() => {
    // fetchUser();
  });
  return (
    <>
      {" "}
      <div className="text-5xl lg:text-4xl md:text-7xl xsm:text-4xl mb-5 grid grid-cols-1 justify-items-center content-center object-contain">
        My Profile
      </div>
      <Carousel
        titleName="My Courses"
        courses={activeCourse}
        contentId="popContent"
      />
    </>
  );
};

export default Profile;
