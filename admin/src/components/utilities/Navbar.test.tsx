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
        <Navbar
          getQuery={mockGetQuery}
          isCourse={true}
          isHome={true}
          isProfile={true}
          isUser={true}
        />
      </BrowserRouter>
    );

    const logoHeader = screen.getByTestId("navbarHeaderLogo");
    expect(logoHeader).toBeInTheDocument();

    const homeLink = screen.getByTestId("navbarHeaderHomeLink");
    expect(homeLink).toBeInTheDocument();

    const profileLink = screen.getByTestId("navbarHeaderProfileLink");
    expect(profileLink).toBeInTheDocument();
  });

  test("Logout is present in navbar", () => {
    render(
      <BrowserRouter>
        <Navbar
          getQuery={mockGetQuery}
          isCourse={true}
          isHome={true}
          isProfile={true}
          isUser={true}
        />
      </BrowserRouter>
    );

    const navbarLogout = screen.getByTestId("navbarHeaderLogoutLink");
    expect(navbarLogout).toBeInTheDocument();
  });
});
