import { Transition } from "@headlessui/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import IncubyteLogo from "../../assets/IncubyteLogo.png";
import "../../css/utilities/Navbar.css";
import CloseMenu from "./icons/CloseMenu";
import OpenMenu from "./icons/OpenMenu";
import AddUser from "../user/AddUsers";
import { ToastContainer } from "react-toastify";
import { useMsal } from "@azure/msal-react";

interface NavbarProps {
  isHome: boolean;
  isProfile: boolean;
  isUser: boolean;
  isCourse: boolean;
  isTag: boolean;
  getQuery?: (query: string) => void;
}

const Navbar = (props: NavbarProps) => {
  const navigator = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { instance, inProgress } = useMsal();


  const logout = async () => {
    await localStorage.removeItem("authToken");
    const accounts = instance.getAllAccounts();
    if (accounts.length !== 0) {
      await instance.logoutRedirect({});
    }
  };

  return (
    <>
      <div className="sticky top-0 z-50">
        <nav className="NavbarContainer" role="navigation">
          <div className="NavbarInnerContainer">
            <div className="NavbarHeaderFlexItems">
              <div className="navbarHeaderFlexShrink">
                <img
                  className="navbarHeaderLogoHeightWidth cursor-pointer"
                  src={IncubyteLogo}
                  onClick={() => {
                    navigator("/");
                  }}
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
                  {props.isUser && (
                    <Link
                      to="/users"
                      className="navbarHeaderItems"
                      data-testid="navbarHeaderUserLink"
                    >
                      Users
                    </Link>
                  )}
                  {!props.isUser && (
                    <Link
                      to="/addUser"
                      className="navbarHeaderItems"
                      data-testid="navbarHeaderAddUserLink"
                    >
                      Add User
                    </Link>
                  )}
                  {props.isCourse && (
                    <Link
                      to="/courses"
                      className="navbarHeaderItems"
                      data-testid="navbarHeaderCourseLink"
                    >
                      Courses
                    </Link>
                  )}
                  {!props.isCourse && (
                    <Link
                      to="/addCourse"
                      className="navbarHeaderItems"
                      data-testid="navbarHeaderCourseLink"
                    >
                      Add Course
                    </Link>
                  )}
                  {!props.isTag && (
                    <Link
                      to="/tags"
                      className="navbarHeaderItems"
                      data-testid="navbarHeaderTagLink"
                    >
                      Tags
                    </Link>
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
                {!props.isUser && (
                  <Link
                    to="/addUser"
                    className="navbarHeaderItems"
                    data-testid="navbarHeaderAddUserLink"
                  >
                    Add User
                  </Link>
                )}
                {props.isUser && (
                  <Link to="/users" className="navbarHeaderItems">
                    Users
                  </Link>
                )}
                {props.isCourse && (
                  <Link to="/courses" className="navbarHeaderItems">
                    Courses
                  </Link>
                )}
                {!props.isCourse && (
                  <Link
                    to="/addCourse"
                    className="navbarHeaderItems"
                    data-testid="navbarHeaderCourseLink"
                  >
                    Add Courses
                  </Link>
                )}
                {!props.isTag && (
                  <Link
                    to="/tags"
                    className="navbarHeaderItems"
                    data-testid="navbarHeaderTagLink"
                  >
                    Tags
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
          <ToastContainer />
        </nav>
      </div>
    </>
  );
};

export default Navbar;
