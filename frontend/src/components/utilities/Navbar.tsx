import { Transition } from "@headlessui/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import IncubyteLogo from "../../assets/IncubyteLogo.png";
import "../../css/utilities/Navbar.css";
import CloseMenu from "./icons/CloseMenu";
import OpenMenu from "./icons/OpenMenu";

interface NavbarProps {
  isHome: boolean;
  isProfile: boolean;
  isSearch: boolean;
  isCourse: boolean;
  getQuery?: (query: string) => void;
}

const Navbar = (props: NavbarProps) => {
  const navigator = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const logout = async () => {
    await localStorage.removeItem("authToken");
    await navigator("/auth/sign_in");
  };

  return (
    <>
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
                  <button
                    className="navbarHeaderItems"
                    data-testid="navbarHeaderLogoutLink"
                    onClick={logout}
                  >
                    Logout
                  </button>
                  {props.isSearch && (
                    <div className="navbarHeaderSearchContainer">
                      <div className="navbarHeaderSearchFlexBorder">
                        <input
                          type="text"
                          className="navbarHeaderSearchInput"
                          placeholder="Search..."
                          onChange={(e) =>
                            props.getQuery &&
                            props.getQuery((e.target as HTMLInputElement).value)
                          }
                        />
                      </div>
                    </div>
                  )}
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
                <button
                  className="flex items-center justify-center navbarHeaderItems"
                  data-testid="navbarHeaderLogoutLink"
                  onClick={logout}
                >
                  Logout
                </button>
                {props.isSearch && (
                  <div className="navbarHeaderSearchContainer">
                    <div className="navbarHeaderTransitionSearch">
                      <input
                        type="text"
                        className="navbarHeaderSearchInput"
                        placeholder="Search..."
                        data-testid="mobile-menu-search"
                        onChange={(e) =>
                          props.getQuery &&
                          props.getQuery((e.target as HTMLInputElement).value)
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Transition>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
