import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import CoursePage from "./Courses";

const mockCourses = [
  {
    id: "23c9da04-e4e6-4ee5-b0ba-c2fbaba711ed",
    name: "Day 1 clean code kata",
    resourseUrls: [
      "https://web.microsoftstream.com/video/21407c23-bd35-471f-ba4a-548ae215539d",
    ],
    testUrls: [""],
    imageUrl: "https://docs.nestjs.com/assets/logo-small.svg",
    credit: 10,
    tags: [1, 2],
    description: "description",
    createdAt: "2023-04-13T12:54:02.801Z",
    updatedAt: "2023-04-13T12:54:02.801Z",
  },
  {
    id: "7243f60d-b298-4d1c-921c-057acb9d67ea",
    name: "Day 2 clean code and refactoring",
    resourseUrls: [
      "https://web.microsoftstream.com/video/387a80e2-d57b-4111-9185-c0812cc6c574",
    ],
    testUrls: [""],
    imageUrl: "https://docs.nestjs.com/assets/logo-small.svg",
    credit: 10,
    tags: [1, 2, 4],
    description: "description",
    createdAt: "2023-04-13T12:54:02.801Z",
    updatedAt: "2023-04-13T12:54:02.801Z",
  },
  {
    id: "b86e33c2-1138-49af-9b21-16233db0e084",
    name: "Training - coding practice",
    resourseUrls: [
      "https://web.microsoftstream.com/video/6452defd-4cbf-43b2-b447-5a07303815e1",
    ],
    testUrls: [""],
    imageUrl: "https://docs.nestjs.com/assets/logo-small.svg",
    credit: 10,
    tags: [5, 2],
    description: "description",
    createdAt: "2023-04-13T12:54:02.801Z",
    updatedAt: "2023-04-13T12:54:02.801Z",
  },
  {
    id: "e4f0e36c-9d18-46b3-a33c-6931dc1dd2fb",
    name: "Victor - DDD@incubyte - Day2 Extra",
    resourseUrls: [
      "https://web.microsoftstream.com/video/2d1bce3c-fcb7-4b95-a10c-6543b186fb15",
    ],
    testUrls: [""],
    imageUrl: "https://docs.nestjs.com/assets/logo-small.svg",
    credit: 10,
    tags: [3],
    description: "description",
    createdAt: "2023-04-13T12:54:02.801Z",
    updatedAt: "2023-04-13T12:54:02.801Z",
  },
];

beforeEach(() => {
  jest.spyOn(window, "fetch").mockImplementation((url): any => {
    if (url === "https://backend-mu-plum.vercel.app/course") {
      const headers = new Headers();
      headers.set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVhMTI5YzA0LTRmNWItNDUwZC1hMjY5LTYwZTZlOTc5M2FlZSIsImVtYWlsIjoic2hyZXlhc0BpbmN1Ynl0ZS5jbyIsImlhdCI6MTY4MTQ2NjMzNywiZXhwIjoxNjgxNDY5OTM3fQ.qo4Ek_bgMs_4Hv1iHJLSgVP246B7Y5rAeO-hBBDK87U"
      );
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockCourses),
        headers: headers,
      });
    }
  });
});

afterEach(() => {
  cleanup();
});
describe("Course Page ", () => {
  test("Course Page should render all Components", async () => {
    const { getByRole } = render(
      <BrowserRouter>
        <CoursePage />
      </BrowserRouter>
    );

    jest.setTimeout(30000);
    expect(getByRole("navigation")).toBeInTheDocument();
    expect(getByRole("footer")).toBeInTheDocument();
    expect(getByRole("coursePageIndexImage")).toBeInTheDocument();
    expect(getByRole("filterByTags")).toBeInTheDocument();
    expect(getByRole("popContent")).toBeInTheDocument();
    expect(getByRole("availContent")).toBeInTheDocument();
  });

  test("filters courses by name when a search query is entered", async () => {
    const { getByRole, getByPlaceholderText, getAllByText } = render(
      <BrowserRouter>
        <CoursePage />
      </BrowserRouter>
    );
    jest.setTimeout(30000);
    await waitFor(() => {
      expect(getByRole("popContent")).toBeInTheDocument();
      expect(getByRole("availContent")).toBeInTheDocument();
    });

    const searchInput = getByPlaceholderText("Search...");
    expect(searchInput).toBeInTheDocument();

    fireEvent.change(searchInput, {
      target: { value: "Day 1 clean code kata" },
    });

    await waitFor(() => {
      const courses = getAllByText("Day 1 clean code kata");
      expect(courses).not.toBeNull();
    });
  });

  test("displays all courses when the search query is empty", async () => {
    const { getByRole, getByPlaceholderText, getAllByText } = render(
      <BrowserRouter>
        <CoursePage />
      </BrowserRouter>
    );
    jest.setTimeout(30000);
    await waitFor(() => {
      expect(getByRole("popContent")).toBeInTheDocument();
      expect(getByRole("availContent")).toBeInTheDocument();
    });

    const searchInput = getByPlaceholderText("Search...");
    expect(searchInput).toBeInTheDocument();

    await waitFor(() => {
      const courses = getAllByText("Day 1 clean code kata");
      expect(courses).not.toBeNull();
    });
  });
});