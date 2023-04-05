import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import HomePage from "./HomePage";

test("renders learn react link", () => {
  render(
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>
  );
  const linkElement = screen.getByText(/HomePage/i);
  expect(linkElement).toBeInTheDocument();
});
