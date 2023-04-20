import { cleanup, render, screen } from "@testing-library/react";
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
