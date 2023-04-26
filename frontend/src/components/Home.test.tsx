import { render,screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import HomePage from "./HomePage";
import Footer from "./utilities/Footer";

test("renders learn react link", () => {
  render(
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>
  );
  const footer = screen.getByTestId("footer");
  expect(footer).toBeInTheDocument();
});
