import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import HomePage from "./HomePage";

test("renders learn react link", () => {
  render(
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>
  );
});
