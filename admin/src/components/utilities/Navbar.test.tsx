import { cleanup, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Navbar";

afterEach(() => {
  cleanup();
});

describe("Navbar", () => {
  const mockGetQuery = jest.fn();
  test("Navbar is present", () => {
    render(
      <BrowserRouter>
        <Navbar isCourse={true} isHome={true} isProfile={true} isUser={true} />
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
        <Navbar isCourse={true} isHome={true} isProfile={true} isUser={true} />
      </BrowserRouter>
    );

    const navbarLogout = screen.getByTestId("navbarHeaderLogoutLink");
    expect(navbarLogout).toBeInTheDocument();
  });

  test("course button is present in navbar", () => {
    render(
      <BrowserRouter>
        <Navbar isCourse={true} isHome={true} isProfile={true} isUser={true} />
      </BrowserRouter>
    );

    const navbarCourse = screen.getByTestId("navbarHeaderCourseLink");
    expect(navbarCourse).toBeInTheDocument();
  });
  test("Home button is present in navbar", () => {
    render(
      <BrowserRouter>
        <Navbar isCourse={true} isHome={true} isProfile={true} isUser={true} />
      </BrowserRouter>
    );

    const navbarHome = screen.getByTestId("navbarHeaderHomeLink");
    expect(navbarHome).toBeInTheDocument();
  });
  test("User button is present in navbar", () => {
    render(
      <BrowserRouter>
        <Navbar isCourse={true} isHome={true} isProfile={true} isUser={true} />
      </BrowserRouter>
    );

    const navbarUser = screen.getByTestId("navbarHeaderUserLink");
    expect(navbarUser).toBeInTheDocument();
  });
  test("AddUser button is present in navbar", () => {
    render(
      <BrowserRouter>
        <Navbar isCourse={true} isHome={true} isProfile={true} isUser={false} />
      </BrowserRouter>
    );

    const navbarAddUser = screen.getByTestId("navbarHeaderAddUserLink");
    expect(navbarAddUser).toBeInTheDocument();
  });
});
