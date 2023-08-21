import { cleanup, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Navbar";

afterEach(() => {
  cleanup();
});

describe("Navbar", () => {
  test("Navbar is present", () => {
    render(
      <BrowserRouter>
        <Navbar
          isCourse={true}
          isHome={true}
          isProfile={true}
          isUser={true}
          isTag={true}
        />
      </BrowserRouter>
    );

    const logoHeader = screen.getByTestId("navbarHeaderLogo");
    expect(logoHeader).toBeInTheDocument();

    const homeLink = screen.getByTestId("navbarHeaderHomeLink");
    expect(homeLink).toBeInTheDocument();
  });

  test("Logout is present in navbar", () => {
    render(
      <BrowserRouter>
        <Navbar
          isCourse={true}
          isHome={true}
          isProfile={true}
          isUser={true}
          isTag={true}
        />
      </BrowserRouter>
    );

    const navbarLogout = screen.getByTestId("navbarHeaderLogoutLink");
    expect(navbarLogout).toBeInTheDocument();
  });

  test("tag button is present in navbar", () => {
    render(
      <BrowserRouter>
        <Navbar
          isCourse={true}
          isHome={true}
          isProfile={true}
          isUser={true}
          isTag={true}
        />
      </BrowserRouter>
    );

    const navbarCourse = screen.getByTestId("navbarHeaderCourseLink");
    expect(navbarCourse).toBeInTheDocument();
  });

  test("course button is present in navbar", () => {
    render(
      <BrowserRouter>
        <Navbar
          isCourse={true}
          isHome={true}
          isProfile={true}
          isUser={true}
          isTag={false}
        />
      </BrowserRouter>
    );

    const navbarTag = screen.getByTestId("navbarHeaderTagLink");
    expect(navbarTag).toBeInTheDocument();
  });
  test("Home button is present in navbar", () => {
    render(
      <BrowserRouter>
        <Navbar
          isCourse={true}
          isHome={true}
          isProfile={true}
          isUser={true}
          isTag={true}
        />
      </BrowserRouter>
    );

    const navbarHome = screen.getByTestId("navbarHeaderHomeLink");
    expect(navbarHome).toBeInTheDocument();
  });
  test("User button is present in navbar", () => {
    render(
      <BrowserRouter>
        <Navbar
          isCourse={true}
          isHome={true}
          isProfile={true}
          isUser={true}
          isTag={true}
        />
      </BrowserRouter>
    );

    const navbarUser = screen.getByTestId("navbarHeaderUserLink");
    expect(navbarUser).toBeInTheDocument();
  });
  test("AddUser button is present in navbar", () => {
    render(
      <BrowserRouter>
        <Navbar
          isCourse={true}
          isHome={true}
          isProfile={true}
          isUser={false}
          isTag={true}
        />
      </BrowserRouter>
    );

    const navbarAddUser = screen.getByTestId("navbarHeaderAddUserLink");
    expect(navbarAddUser).toBeInTheDocument();
  });
});
