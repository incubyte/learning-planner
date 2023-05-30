import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import UserDetail from "./UserDetail";

afterEach(() => {
  cleanup();
});

describe("UserDetail Component", () => {
  describe("UserDetail Image", () => {
    test("UserDetail Image is present", () => {
      render(
        <BrowserRouter>
          <UserDetail />
        </BrowserRouter>
      );
      const userDetailImage = screen.getByTestId("UserDetailImage");

      expect(userDetailImage).toBeInTheDocument();
    });
  });

  describe("UserDetail Image button", () => {
    test("UserDetail Image Button is present", () => {
      render(
        <BrowserRouter>
          <UserDetail />
        </BrowserRouter>
      );
      const userDetailImageButton = screen.getByTestId("UserDetailImageButton");

      expect(userDetailImageButton).toBeInTheDocument();
    });
  });

  describe("UserDetail Image Model", () => {
    test("UserDetail Image Model is present", async () => {
      render(
        <BrowserRouter>
          <UserDetail />
        </BrowserRouter>
      );
      const userDetailImageButton = screen.getByTestId("UserDetailImageButton");
      await act(() => {
        fireEvent.click(userDetailImageButton);
      });
      const userDetailImageModel = screen.getByTestId("UserDetailImageModel");
      expect(userDetailImageModel).toBeInTheDocument();
    });

    test("UserDetail Image Model file input is present", async () => {
      render(
        <BrowserRouter>
          <UserDetail />
        </BrowserRouter>
      );
      const userDetailImageButton = screen.getByTestId("UserDetailImageButton");
      await act(() => {
        fireEvent.click(userDetailImageButton);
      });
      const userDetailImageInput = screen.getByTestId("UserDetailImageInput");
      expect(userDetailImageInput).toBeInTheDocument();
    });

    test("UserDetail Image Model save button is present", async () => {
      render(
        <BrowserRouter>
          <UserDetail />
        </BrowserRouter>
      );
      const userDetailImageButton = screen.getByTestId("UserDetailImageButton");
      await act(() => {
        fireEvent.click(userDetailImageButton);
      });
      const userDetailImageSave = screen.getByTestId("UserDetailImageSave");
      expect(userDetailImageSave).toBeInTheDocument();
    });

    test("UserDetail Image Model close button is present", async () => {
      render(
        <BrowserRouter>
          <UserDetail />
        </BrowserRouter>
      );
      const userDetailImageButton = screen.getByTestId("UserDetailImageButton");
      await act(() => {
        fireEvent.click(userDetailImageButton);
      });
      const userDetailImageClose = screen.getByTestId("UserDetailImageClose");
      expect(userDetailImageClose).toBeInTheDocument();
    });
  });
  describe("UserDetail Labels", () => {
    test("UserDetail Labels is present", () => {
      render(
        <BrowserRouter>
          <UserDetail />
        </BrowserRouter>
      );
      const userDetailEmailLabel = screen.getByTestId("UserDetailEmailLabel");
      expect(userDetailEmailLabel).toBeInTheDocument();

      const userDetailEidLabel = screen.getByTestId("UserDetailEidLabel");
      expect(userDetailEidLabel).toBeInTheDocument();

      const userDetailRoleLabel = screen.getByTestId("UserDetailRoleLabel");
      expect(userDetailRoleLabel).toBeInTheDocument();

      const userDetailDesignationLabel = screen.getByTestId(
        "UserDetailDesignationLabel"
      );
      expect(userDetailDesignationLabel).toBeInTheDocument();

      const userDetailClientTeamLabel = screen.getByTestId(
        "UserDetailClientTeamLabel"
      );
      expect(userDetailClientTeamLabel).toBeInTheDocument();
    });
  });

  describe("UserDetail Inputs", () => {
    test("UserDetail Inputs is present", () => {
      render(
        <BrowserRouter>
          <UserDetail />
        </BrowserRouter>
      );
      const userDetailEmailInput = screen.getByTestId("UserDetailEmailInput");
      expect(userDetailEmailInput).toBeInTheDocument();

      const userDetailEidInput = screen.getByTestId("UserDetailEidInput");
      expect(userDetailEidInput).toBeInTheDocument();

      const userDetailRoleInput = screen.getByTestId("UserDetailRoleInput");
      expect(userDetailRoleInput).toBeInTheDocument();

      const userDetailDesignationInput = screen.getByTestId(
        "UserDetailDesignationInput"
      );
      expect(userDetailDesignationInput).toBeInTheDocument();

      const userDetailClientTeamInput = screen.getByTestId(
        "UserDetailClientTeamInput"
      );
      expect(userDetailClientTeamInput).toBeInTheDocument();
    });
  });
});
