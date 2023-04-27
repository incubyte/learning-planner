import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import HomePage from "./HomePage";

test("renders HomePage", () => {
  render(
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>
  );
  const navbar = screen.getByRole("navigation");
  expect(navbar).toBeInTheDocument();
});
