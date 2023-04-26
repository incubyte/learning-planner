import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Profile from "./Profile";

afterEach(() => {
  cleanup();
});

describe("Profile Component", () => {
  describe("Profile Header", () => {
    test("Profile header is present", () => {
      render(
        <BrowserRouter>
          <Profile />
        </BrowserRouter>
      );
      const profileHeader = screen.getByTestId("profileHeader");

      expect(profileHeader).toBeInTheDocument();
    });

    test("profile header Text is 'My Profile'", () => {
      render(
        <BrowserRouter>
          <Profile />
        </BrowserRouter>
      );
      const profileHeader = screen.getByTestId("profileHeader");

      expect(profileHeader).toHaveTextContent("My Profile");
    });
  });

  describe("Profile Image", () => {
    test("Profile Image is present", () => {
      render(
        <BrowserRouter>
          <Profile />
        </BrowserRouter>
      );
      const profileImage = screen.getByTestId("profileImage");

      expect(profileImage).toBeInTheDocument();
    });
  });

  describe("Profile Image button", () => {
    test("Profile Image Button is present", () => {
      render(
        <BrowserRouter>
          <Profile />
        </BrowserRouter>
      );
      const profileImageButton = screen.getByTestId("profileImageButton");

      expect(profileImageButton).toBeInTheDocument();
    });
  });

  describe("Profile Image Model", () => {
    test("Profile Image Model is present", async () => {
      render(
        <BrowserRouter>
          <Profile />
        </BrowserRouter>
      );
      const profileImageButton = screen.getByTestId("profileImageButton");
      await act(() => {
        fireEvent.click(profileImageButton);
      });
      const profileImageModel = screen.getByTestId("profileImageModel");
      expect(profileImageModel).toBeInTheDocument();
    });

    test("Profile Image Model file input is present", async () => {
      render(
        <BrowserRouter>
          <Profile />
        </BrowserRouter>
      );
      const profileImageButton = screen.getByTestId("profileImageButton");
      await act(() => {
        fireEvent.click(profileImageButton);
      });
      const profileImageInput = screen.getByTestId("profileImageInput");
      expect(profileImageInput).toBeInTheDocument();
    });

    test("Profile Image Model save button is present", async () => {
      render(
        <BrowserRouter>
          <Profile />
        </BrowserRouter>
      );
      const profileImageButton = screen.getByTestId("profileImageButton");
      await act(() => {
        fireEvent.click(profileImageButton);
      });
      const profileImageSave = screen.getByTestId("profileImageSave");
      expect(profileImageSave).toBeInTheDocument();
    });

    test("Profile Image Model close button is present", async () => {
      render(
        <BrowserRouter>
          <Profile />
        </BrowserRouter>
      );
      const profileImageButton = screen.getByTestId("profileImageButton");
      await act(() => {
        fireEvent.click(profileImageButton);
      });
      const profileImageClose = screen.getByTestId("profileImageClose");
      expect(profileImageClose).toBeInTheDocument();
    });
  });
  describe("Profile Labels", () => {
    test("Profile Labels is present", () => {
      render(
        <BrowserRouter>
          <Profile />
        </BrowserRouter>
      );
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

  describe("Profile Inputs", () => {
    test("Profile Inputs is present", () => {
      render(
        <BrowserRouter>
          <Profile />
        </BrowserRouter>
      );
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

  describe("Profile Courses", () => {
    test("Profile Course is present", () => {
      render(
        <BrowserRouter>
          <Profile />
        </BrowserRouter>
      );
      const profileCourse = screen.getByTestId("profileCourses");

      expect(profileCourse).toBeInTheDocument();
    });
  });
});
