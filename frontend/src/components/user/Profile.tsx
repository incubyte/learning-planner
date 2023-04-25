import { useEffect, useState } from "react";
import "../../css/user/profile.css";
import Carousel from "../utilities/Carousel";
import Navbar from "../utilities/Navbar";
import { imageUpload } from "./ImageUpload";

const Profile = () => {
  const [activeCourse, setActiveCourse] = useState<any[]>([]);
  const [user, setUser] = useState<any>("");

  const handleSubmit = async () => {
    let media: any = [];
    if (avatar) {
      media = await imageUpload([avatar]);
      console.log(media[0].url);
      const response = await fetch(
        "https://backend-mu-plum.vercel.app/user/updateProfile",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
          method: "PATCH",
          body: JSON.stringify({
            profilePhoto: media[0].url,
          }),
        }
      );
      console.log(response);
      if (response.ok) {
        const jsonResnponse = await response.json();
        console.log(jsonResnponse);
        setUser(jsonResnponse);
      }
      setShowModal(false);
    }
  };

  const fetchUser = async () => {
    const response = await fetch("https://backend-mu-plum.vercel.app/user", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    if (response.ok) {
      const jsonResnponse = await response.json();
      console.log(jsonResnponse);
      setUser(jsonResnponse);
    }
  };

  const fetchCourse = async () => {
    const response = await fetch(
      "https://backend-mu-plum.vercel.app/user/course",
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    if (response.ok) {
      const jsonResnponse = await response.json();
      console.log(jsonResnponse);
      setActiveCourse(jsonResnponse);
    }
  };

  const [showModal, setShowModal] = useState(false);
  const [avatar, setAvatar] = useState("");
  const blob = new Blob([avatar]);
  const changeAvatar = (e: any) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const authToken = localStorage.getItem("authToken");
  useEffect(() => {
    fetchUser();
    fetchCourse();
  }, []);
  console.log(user);
  return (
    <>
      {showModal ? (
        <>
          <div
            data-testid="profileImageModel"
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-80 bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 xsm:p-3 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Upload Image</h3>
                  <button
                    className="p-1 ml-auto border-0 text-black float-right text-3xl font-semibold outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-black h-6 w-6 text-2xl block outline-none">
                      x
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Upload file
                  </label>
                  <input
                    data-testid="profileImageInput"
                    accept="image/*"
                    className="relative m-0 block w-auto xsm:w-72 min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
                    aria-describedby="file_input_help"
                    id="file_input"
                    type="file"
                    onChange={changeAvatar}
                  />
                  <p
                    className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                    id="file_input_help"
                  >
                    SVG, PNG, JPG or GIF (MAX. 350kb).
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    data-testid="profileImageClose"
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    data-testid="profileImageSave"
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      <Navbar
        isCourse={true}
        isHome={true}
        isProfile={false}
        isSearch={false}
      ></Navbar>
      <div
        data-testid="profileHeader"
        className="text-5xl lg:text-4xl md:text-4xl xsm:text-4xl mt-8 mb-5 grid grid-cols-1 justify-items-center content-center object-contain"
      >
        My Profile
      </div>
      <div className="grid grid-cols-1 justify-items-center content-center object-contain">
        <div className="relative">
          <img
            data-testid="profileImage"
            className="rounded-full h-40 w-40 block"
            src={avatar ? URL.createObjectURL(blob) : user.profilePhoto}
          ></img>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            data-testid="profileImageButton"
            className="h-6 w-6 absolute bottom-6 bg-white rounded-md right-3 hover:cursor-pointer hover:h-7 hover:w-7"
            onClick={() => setShowModal(true)}
            viewBox="0 0 24 24"
          >
            <path d="M19,13a1,1,0,0,0-1,1v.38L16.52,12.9a2.79,2.79,0,0,0-3.93,0l-.7.7L9.41,11.12a2.85,2.85,0,0,0-3.93,0L4,12.6V7A1,1,0,0,1,5,6h7a1,1,0,0,0,0-2H5A3,3,0,0,0,2,7V19a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V14A1,1,0,0,0,19,13ZM5,20a1,1,0,0,1-1-1V15.43l2.9-2.9a.79.79,0,0,1,1.09,0l3.17,3.17,0,0L15.46,20Zm13-1a.89.89,0,0,1-.18.53L13.31,15l.7-.7a.77.77,0,0,1,1.1,0L18,17.21ZM22.71,4.29l-3-3a1,1,0,0,0-.33-.21,1,1,0,0,0-.76,0,1,1,0,0,0-.33.21l-3,3a1,1,0,0,0,1.42,1.42L18,4.41V10a1,1,0,0,0,2,0V4.41l1.29,1.3a1,1,0,0,0,1.42,0A1,1,0,0,0,22.71,4.29Z" />
          </svg>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:block md:block smd:block sm:hidden xsm:hidden">
        <div className="grid grid-cols-3 gap-4 justify-items-center content-center mt-5">
          <label data-testid="profileEmailLabel" className="ProfileLabel">
            Email
          </label>
          <label data-testid="profileEidLabel" className="ProfileLabel">
            Employee Id
          </label>
          <label data-testid="profileTotalCourseLabel" className="ProfileLabel">
            Total Course
          </label>
        </div>
        <div className="grid grid-cols-3 gap-4 justify-items-center content-center mb-8">
          <input
            disabled
            data-testid="profileEmailInput"
            value={user.email}
            className="ProfileInput"
          ></input>
          <input
            disabled
            data-testid="profileEidInput"
            value={user.eId}
            className="ProfileInput"
          ></input>
          <input
            disabled
            data-testid="profileTotalCourseInput"
            value={activeCourse.length}
            className="ProfileInput"
          ></input>
        </div>
        <div className="grid grid-cols-3 gap-4 justify-items-center content-center">
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
        <div className="grid grid-cols-3 gap-4 justify-items-center content-center mb-10">
          <input
            disabled
            data-testid="profileClientTeamInput"
            value={user.clientTeam}
            className="ProfileInput"
          ></input>
          <input
            disabled
            value={user.role}
            data-testid="profileRoleInput"
            className="ProfileInput"
          ></input>
          <input
            disabled
            value="0"
            data-testid="profileCreditInput"
            className="ProfileInput"
          ></input>
        </div>
      </div>

      <div className="grid grid-cols-1 p-6 sm:p-8 lg:hidden md:hidden smd:hidden">
        <div className="grid grid-cols-1 sm:gap-8 xsm:gap-4 justify-items-center content-center">
          <div className="grid grid-cols-2 justify-items-center content-center">
            <label className="ProfileLabel">Email</label>
            <input disabled value={user.email} className="ProfileInput"></input>
          </div>
          <div className="grid grid-cols-2 justify-items-center content-center">
            <label className="ProfileLabel">Employee Id</label>
            <input disabled value={user.eId} className="ProfileInput"></input>
          </div>
          <div className="grid grid-cols-2 justify-items-center content-center">
            <label className="ProfileLabel">Client Team</label>
            <input
              disabled
              value={user.clientTeam}
              className="ProfileInput"
            ></input>
          </div>
          <div className="grid grid-cols-2 justify-items-center content-center">
            <label className="ProfileLabel">Role</label>
            <input disabled value={user.role} className="ProfileInput"></input>
          </div>
          <div className="grid grid-cols-2 justify-items-center content-center">
            <label className="ProfileLabel">Credit</label>
            <input disabled value="0" className="ProfileInput"></input>
          </div>
          <div className="grid grid-cols-2 justify-items-center content-center mb-5">
            <label className="ProfileLabel">Total Course</label>
            <input
              disabled
              value={activeCourse.length}
              className="ProfileInput"
            ></input>
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
