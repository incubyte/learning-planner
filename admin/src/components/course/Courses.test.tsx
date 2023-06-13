import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import Courses from "./Courses";

jest.mock("react-toastify", () => ({
  ToastContainer: jest.fn(),
  toast: jest.fn(),
}));

beforeEach(() => {
  jest.spyOn(window, "fetch").mockImplementation((url): any => {
    if (url === "https://backend-mu-plum.vercel.app/course/") {
      const headers = new Headers();
      headers.set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVhMTI5YzA0LTRmNWItNDUwZC1hMjY5LTYwZTZlOTc5M2FlZSIsImVtYWlsIjoic2hyZXlhc0BpbmN1Ynl0ZS5jbyIsImlhdCI6MTY4MTQ2NjMzNywiZXhwIjoxNjgxNDY5OTM3fQ.qo4Ek_bgMs_4Hv1iHJLSgVP246B7Y5rAeO-hBBDK87U"
      );
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            {
              createdAt: "2023-05-19T05:45:11.490Z",
              credit: 10,
              description: "description",
              id: "1",
              imageUrl: "https://docs.nestjs.com/assets/logo-small.svg",
              name: "Course1",
              resourseUrls: [
                "https://web.microsoftstream.com/embed/video/387a80…11-9185-c0812cc6c574?autoplay=false&showinfo=true",
              ],
              tags: [1, 2, 4],
              testUrls: [""],
              updatedAt: "2023-05-19T05:45:11.490Z",
            },
            {
              createdAt: "2023-05-19T05:45:11.490Z",
              credit: 10,
              description: "description",
              id: "2",
              imageUrl: "https://docs.nestjs.com/assets/logo-small.svg",
              name: "Day 2 clean code and refactoring",
              resourseUrls: [
                "https://web.microsoftstream.com/embed/video/387a80…11-9185-c0812cc6c574?autoplay=false&showinfo=true",
              ],
              tags: [1, 2, 4],
              testUrls: [""],
              updatedAt: "2023-05-19T05:45:11.490Z",
            },
          ]),
        headers: headers,
      });
    }
  });
});

afterEach(() => {
  cleanup();
  localStorage.removeItem("authToken");
});

function sleep(ms: any) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe("Display Course Page ", () => {
  jest.setTimeout(30000);
  test("should display the course list", async () => {
    const { getByTestId, getAllByTestId, getByRole, getAllByRole } = render(
      <BrowserRouter>
        <Courses />
      </BrowserRouter>
    );

    await waitFor(
      async () => {
        const loadingIndicator = screen.getByTestId("LoadingScreen");
        if (loadingIndicator.ATTRIBUTE_NODE > 0) {
          await sleep(7000);
        }
      },
      { timeout: 10000 }
    );
    sleep(10000);
    const authToken = localStorage.getItem("authToken");
    expect(getByRole("navigation")).toBeInTheDocument();
    expect(getByTestId("CourseHeading")).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "https://backend-mu-plum.vercel.app/course/",
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    expect(getByTestId("tableHeading")).toBeInTheDocument();
    await waitFor(() => {
      const courseRows = getAllByRole("row");
      expect(courseRows.length).toBe(3);

      const actionsElements = getAllByTestId("Actions");
      expect(actionsElements.length).toBe(2);
    });
  });

  test("display delete button", async () => {
    const { getByTestId, getAllByTestId } = render(
      <BrowserRouter>
        <Courses />
      </BrowserRouter>
    );

    jest.setTimeout(30000);
    await waitFor(() => getByTestId("container2 table"));

    await waitFor(() => {
      const deleteButtons1 = getAllByTestId("deleteButton1");
      expect(deleteButtons1.length).toBe(1);
      const deleteButtons2 = getAllByTestId("deleteButton2");
      expect(deleteButtons2.length).toBe(1);
    });
  });

  test("delete Operation", async () => {
    const { getAllByTestId } = render(
      <BrowserRouter>
        <Courses />
      </BrowserRouter>
    );
    jest.setTimeout(30000);
    await waitFor(() => {
      fireEvent.click(getAllByTestId("deleteButton1")[0]);
    });
  });

  test("display update button", async () => {
    const { getByTestId, getAllByTestId } = render(
      <BrowserRouter>
        <Courses />
      </BrowserRouter>
    );

    jest.setTimeout(30000);
    await waitFor(() => getByTestId("container2 table"));

    await waitFor(() => {
      const updateButtons = getAllByTestId("updateButton");
      expect(updateButtons.length).toBe(2);
    });
  });
});
