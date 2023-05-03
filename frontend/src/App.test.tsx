import { render, screen } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

test("renders App component", () => {
  const { getByRole } = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const app = screen.getByTestId("App");
  expect(app).toBeInTheDocument();

  const footer = getByRole("footer");
  expect(footer).toBeInTheDocument();
});
