import { cleanup, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import HomeCard from "./HomeCard";

afterEach(() => {
  cleanup();
});

describe("Home Card Component", () => {
  test("header is present in HomeCard", () => {
    render(
      <BrowserRouter>
        <HomeCard
          dataTestId="userCard"
          count={3}
          header="Total Users"
          link="/users"
          linkText="See All Users"
        />
      </BrowserRouter>
    );
    const headerTest = screen.getByTestId("cardHeader") as HTMLInputElement;
    expect(headerTest).toBeInTheDocument();
  });
  test("body is present in HomeCard", () => {
    render(
      <BrowserRouter>
        <HomeCard
          dataTestId="userCard"
          count={3}
          header="Total Users"
          link="/users"
          linkText="See All Users"
        />
      </BrowserRouter>
    );
    const bodyTest = screen.getByTestId("cardBody") as HTMLInputElement;
    expect(bodyTest).toBeInTheDocument();
  });
  test("link is present in HomeCard", () => {
    render(
      <BrowserRouter>
        <HomeCard
          dataTestId="userCard"
          count={3}
          header="Total Users"
          link="/users"
          linkText="See All Users"
        />
      </BrowserRouter>
    );
    const linkTest = screen.getByTestId("cardLink") as HTMLInputElement;
    expect(linkTest).toBeInTheDocument();
  });
});
