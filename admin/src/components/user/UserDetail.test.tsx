import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import UserDetail from "./UserDetail";
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
beforeEach(() => {
  jest.spyOn(window, "fetch").mockImplementation((url): any => {
    if (url === "https://backend-mu-plum.vercel.app/user/getUser/1") {
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

afterEach(() => {
  cleanup();
});

describe("UserDetail Component", () => {
  describe("UserDetail Image", () => {
    test("UserDetail Image is present", async () => {
      render(
        <BrowserRouter>
          <UserDetail />
        </BrowserRouter>
      );
      await waitFor(() => {
        const userDetailImage = screen.getByTestId("UserDetailImage");

        expect(userDetailImage).toBeInTheDocument();
      });
    });
  });

  describe("UserDetail Image button", () => {
    test("UserDetail Image Button is present", async () => {
      render(
        <BrowserRouter>
          <UserDetail />
        </BrowserRouter>
      );
      await waitFor(() => {
        const userDetailImageButton = screen.getByTestId(
          "UserDetailImageButton"
        );

        expect(userDetailImageButton).toBeInTheDocument();
      });
    });
  });

  describe("UserDetail Image Model", () => {
    test("UserDetail Image Model is present", async () => {
      render(
        <BrowserRouter>
          <UserDetail />
        </BrowserRouter>
      );
      await waitFor(async () => {
        const userDetailImageButton = screen.getByTestId(
          "UserDetailImageButton"
        );
        await act(() => {
          fireEvent.click(userDetailImageButton);
        });
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
      await waitFor(async () => {
        const userDetailImageButton = screen.getByTestId(
          "UserDetailImageButton"
        );
        await act(() => {
          fireEvent.click(userDetailImageButton);
        });
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
      await waitFor(async () => {
        const userDetailImageButton = screen.getByTestId(
          "UserDetailImageButton"
        );
        await act(() => {
          fireEvent.click(userDetailImageButton);
        });
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
      await waitFor(async () => {
        const userDetailImageButton = screen.getByTestId(
          "UserDetailImageButton"
        );
        await act(() => {
          fireEvent.click(userDetailImageButton);
        });
      });
      const userDetailImageClose = screen.getByTestId("UserDetailImageClose");
      expect(userDetailImageClose).toBeInTheDocument();
    });
  });
  describe("UserDetail Labels", () => {
    test("UserDetail Labels is present", async () => {
      render(
        <BrowserRouter>
          <UserDetail />
        </BrowserRouter>
      );
      await waitFor(() => {
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
  });

  describe("UserDetail Inputs", () => {
    test("UserDetail Inputs is present", async () => {
      render(
        <BrowserRouter>
          <UserDetail />
        </BrowserRouter>
      );
      await waitFor(() => {
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
});
