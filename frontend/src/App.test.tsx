import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
const mockUser = {
  email: "john@incubyte.co",
  password: "123123123",
  id: "1",
  createdAt: Date.prototype,
  profilePhoto: "https://profilephoto.com",
  updatedAt: Date.prototype,
  eId: "E0001",
  role: "BQA",
  clientTeam: "abc",
};
const mockResponse = [
  {
    user: {
      id: "36ebe3de-10a6-4aa2-81b1-8f27468d0f10",
      eId: "E0088",
      role: "SC",
      clientTeam: "Learning Planner",
      email: "charvit@incubyte.co",
      password: "$2b$10$I0vM.YKpDT87ekNAmw8KSe3zdVkQlkpzUZo44.rZ1Od0SeWiqlCJ.",
      profilePhoto: "https://profilephoto.com",
      createdAt: Date.prototype,
      updatedAt: Date.prototype,
    },
    CompletedCourseCount: 4,
  },
  {
    user: {
      id: "2fbc0f79-a1ea-4d5e-9c02-9bfb4dac50c3",
      eId: "E0097",
      role: "SC",
      clientTeam: "Learning Planner",
      email: "shreyas@incubyte.co",
      password: "$2b$10$K.3VzQM7VVGY6pywSVKywOozqlMfwmMADiF5dXBWWj8Fn.qxG9qQW",
      profilePhoto:
        "https://res.cloudinary.com/dxepcudkt/image/upload/v1682573373/cojqoxpcgax1tkq0zi6a.jpg",
      createdAt: Date.prototype,
      updatedAt: Date.prototype,
    },
    CompletedCourseCount: 2,
  },
];
const prismaCourse1 = {
  id: "57baa1dd-5bed-4ef6-af67-e588962e3a55",
  name: "Victor - DDD@incubyte - Day1",
  resourseUrls: [
    "https://web.microsoftstream.com/video/7818e2ba-4a60-4d01-9eac-a141bdcd55e8",
  ],
  testUrls: [""],
  imageUrl: "https://docs.nestjs.com/assets/logo-small.svg",
  credit: 10,
  tags: [3],
  description: "description",
  createdAt: Date.prototype,
  updatedAt: Date.prototype,
};
const prismaCourse2 = {
  id: "7be805c9-906e-485f-86a5-0fc11cfe0e2d",
  name: "Day 1 clean code kata",
  resourseUrls: [
    "https://web.microsoftstream.com/video/21407c23-bd35-471f-ba4a-548ae215539d",
  ],
  testUrls: [""],
  imageUrl: "https://docs.nestjs.com/assets/logo-small.svg",
  credit: 10,
  tags: [1, 2],
  description: "description",
  createdAt: Date.prototype,
  updatedAt: Date.prototype,
};
const prismaCourse3 = {
  id: "1d47941f-d10f-411d-821c-32c3f27ec060",
  name: "Day 4 code design and Insights",
  resourseUrls: [
    "https://web.microsoftstream.com/video/459b7518-45bc-46b6-b9d5-0954f954aa54",
  ],
  testUrls: [""],
  imageUrl: "https://docs.nestjs.com/assets/logo-small.svg",
  credit: 10,
  tags: [7, 6],
  description: "description",
  createdAt: Date.prototype,
  updatedAt: Date.prototype,
};
const mockCourse = [prismaCourse1, prismaCourse2, prismaCourse3];
const mockCourseResponse = {
  courses: mockCourse,
  count: 3,
};
beforeAll(() => {
  jest.spyOn(window, "fetch").mockImplementation((url): any => {
    if (
      url === "https://backend-mu-plum.vercel.app/user/course?status=completed"
    ) {
      const headers = new Headers();
      headers.set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVhMTI5YzA0LTRmNWItNDUwZC1hMjY5LTYwZTZlOTc5M2FlZSIsImVtYWlsIjoic2hyZXlhc0BpbmN1Ynl0ZS5jbyIsImlhdCI6MTY4MTQ2NjMzNywiZXhwIjoxNjgxNDY5OTM3fQ.qo4Ek_bgMs_4Hv1iHJLSgVP246B7Y5rAeO-hBBDK87U"
      );
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockCourseResponse),
        headers: headers,
      });
    }
    if (
      url === "https://backend-mu-plum.vercel.app/user/course?status=active"
    ) {
      const headers = new Headers();
      headers.set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVhMTI5YzA0LTRmNWItNDUwZC1hMjY5LTYwZTZlOTc5M2FlZSIsImVtYWlsIjoic2hyZXlhc0BpbmN1Ynl0ZS5jbyIsImlhdCI6MTY4MTQ2NjMzNywiZXhwIjoxNjgxNDY5OTM3fQ.qo4Ek_bgMs_4Hv1iHJLSgVP246B7Y5rAeO-hBBDK87U"
      );
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockCourseResponse),
        headers: headers,
      });
    }
    if (url === "https://backend-mu-plum.vercel.app/user/leaderboard") {
      const headers = new Headers();
      headers.set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVhMTI5YzA0LTRmNWItNDUwZC1hMjY5LTYwZTZlOTc5M2FlZSIsImVtYWlsIjoic2hyZXlhc0BpbmN1Ynl0ZS5jbyIsImlhdCI6MTY4MTQ2NjMzNywiZXhwIjoxNjgxNDY5OTM3fQ.qo4Ek_bgMs_4Hv1iHJLSgVP246B7Y5rAeO-hBBDK87U"
      );
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
        headers: headers,
      });
    }
    if (url === "https://backend-mu-plum.vercel.app/user") {
      const headers = new Headers();
      headers.set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVhMTI5YzA0LTRmNWItNDUwZC1hMjY5LTYwZTZlOTc5M2FlZSIsImVtYWlsIjoic2hyZXlhc0BpbmN1Ynl0ZS5jbyIsImlhdCI6MTY4MTQ2NjMzNywiZXhwIjoxNjgxNDY5OTM3fQ.qo4Ek_bgMs_4Hv1iHJLSgVP246B7Y5rAeO-hBBDK87U"
      );
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockUser),
        headers: headers,
      });
    }
  });
});
test("renders App component", async () => {
  const { getByRole } = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  await waitFor(() => {
    const app = screen.getByTestId("App");
    expect(app).toBeInTheDocument();

    const footer = getByRole("footer");
    expect(footer).toBeInTheDocument();
  });
});
