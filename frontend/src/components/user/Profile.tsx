import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "../utilities/Carousel";
import Navbar from "../utilities/Navbar";

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
      <Navbar
        isCourse={true}
        isHome={true}
        isProfile={false}
        isSearch={false}
      ></Navbar>
      <div className="text-5xl lg:text-4xl md:text-7xl xsm:text-4xl mb-5 grid grid-cols-1 justify-items-center content-center object-contain">
        My Profile
      </div>
      <div className="grid grid-cols-1 justify-items-center content-center object-contain">
        <img
          className="rounded-full h-40 w-40"
          src="https://wallpapercave.com/wp/wp6480749.jpg"
        ></img>
      </div>
      <div className="grid grid-cols-2 justify-items-center content-center object-contain">
        <label>Email</label>
        <label>Employee Id</label>
      </div>
      <div className="grid grid-cols-2 justify-items-center content-center object-contain">
        <input disabled value="email"></input>
        <input disabled value="EID"></input>
      </div>
      <div className="grid grid-cols-3 justify-items-center content-center object-contain">
        <label>Client Team</label>
        <label>Role</label>
        <label>Total Credit</label>
      </div>
      <div className="grid grid-cols-3 justify-items-center content-center object-contain">
        <input disabled value="Client Team"></input>
        <input disabled value="Role"></input>
        <input disabled value="Credit"></input>
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
