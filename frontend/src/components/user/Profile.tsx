import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/user/profile.css";
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
      <div
        data-testid="profileHeader"
        className="text-5xl lg:text-4xl md:text-5xl xsm:text-4xl mb-5 grid grid-cols-1 justify-items-center content-center object-contain"
      >
        My Profile
      </div>
      <div className="grid grid-cols-1 justify-items-center content-center object-contain">
        <img
          data-testid="profileImage"
          className="rounded-full h-40 w-40"
          src="https://wallpapercave.com/wp/wp6480749.jpg"
        ></img>
      </div>
      <div className="grid lg:grid-cols-1 lg:block sm:hidden">
        <div className="grid lg:grid-cols-2  gap-4 justify-items-center content-center">
          <label data-testid="profileEmailLabel" className="ProfileLabel">
            Email
          </label>
          <label data-testid="profileEidLabel" className="ProfileLabel">
            Employee Id
          </label>
        </div>
        <div className="grid lg:grid-cols-2 justify-items-center content-center">
          <input
            disabled
            data-testid="profileEmailInput"
            value="Email"
            className="ProfileInput"
          ></input>
          <input
            disabled
            data-testid="profileEidInput"
            value="EID"
            className="ProfileInput"
          ></input>
        </div>
        <div className="grid lg:grid-cols-3 justify-items-center content-center">
          <label data-testid="profileClientTeamLabel" className="ProfileLabel">
            Client Team
          </label>
          <label data-testid="profileRoleLabel" className="ProfileLabel">
            Role
          </label>
          <label data-testid="profileCreditLabel" className="ProfileLabel">
            Total Credit
          </label>
        </div>
        <div className="grid lg:grid-cols-3 justify-items-center content-center">
          <input
            disabled
            data-testid="profileClientTeamInput"
            value="Client Team"
            className="ProfileInput"
          ></input>
          <input
            disabled
            value="Role"
            data-testid="profileRoleInput"
            className="ProfileInput"
          ></input>
          <input
            disabled
            value="Credit"
            data-testid="profileCreditInput"
            className="ProfileInput"
          ></input>
        </div>
      </div>

      <div className="grid sm:grid-cols-1 sm:p-4 lg:hidden">
        <div className="grid sm:grid-cols-1 gap-4 justify-items-center content-center">
          <div className="grid sm:grid-cols-2 align-middle justify-items-center content-center text-center">
            <label className="ProfileLabel">Email</label>
            <input disabled value="Email" className="ProfileInput"></input>
          </div>
          <div className="grid sm:grid-cols-2 justify-items-center content-center">
            <label className="ProfileLabel">Employee Id</label>
            <input disabled value="eid" className="ProfileInput"></input>
          </div>
          <div className="grid sm:grid-cols-2 justify-items-center content-center">
            <label className="ProfileLabel">Client Team</label>
            <input
              disabled
              value="client team"
              className="ProfileInput"
            ></input>
          </div>
          <div className="grid sm:grid-cols-2 justify-items-center content-center">
            <label className="ProfileLabel">Role</label>
            <input disabled value="role" className="ProfileInput"></input>
          </div>
          <div className="grid sm:grid-cols-2 justify-items-center content-center">
            <label className="ProfileLabel">Credit</label>
            <input disabled value="credit" className="ProfileInput"></input>
          </div>
        </div>
      </div>

      <Carousel
        titleName="My Courses"
        dataTestId="profileCourses"
        courses={activeCourse}
        contentId="popContent"
      />
    </>
  );
};

export default Profile;
