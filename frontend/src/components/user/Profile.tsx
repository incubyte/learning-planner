import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/user/profile.css";
import { courseType } from "../courses/Courses";
import Carousel from "../utilities/Carousel";
import Navbar from "../utilities/Navbar";
import { imageUpload } from "./ImageUpload";
import { userType } from "./user";
import { ToastContainer, toast } from "react-toastify";
import ContentLoader from "react-content-loader";

const Profile = () => {
  const [activeCourse, setActiveCourse] = useState<courseType[]>([]);
  const [completedCourseCount, setCompletedCourseCount] = useState<number>(0);
  const [user, setUser] = useState<userType>();
  const [isLoading, setIsLoading] = useState(true);

  const navigator = useNavigate();

  const handleSubmit = async () => {
    let media: any = [];
    if (avatar) {
      media = await imageUpload([avatar]);
      try {
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
        if (response.ok) {
          const jsonResnponse = await response.json();
          setUser(jsonResnponse);
        }
        setShowModal(false);
      } catch (error) {
        toast.error("An error occurred" + error, {
          autoClose: 2500,
          closeButton: false,
        });
      }
    }
  };

  const fetchUser = async () => {
    try {
      const response = await fetch("https://backend-mu-plum.vercel.app/user", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (response && response.ok) {
        const responseUser = await response.json();
        setUser(responseUser);
      } else {
        navigator("/auth/signin");
      }
    } catch (error) {
      toast.error("An error occurred" + error, {
        autoClose: 2500,
        closeButton: false,
      });
    }
  };

  const fetchCourse = async () => {
    try {
      const response = await fetch(
        "https://backend-mu-plum.vercel.app/user/course",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response && response.ok) {
        const responseCourse = await response.json();
        setActiveCourse(responseCourse.courses);
        setCompletedCourseCount(responseCourse.count);
      } else {
        navigator("/auth/signin");
      }
    } catch (error) {
      toast.error("An error occurred" + error, {
        autoClose: 2500,
        closeButton: false,
      });
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

  const fetchData = async () => {
    setIsLoading(true);

    await Promise.all([fetchUser(), fetchCourse()]);

    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return isLoading ? (
    <>
      <Navbar
        isCourse={true}
        isHome={true}
        isProfile={true}
        isSearch={false}
      ></Navbar>
      <div className="hidden lg:block md:block">
        <ContentLoader viewBox="0 0 350 240">
          <rect x="150" y="10" rx="2" ry="2" width="50" height="13" />
          <circle cx="115" cy="75" r="35" />
          <rect x="200" y="35" rx="5" ry="5" width="80" height="11" />
          <rect x="200" y="50" rx="5" ry="5" width="80" height="11" />
          <rect x="200" y="65" rx="5" ry="5" width="80" height="11" />
          <rect x="200" y="80" rx="5" ry="5" width="80" height="11" />
          <rect x="200" y="95" rx="5" ry="5" width="80" height="11" />
          <rect x="200" y="110" rx="5" ry="5" width="80" height="11" />
          <rect x="150" y="130" rx="2" ry="2" width="50" height="10" />
          <rect x="12" y="150" width="100" height="70" />
          <rect x="120" y="150" width="100" height="70" />
          <rect x="228" y="150" width="100" height="70" />
          <rect x="336" y="150" width="100" height="70" />
        </ContentLoader>
      </div>
      <div className="lg:hidden md:hidden sm:block xsm:block">
        <ContentLoader viewBox="0 0 350 800">
          <rect x="110" y="30" rx="2" ry="2" width="150" height="35" />
          <circle cx="180" cy="160" r="80" />
          <rect x="65" y="260" rx="5" ry="5" width="230" height="40" />
          <rect x="65" y="310" rx="5" ry="5" width="230" height="40" />
          <rect x="65" y="360" rx="5" ry="5" width="230" height="40" />
          <rect x="65" y="410" rx="5" ry="5" width="230" height="40" />
          <rect x="65" y="460" rx="5" ry="5" width="230" height="40" />
          <rect x="65" y="510" rx="5" ry="5" width="230" height="40" />
          <rect x="110" y="580" rx="2" ry="2" width="150" height="30" />
          <rect x="20" y="630" width="250" height="200" />
          <rect x="300" y="630" width="250" height="200" />
        </ContentLoader>
      </div>
    </>
  ) : (
    <>
      {showModal ? (
        <>
          <div data-testid="profileImageModel" className="ProfileModal">
            <div className="relative w-auto my-6 mx-auto">
              <div className="ProfileModalContainer">
                <div className="ProfileModelUploadContainer">
                  <h3 className="text-3xl font-semibold">Upload Image</h3>
                  <button
                    className="ProfileModalUploadButton"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-black h-6 w-6 text-2xl block outline-none">
                      x
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <label className="ProfileModelUploadFileLabel">
                    Upload file
                  </label>
                  <input
                    data-testid="profileImageInput"
                    accept="image/*"
                    className="ProfileModalUploadInput"
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
                <div className="ProfileModalFooter">
                  <button
                    data-testid="profileImageClose"
                    className="ProfileModalCloseButton"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    data-testid="profileImageSave"
                    className="ProfileModalSaveButton bg-emerald-500 active:bg-emerald-600"
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

      <div data-testid="profileHeader" className="ProfileHeader">
        My Profile
      </div>
      <div className="ProfileDiv">
        <div className="ProfileContainer">
          <div className="ProfilePhotoDiv">
            <img
              data-testid="profileImage"
              className="ProfilePhoto"
              src={avatar ? URL.createObjectURL(blob) : user?.profilePhoto}
            ></img>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              data-testid="profileImageButton"
              className="ProfileImageUpdateIcon"
              onClick={() => setShowModal(true)}
              viewBox="0 0 24 24"
            >
              <path d="M19,13a1,1,0,0,0-1,1v.38L16.52,12.9a2.79,2.79,0,0,0-3.93,0l-.7.7L9.41,11.12a2.85,2.85,0,0,0-3.93,0L4,12.6V7A1,1,0,0,1,5,6h7a1,1,0,0,0,0-2H5A3,3,0,0,0,2,7V19a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V14A1,1,0,0,0,19,13ZM5,20a1,1,0,0,1-1-1V15.43l2.9-2.9a.79.79,0,0,1,1.09,0l3.17,3.17,0,0L15.46,20Zm13-1a.89.89,0,0,1-.18.53L13.31,15l.7-.7a.77.77,0,0,1,1.1,0L18,17.21ZM22.71,4.29l-3-3a1,1,0,0,0-.33-.21,1,1,0,0,0-.76,0,1,1,0,0,0-.33.21l-3,3a1,1,0,0,0,1.42,1.42L18,4.41V10a1,1,0,0,0,2,0V4.41l1.29,1.3a1,1,0,0,0,1.42,0A1,1,0,0,0,22.71,4.29Z" />
            </svg>
          </div>

          <div className="ProfileContentContainer">
            <div className="ProfileContentGridContainer">
              <div className="ProfileGridContent">
                <label data-testid="profileEmailLabel" className="ProfileLabel">
                  Email
                </label>
                <input
                  disabled
                  data-testid="profileEmailInput"
                  value={user?.email}
                  className="ProfileInput"
                ></input>
              </div>
              <div className="ProfileGridContent">
                <label data-testid="profileEidLabel" className="ProfileLabel">
                  Employee Id
                </label>
                <input
                  disabled
                  data-testid="profileEidInput"
                  value={user?.eId}
                  className="ProfileInput"
                ></input>
              </div>
              <div className="ProfileGridContent">
                <label
                  data-testid="profileClientTeamLabel"
                  className="ProfileLabel"
                >
                  Client Team
                </label>
                <input
                  disabled
                  data-testid="profileClientTeamInput"
                  value={user?.clientTeam}
                  className="ProfileInput"
                ></input>
              </div>
              <div className="ProfileGridContent">
                <label data-testid="profileRoleLabel" className="ProfileLabel">
                  Role
                </label>
                <input
                  disabled
                  data-testid="profileRoleInput"
                  value={user?.role}
                  className="ProfileInput"
                ></input>
              </div>
              <div className="ProfileGridContent">
                <label
                  data-testid="profileCreditLabel"
                  className="ProfileLabel"
                >
                  Credit
                </label>
                <input
                  disabled
                  data-testid="profileCreditInput"
                  value={completedCourseCount * 10}
                  className="ProfileInput"
                ></input>
              </div>
              <div className="ProfileGridContent mb-5">
                <label
                  data-testid="profileTotalCourseLabel"
                  className="ProfileLabel"
                >
                  Total Course
                </label>
                <input
                  disabled
                  data-testid="profileTotalCourseInput"
                  value={activeCourse.length}
                  className="ProfileInput"
                ></input>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Carousel
        titleName="My Courses"
        dataTestId="profileCourses"
        courses={activeCourse}
        contentId="popContent"
      />
      <ToastContainer />
    </>
  );
};

export default Profile;
