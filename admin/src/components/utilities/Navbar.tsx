import { Transition } from "@headlessui/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import * as XLSX from "xlsx";
import IncubyteLogo from "../../assets/IncubyteLogo.png";
import "../../css/user/profile.css";
import "../../css/utilities/Navbar.css";
import CloseMenu from "./icons/CloseMenu";
import OpenMenu from "./icons/OpenMenu";

interface NavbarProps {
  isHome: boolean;
  isProfile: boolean;
  isUser: boolean;
  isCourse: boolean;
  getQuery?: (query: string) => void;
}

const Navbar = (props: NavbarProps) => {
  const navigator = useNavigate();

  const [usersData, setUserData] = useState<any>([]);

  const [isOpen, setIsOpen] = useState(false);
  var arraylist: any[] = [];

  const logout = async () => {
    await localStorage.removeItem("authToken");
    await navigator("/auth/signin");
  };
  const addUser = async () => {
    await setShowModal(true);
  };

  const handleSubmit = async () => {
    const authToken = localStorage.getItem("authToken");
    const response = await fetch(
      "https://backend-mu-plum.vercel.app/user/add",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ users: arraylist }),
      }
    );

    console.log(response);
    if (response.ok) {
      toast.success("users added", {
        autoClose: 2500,
        closeButton: false,
      });
    } else {
      if (response.status !== 400) {
        const jsonResponse = await response.json();
        toast.error(jsonResponse.message, {
          autoClose: 2500,
          closeButton: false,
        });
      } else {
        toast.error("Please check data and try again", {
          autoClose: 2500,
          closeButton: false,
        });
      }
    }
  };

  const onChange = (event: any) => {
    let file = event.target.files[0];

    const allowedFileTypes = [
      "application/vnd.ms-excel",
      "text/csv",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
    if (!allowedFileTypes.includes(file.type)) {
      toast.error("Please upload .csv or .xlsx or .xsl file", {
        autoClose: 2500,
        closeButton: false,
      });
    } else {
      setShowModal(false);
      let fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = async (e) => {
        const arrayBuffer: any = fileReader.result;
        var data = new Uint8Array(arrayBuffer);
        var arr = new Array();
        for (var i = 0; i != data.length; ++i)
          arr[i] = String.fromCharCode(data[i]);
        var bstr = arr.join("");
        var workbook = XLSX.read(bstr, { type: "binary" });
        var first_sheet_name = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[first_sheet_name];
        console.log(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
        arraylist = XLSX.utils.sheet_to_json(worksheet, { raw: true });
        // setUserData(arraylist);
        if (arraylist.length > 0) handleSubmit();
      };
    }
  };
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal ? (
        <>
          <div data-testid="profileImageModel" className="ProfileModal">
            <div className="relative w-auto my-6 mx-auto">
              <div className="ProfileModalContainer">
                <div className="ProfileModelUploadContainer">
                  <h3 className="text-3xl font-semibold">Upload Excel</h3>
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
                    type="file"
                    id="file-upload"
                    accept=".csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    onChange={(event) => {
                      onChange(event);
                    }}
                  />
                  <p
                    className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                    id="file_input_help"
                  >
                    csv, xlsx, xls
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
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      <div className="sticky top-0 z-50">
        <nav className="NavbarContainer" role="navigation">
          <div className="NavbarInnerContainer">
            <div className="NavbarHeaderFlexItems">
              <div className="navbarHeaderFlexShrink">
                <img
                  className="navbarHeaderLogoHeightWidth"
                  src={IncubyteLogo}
                  alt="Workflow"
                  data-testid="navbarHeaderLogo"
                />
              </div>
              <div className="navbarHeaderItemsContainer">
                <div className="navbarHeaderItemsContainerFlex">
                  {props.isHome && (
                    <Link
                      to="/"
                      className="navbarHeaderItems"
                      data-testid="navbarHeaderHomeLink"
                    >
                      Home
                    </Link>
                  )}
                  {props.isProfile && (
                    <Link
                      to="/user"
                      className="navbarHeaderItems"
                      data-testid="navbarHeaderProfileLink"
                    >
                      Profile
                    </Link>
                  )}
                  {props.isCourse && (
                    <Link
                      to="/course"
                      className="navbarHeaderItems"
                      data-testid="navbarHeaderCourseLink"
                    >
                      Courses
                    </Link>
                  )}
                  {props.isUser && (
                    <Link
                      to="/user"
                      className="navbarHeaderItems"
                      data-testid="navbarHeaderUserLink"
                    >
                      Users
                    </Link>
                  )}
                  {!props.isUser && (
                    <button
                      className="navbarHeaderItems"
                      data-testid="navbarHeaderAddUserLink"
                      onClick={addUser}
                    >
                      Add User
                    </button>
                  )}
                  <button
                    className="navbarHeaderItems"
                    data-testid="navbarHeaderLogoutLink"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </div>
              </div>

              <div className="navbarHeaderMobileViewContainer">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  type="button"
                  className="navbarHeaderMobileViewExpandButton"
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                  data-testid="navbarExpandButton"
                >
                  <span className="sr-only">Open main menu</span>
                  {!isOpen ? <OpenMenu /> : <CloseMenu />}
                </button>
              </div>
            </div>
          </div>
          <ToastContainer />
          <Transition
            show={isOpen}
            enter="transition ease-out duration-100 transform"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-75 transform"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div
              className="navbarHeaderTransitionHidden"
              id="mobile-menu"
              data-testid="mobile-menu"
            >
              <div className="navbarHeaderTransitionMenuItems">
                {props.isHome && (
                  <Link to="/" className="navbarHeaderItems">
                    Home
                  </Link>
                )}
                {props.isProfile && (
                  <Link to="/user" className="navbarHeaderItems">
                    Profile
                  </Link>
                )}
                {props.isCourse && (
                  <Link to="/course" className="navbarHeaderItems">
                    Courses
                  </Link>
                )}
                {props.isUser && (
                  <Link to="/user" className="navbarHeaderItems">
                    Users
                  </Link>
                )}
                <button
                  className="flex items-center justify-center navbarHeaderItems"
                  data-testid="navbarHeaderLogoutLink"
                  onClick={logout}
                >
                  Logout
                </button>
              </div>
            </div>
          </Transition>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
