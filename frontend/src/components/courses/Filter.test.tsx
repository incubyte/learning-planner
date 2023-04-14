import {
  cleanup,
  fireEvent,
  getByText,
  render,
  screen,
} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Filter from "./Filter";

afterEach(() => {
  cleanup();
});

describe("Filter", () => {
  const tags = [
    "Java",
    "Python",
    "Micronaut",
    "Java1",
    "Python2",
    "Micronaut2",
    "Java2",
    "Python3",
    "Micronaut3",
  ];
  test("renders the filter component", () => {
    const { getByText, queryByText } = render(
      <BrowserRouter>
        <Filter tags={tags} />
      </BrowserRouter>
    );

    expect(getByText("Explore By Tags")).toBeInTheDocument();
    expect(getByText("Java")).toBeInTheDocument();
    expect(getByText("Python3")).toBeInTheDocument();
    expect(queryByText("Micronaut3")).toBeNull();
    expect(queryByText("React")).not.toBeInTheDocument();
  });
  test("Displays all tags when the 'Show More' is clicked", () => {
    const { getByText, queryByText } = render(
      <BrowserRouter>
        <Filter tags={tags} />
      </BrowserRouter>
    );
    fireEvent.click(getByText("Show More"));
    expect(getByText("Explore By Tags")).toBeInTheDocument();
    expect(getByText("Java")).toBeInTheDocument();
    expect(getByText("Python3")).toBeInTheDocument();
    expect(getByText("Micronaut3")).toBeInTheDocument();
    expect(queryByText("React")).not.toBeInTheDocument();
  });

  test("Displays default tags when the 'Show Less' is clicked", () => {
    const { getByText, queryByText } = render(
      <BrowserRouter>
        <Filter tags={tags} />
      </BrowserRouter>
    );
    fireEvent.click(getByText("Show More"));
    fireEvent.click(getByText("Show Less"));
    expect(getByText("Explore By Tags")).toBeInTheDocument();
    expect(getByText("Java")).toBeInTheDocument();
    expect(getByText("Python3")).toBeInTheDocument();
    expect(queryByText("Micronaut3")).toBeNull();
    expect(queryByText("React")).not.toBeInTheDocument();
  });
});
