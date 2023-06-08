import { cleanup, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Footer from "./Footer";

afterEach(() => {
  cleanup();
});

describe("Footer", () => {
  test("Footer is present", () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );

    const footer = screen.getByTestId("footer");
    expect(footer).toBeInTheDocument();

    const link = screen.getByTestId("footerLink");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://www.incubyte.co/");
  });
});
