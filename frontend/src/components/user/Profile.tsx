import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "../utilities/Carousel";
import Navbar from "../utilities/Navbar";
import "../../css/user/profile.css";

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
      <div className="text-5xl lg:text-4xl md:text-5xl xsm:text-4xl mb-5 grid grid-cols-1 justify-items-center content-center object-contain">
        My Profile
      </div>
      <div className="grid grid-cols-1 justify-items-center content-center object-contain">
        <img
          className="rounded-full h-40 w-40"
          src="https://wallpapercave.com/wp/wp6480749.jpg"
        ></img>
      </div>
      <div className="grid grid-cols-1">
        <div className="grid grid-cols-2 justify-items-center content-center object-contain">
          <label className="ProfileLabel">Email</label>
          <label className="ProfileLabel">Employee Id</label>
        </div>
        <div className="grid grid-cols-2 justify-items-center content-center object-contain">
          <input disabled value="Email" className="ProfileInput"></input>
          <input disabled value="EID" className="ProfileInput"></input>
        </div>
        <div className="grid grid-cols-3 justify-items-center content-center object-contain">
          <label className="ProfileLabel">Client Team</label>
          <label className="ProfileLabel">Role</label>
          <label className="ProfileLabel">Total Credit</label>
        </div>
        <div className="grid grid-cols-3 justify-items-center content-center object-contain">
          <input disabled value="Client Team" className="ProfileInput"></input>
          <input disabled value="Role" className="ProfileInput"></input>
          <input disabled value="Credit" className="ProfileInput"></input>
        </div>
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
