import { useState } from "react";
import IncubyteLogo from "../../assets/IncubyteLogo.png";
import { Link } from "react-router-dom";
import { Transition } from "@headlessui/react";
import OpenMenu from "../utilities/icons/OpenMenu";
import CloseMenu from "../utilities/icons/CloseMenu";
import "../../css/courses/Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div>
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
                  <Link
                    to="/"
                    className="navbarHeaderItems"
                    data-testid="navbarHeaderHomeLink"
                  >
                    Home
                  </Link>
                  <Link
                    to="/"
                    className="navbarHeaderItems"
                    data-testid="navbarHeaderProfileLink"
                  >
                    Profile
                  </Link>
                  <div className="navbarHeaderSearchContainer">
                    <div className="navbarHeaderSearchFlexBorder">
                      <input
                        type="text"
                        className="navbarHeaderSearchInput"
                        placeholder="Search..."
                      />
                      <button className="navbarHeaderSearchButton">
                        Search
                      </button>
                    </div>
                  </div>
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
                <Link to="/" className="navbarHeaderItems">
                  Home
                </Link>
                <Link to="/" className="navbarHeaderItems">
                  Profile
                </Link>
                <div className="navbarHeaderSearchContainer">
                  <div className="navbarHeaderTransitionSearch">
                    <input
                      type="text"
                      className="navbarHeaderSearchInput"
                      placeholder="Search..."
                    />
                    <button className="navbarHeaderSearchButton">Search</button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
