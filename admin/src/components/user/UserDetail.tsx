import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../css/user/adminProfile.css";
import Navbar from "../utilities/Navbar";
import { imageUpload } from "./ImageUpload";
import { userType } from "./user";

const UserDetail = () => {
  const [user, setUser] = useState<userType>();
  const urlParams = useParams();
  const [showModal, setShowModal] = useState(false);
  const [avatar, setAvatar] = useState("");
  const blob = new Blob([avatar]);
  const changeAvatar = (e: any) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const handleSubmit = async () => {
    let media: any = [];
    if (avatar) {
      media = await imageUpload([avatar]);
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
    }
  };

  const fetchUser = async () => {
    const response = await fetch(
      "https://backend-mu-plum.vercel.app/user/getUser/" + urlParams.id,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    if (response.ok) {
      const responseUser = await response.json();
      setUser(responseUser);
    }
  };

  const authToken = localStorage.getItem("authToken");
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <>
      {showModal ? (
        <>
          <div data-testid="UserDetailImageModel" className="AdminProfileModal">
            <div className="relative w-auto my-6 mx-auto">
              <div className="AdminProfileModalContainer">
                <div className="AdminProfileModelUploadContainer">
                  <h3 className="text-3xl font-semibold">Upload Image</h3>
                  <button
                    className="AdminProfileModalUploadButton"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-black h-6 w-6 text-2xl block outline-none">
                      x
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <label className="AdminProfileModelUploadFileLabel">
                    Upload file
                  </label>
                  <input
                    data-testid="UserDetailImageInput"
                    accept="image/*"
                    className="AdminProfileModalUploadInput"
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
                <div className="AdminProfileModalFooter">
                  <button
                    data-testid="UserDetailImageClose"
                    className="AdminProfileModalCloseButton"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    data-testid="UserDetailImageSave"
                    className="AdminProfileModalSaveButton bg-emerald-500 active:bg-emerald-600"
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
        isHome={false}
        isProfile={true}
        isUser={false}
      ></Navbar>
      <div className="AdminProfileDiv">
        <div className="AdminProfileContainer">
          <div className="AdminProfilePhotoDiv">
            <img
              data-testid="UserDetailImage"
              className="AdminProfilePhoto"
              src={avatar ? URL.createObjectURL(blob) : user?.profilePhoto}
            ></img>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              data-testid="UserDetailImageButton"
              className="AdminProfileImageUpdateIcon"
              onClick={() => setShowModal(true)}
              viewBox="0 0 24 24"
            >
              <path d="M19,13a1,1,0,0,0-1,1v.38L16.52,12.9a2.79,2.79,0,0,0-3.93,0l-.7.7L9.41,11.12a2.85,2.85,0,0,0-3.93,0L4,12.6V7A1,1,0,0,1,5,6h7a1,1,0,0,0,0-2H5A3,3,0,0,0,2,7V19a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V14A1,1,0,0,0,19,13ZM5,20a1,1,0,0,1-1-1V15.43l2.9-2.9a.79.79,0,0,1,1.09,0l3.17,3.17,0,0L15.46,20Zm13-1a.89.89,0,0,1-.18.53L13.31,15l.7-.7a.77.77,0,0,1,1.1,0L18,17.21ZM22.71,4.29l-3-3a1,1,0,0,0-.33-.21,1,1,0,0,0-.76,0,1,1,0,0,0-.33.21l-3,3a1,1,0,0,0,1.42,1.42L18,4.41V10a1,1,0,0,0,2,0V4.41l1.29,1.3a1,1,0,0,0,1.42,0A1,1,0,0,0,22.71,4.29Z" />
            </svg>
          </div>

          <div className="AdminProfileContentContainer">
            <div className="AdminProfileContentGridContainer">
              <div className="AdminProfileGridContent">
                <label
                  data-testid="UserDetailEmailLabel"
                  className="AdminProfileLabel"
                >
                  Email
                </label>
                <input
                  data-testid="UserDetailEmailInput"
                  defaultValue={user?.email}
                  className="AdminProfileInput"
                ></input>
              </div>
              <div className="AdminProfileGridContent">
                <label
                  data-testid="UserDetailEidLabel"
                  className="AdminProfileLabel"
                >
                  Employee Id
                </label>
                <input
                  data-testid="UserDetailEidInput"
                  defaultValue={user?.eId}
                  className="AdminProfileInput"
                ></input>
              </div>
              <div className="AdminProfileGridContent">
                <label
                  data-testid="UserDetailDesignationLabel"
                  className="AdminProfileLabel"
                >
                  Designation
                </label>
                <input
                  data-testid="UserDetailDesignationInput"
                  defaultValue={user?.role}
                  className="AdminProfileInput"
                ></input>
              </div>
              <div className="AdminProfileGridContent">
                <label
                  data-testid="UserDetailRoleLabel"
                  className="AdminProfileLabel"
                >
                  Role
                </label>
                <input
                  data-testid="UserDetailRoleInput"
                  defaultValue={user?.roles}
                  className="AdminProfileInput"
                ></input>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-24 grid grid-cols-2 gap-24">
          <button
            data-testid="UserDetailUpdate"
            className="AdminProfileModalSaveButton bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600"
            type="button"
          >
            Update
          </button>
          <button
            data-testid="UserDetailDelete"
            className="AdminProfileModalSaveButton bg-red-600 hover:bg-red-500 active:bg-red-700"
            type="button"
          >
            delete
          </button>
        </div>
      </div>
    </>
  );
};

export default UserDetail;
