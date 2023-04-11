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
        <Navbar />
      </BrowserRouter>
    );

    const logoHeader = screen.getByTestId("navbarHeaderLogo");
    expect(logoHeader).toBeInTheDocument();

    const homeLink = screen.getByTestId("navbarHeaderHomeLink");
    expect(homeLink).toBeInTheDocument();

    const profileLink = screen.getByTestId("navbarHeaderProfileLink");
    expect(profileLink).toBeInTheDocument();
  });
});
