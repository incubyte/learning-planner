import { render, screen, fireEvent, act } from "@testing-library/react";
import Filter from "./Filter";
import { BrowserRouter } from "react-router-dom";

describe("Filter Component", () => {
  const getCourseByFilterMock = jest.fn();
  const tags = [
    { id: "1", name: "Java" },
    { id: "2", name: "Python" },
    { id: "3", name: "Micronaut" },
    { id: "4", name: "Angular" },
    { id: "5", name: "Ruby" },
    { id: "6", name: "TDD" },
    { id: "7", name: "Java2" },
    { id: "8", name: "Java3" },
    { id: "9", name: "Java4" },
  ];
  getCourseByFilterMock.mockReturnValueOnce(tags);

  beforeEach(() => {
    getCourseByFilterMock.mockClear();
  });

  test("renders the filter tags on the webPage", async () => {
    render(
      <BrowserRouter>
        <Filter getCourseByFilter={getCourseByFilterMock} />
      </BrowserRouter>
    );
    expect(screen.getByRole("filterByTags")).toBeInTheDocument();
    expect(screen.getByText("Explore By Tags")).toBeInTheDocument();
    expect(getCourseByFilterMock).toHaveBeenCalledTimes(1);
  });

  test("clicks tag button to filter courses by tag", async () => {
    render(
      <BrowserRouter>
        <Filter getCourseByFilter={getCourseByFilterMock} />
      </BrowserRouter>
    );
    const tagButton = screen.getByRole("button", { name: /Java/i });
    act(() => {
      fireEvent.click(tagButton);
    });

    expect(screen.getByRole("button", { name: /Java/i })).toHaveStyle(
      "color: white"
    );
    expect(getCourseByFilterMock).toHaveBeenCalledTimes(1);
    expect(getCourseByFilterMock).toBeCalledWith([]);
  });

  test("Displays all tags when the 'Show More' is clicked", () => {
    const { getByText, queryByText, getByRole } = render(
      <BrowserRouter>
        <Filter getCourseByFilter={getCourseByFilterMock} />
      </BrowserRouter>
    );
    const showMoreButton = getByRole("filterByTags");

    fireEvent.click(showMoreButton);
    expect(getByText("Explore By Tags")).toBeInTheDocument();
    expect(getByText("Java")).toBeInTheDocument();
    expect(queryByText("React")).not.toBeInTheDocument();
  });

  test("Displays default tags when the 'Show Less' is clicked", () => {
    const { getByText, queryByText, getByRole } = render(
      <BrowserRouter>
        <Filter getCourseByFilter={getCourseByFilterMock} />
      </BrowserRouter>
    );
    const showMoreButton = getByRole("filterByTags");
    const showLessButton = getByRole("filterByTags");
    fireEvent.click(showMoreButton);
    fireEvent.click(showLessButton);
    expect(getByText("Explore By Tags")).toBeInTheDocument();
    expect(getByText("Java")).toBeInTheDocument();
    expect(queryByText("React")).not.toBeInTheDocument();
  });
});
