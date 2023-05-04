import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LeaderBoard from "./LeaderBoard";

describe("should render the leaderBoard component", () => {
  test("should render the titleName as The Leader Board", () => {
    render(
      <BrowserRouter>
        <LeaderBoard />
      </BrowserRouter>
    );
    const title = screen.getByTestId("leaderBoardTitle");
    expect(title).toHaveTextContent("The Leader Board");
    expect(title).toBeInTheDocument();
  });

  test("should render the container1 on the Leader Board page", () => {
    render(
      <BrowserRouter>
        <LeaderBoard />
      </BrowserRouter>
    );
    const leaderBoardContainer1 = screen.getByTestId("container1");
    const userImage = screen.getByTestId("container1 Image");
    const userInfo = screen.getByTestId("container1 user Info");
    expect(leaderBoardContainer1).toBeInTheDocument();
    expect(userImage).toHaveAttribute("alt", "user image");
    expect(userImage).toBeInTheDocument();
    expect(userInfo).toBeInTheDocument();
    expect(userInfo).toHaveTextContent("Email");
    expect(userInfo).toHaveTextContent("Rank");
    expect(userInfo).toHaveTextContent("Role");
    expect(userInfo).toHaveTextContent("Credits");
  });

  test("should render the container2 on the Leader Board page", () => {
    render(
      <BrowserRouter>
        <LeaderBoard />
      </BrowserRouter>
    );

    const leaderBoardContainer2 = screen.getByTestId("container2");
    const table = screen.getByTestId("container2 table");
    expect(leaderBoardContainer2).toBeInTheDocument();
    expect(table).toBeInTheDocument();
    expect(table).toHaveTextContent("Email");
    expect(table).toHaveTextContent("Rank");
    expect(table).toHaveTextContent("Role");
    expect(table).toHaveTextContent("Credits");
  });

  test("should render the carousel for active courses", () => {
    render(
      <BrowserRouter>
        <LeaderBoard />
      </BrowserRouter>
    );
    const activeCoursesCarousel = screen.getByRole("activeContent");
    expect(activeCoursesCarousel).toBeInTheDocument();
  });
});
