import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Filter from "./Filter";
import { BrowserRouter } from "react-router-dom";
import { courseType } from "./Courses";

describe("Filter Component", () => {
  jest.setTimeout(30000);
  const getCourseByFilterMock = jest.fn();
  const getPopularCourseByFilter = jest.fn();
  const tags = [
    { id: "1", name: "Java" },
    { id: "2", name: "Python" },
    { id: "3", name: "Micronaut" },
    { id: "4", name: "Angular" },
    { id: "5", name: "Ruby" },
    { id: "6", name: "TDD" },
    { id: "7", name: "Clean code" },
    { id: "8", name: "Larvel" },
    { id: "9", name: "Php" },
  ];

  getCourseByFilterMock.mockReturnValueOnce(tags);
  getPopularCourseByFilter.mockResolvedValueOnce(tags);

  beforeEach(() => {
    jest.spyOn(window, "fetch").mockImplementation((url): any => {
      if (url === "https://backend-mu-plum.vercel.app/tag/") {
        const headers = new Headers();
        headers.set(
          "Authorization",
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVhMTI5YzA0LTRmNWItNDUwZC1hMjY5LTYwZTZlOTc5M2FlZSIsImVtYWlsIjoic2hyZXlhc0BpbmN1Ynl0ZS5jbyIsImlhdCI6MTY4MTQ2NjMzNywiZXhwIjoxNjgxNDY5OTM3fQ.qo4Ek_bgMs_4Hv1iHJLSgVP246B7Y5rAeO-hBBDK87U"
        );
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(tags),
          headers: headers,
        });
      }
    });
    getCourseByFilterMock.mockClear();
    getPopularCourseByFilter.mockClear();
  });

  test("renders the filter tags on the webPage", async () => {
    render(
      <BrowserRouter>
        <Filter
          getCourseByFilter={getCourseByFilterMock}
          getPopularCourseByFilter={getPopularCourseByFilter}
        />
      </BrowserRouter>
    );
    await waitFor(
      () => {
        expect(screen.getByRole("filterByTags")).toBeInTheDocument();
        expect(screen.getByText("Explore By Tags")).toBeInTheDocument();
      },
      { timeout: 5000 }
    );
    expect(getCourseByFilterMock).toHaveBeenCalledTimes(1);
    expect(getPopularCourseByFilter).toHaveBeenCalledTimes(1);
  });

  test("clicks tag button to filter courses by tag", async () => {
    render(
      <BrowserRouter>
        <Filter
          getCourseByFilter={getCourseByFilterMock}
          getPopularCourseByFilter={getPopularCourseByFilter}
        />
      </BrowserRouter>
    );
    await screen.findByText("Java");

    await waitFor(
      async () => {
        const tagButton = screen.queryByText(/Java/i);
        if (tagButton) {
          fireEvent.click(tagButton);
          await waitFor(
            () => {
              expect(getCourseByFilterMock).toHaveBeenCalledTimes(1);
              expect(getCourseByFilterMock).toHaveBeenCalledWith([]);
              expect(getPopularCourseByFilter).toHaveBeenCalledTimes(1);
              expect(getPopularCourseByFilter).toHaveBeenCalledWith([]);
            },
            { timeout: 5000 }
          );
        } else {
          throw new Error("Tag button not found");
        }
      },
      { timeout: 5000 }
    );
  });

  test("Displays all tags when the 'Show More' is clicked", async () => {
    const { getByText, queryByText, getByRole } = render(
      <BrowserRouter>
        <Filter
          getCourseByFilter={getCourseByFilterMock}
          getPopularCourseByFilter={getPopularCourseByFilter}
        />
      </BrowserRouter>
    );
    await waitFor(
      async () => {
        const showMoreButton = getByRole("filterByTags");

        await fireEvent.click(showMoreButton);
        expect(getByText("Explore By Tags")).toBeInTheDocument();
        expect(getByText("Java")).toBeInTheDocument();
        expect(queryByText("React")).not.toBeInTheDocument();
      },
      { timeout: 5000 }
    );
  });

  test("Displays default tags when the 'Show Less' is clicked", async () => {
    const { getByText, queryByText, getByRole } = render(
      <BrowserRouter>
        <Filter
          getCourseByFilter={getCourseByFilterMock}
          getPopularCourseByFilter={getPopularCourseByFilter}
        />
      </BrowserRouter>
    );
    await waitFor(
      () => {
        const showMoreButton = getByRole("filterByTags");
        const showLessButton = getByRole("filterByTags");
        fireEvent.click(showMoreButton);
        fireEvent.click(showLessButton);
        expect(getByText("Explore By Tags")).toBeInTheDocument();
        expect(getByText("Java")).toBeInTheDocument();
        expect(queryByText("React")).not.toBeInTheDocument();
      },
      { timeout: 5000 }
    );
  });
});