import { cleanup, fireEvent, render, screen } from "@testing-library/react";
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
          isSearch={true}
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

  test("updates search query when user types", () => {
    render(
      <BrowserRouter>
        <Navbar
          getQuery={mockGetQuery}
          isCourse={true}
          isHome={true}
          isProfile={true}
          isSearch={true}
        />
      </BrowserRouter>
    );

    const searchInput = screen.getByPlaceholderText("Search...");
    fireEvent.change(searchInput, { target: { value: "Java" } });
    expect(mockGetQuery).toHaveBeenCalledWith("Java");
  });
});
