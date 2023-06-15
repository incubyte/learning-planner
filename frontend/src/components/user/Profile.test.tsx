import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Profile from "./Profile";

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
  Role: "Employee",
};
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
beforeEach(() => {
  jest.spyOn(window, "fetch").mockImplementation((url): any => {
    if (url === "https://backend-mu-plum.vercel.app/user/course") {
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

describe("Profile Component", () => {
  test("Profile header is present", async () => {
    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    );
    await waitFor(() => {
      const profileHeader = screen.getByTestId("profileHeader");
      expect(profileHeader).toBeInTheDocument();
    });
  });

  test("profile header Text is 'My Profile'", async () => {
    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    );
    await waitFor(() => {
      const profileHeader = screen.getByTestId("profileHeader");

      expect(profileHeader).toHaveTextContent("My Profile");
    });
  });

  test("Profile Image is present", async () => {
    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    );
    await waitFor(() => {
      const profileImage = screen.getByTestId("profileImage");

      expect(profileImage).toBeInTheDocument();
    });
  });

  test("Profile Image Button is present", async () => {
    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    );
    await waitFor(() => {
      const profileImageButton = screen.getByTestId("profileImageButton");

      expect(profileImageButton).toBeInTheDocument();
    });
  });

  test("Profile Image Model is present", async () => {
    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    );
    await waitFor(async () => {
      const profileImageButton = screen.getByTestId("profileImageButton");
      fireEvent.click(profileImageButton);
    });
    await waitFor(() => {
      const profileImageModel = screen.getByTestId("profileImageModel");
      expect(profileImageModel).toBeInTheDocument();
    });
  });

  test("Profile Image Model file input is present", async () => {
    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    );
    await waitFor(async () => {
      const profileImageButton = screen.getByTestId("profileImageButton");
      fireEvent.click(profileImageButton);
    });
    await waitFor(() => {
      const profileImageInput = screen.getByTestId("profileImageInput");
      expect(profileImageInput).toBeInTheDocument();
    });
  });

  test("Profile Image Model save button is present", async () => {
    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    );
    await waitFor(async () => {
      const profileImageButton = screen.getByTestId("profileImageButton");
      fireEvent.click(profileImageButton);
    });
    await waitFor(() => {
      const profileImageSave = screen.getByTestId("profileImageSave");
      expect(profileImageSave).toBeInTheDocument();
    });
  });

  test("Profile Image Model close button is present", async () => {
    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    );
    await waitFor(async () => {
      const profileImageButton = screen.getByTestId("profileImageButton");
      fireEvent.click(profileImageButton);
    });
    await waitFor(() => {
      const profileImageClose = screen.getByTestId("profileImageClose");
      expect(profileImageClose).toBeInTheDocument();
    });
  });

  test("Profile Labels is present", async () => {
    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    );
    await waitFor(() => {
      const profileEmailLabel = screen.getByTestId("profileEmailLabel");
      expect(profileEmailLabel).toBeInTheDocument();

      const profileEidLabel = screen.getByTestId("profileEidLabel");
      expect(profileEidLabel).toBeInTheDocument();

      const profileClientTeamLabel = screen.getByTestId(
        "profileClientTeamLabel"
      );
      expect(profileClientTeamLabel).toBeInTheDocument();

      const profileRoleLabel = screen.getByTestId("profileRoleLabel");
      expect(profileRoleLabel).toBeInTheDocument();

      const profileCreditLabel = screen.getByTestId("profileCreditLabel");
      expect(profileCreditLabel).toBeInTheDocument();

      const profileTotalCourseLabel = screen.getByTestId(
        "profileTotalCourseLabel"
      );
      expect(profileTotalCourseLabel).toBeInTheDocument();
    });
  });

  test("Profile Inputs is present", async () => {
    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    );
    await waitFor(() => {
      const profileEmailInput = screen.getByTestId("profileEmailInput");
      expect(profileEmailInput).toBeInTheDocument();

      const profileEidInput = screen.getByTestId("profileEidInput");
      expect(profileEidInput).toBeInTheDocument();

      const profileClientTeamInput = screen.getByTestId(
        "profileClientTeamInput"
      );
      expect(profileClientTeamInput).toBeInTheDocument();

      const profileRoleInput = screen.getByTestId("profileRoleInput");
      expect(profileRoleInput).toBeInTheDocument();

      const profileCreditInput = screen.getByTestId("profileCreditInput");
      expect(profileCreditInput).toBeInTheDocument();

      const profileTotalCourseInput = screen.getByTestId(
        "profileTotalCourseInput"
      );
      expect(profileTotalCourseInput).toBeInTheDocument();
    });
  });

  test("Profile Course is present", async () => {
    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    );
    await waitFor(() => {
      const profileCourse = screen.getByTestId("profileCourses");

      expect(profileCourse).toBeInTheDocument();
    });
  });
});
