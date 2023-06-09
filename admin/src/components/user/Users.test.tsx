import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Users from "./Users";
const mockUsers = [
  {
    email: "john1@incubyte.co",
    password: "123123123",
    id: "1",
    createdAt: Date.prototype,
    profilePhoto: "https://profilephoto.com",
    updatedAt: Date.prototype,
    eId: "E00",
    role: "BQA",
    clientTeam: "abc",
    Role: "Employee",
  },
  {
    email: "john2@incubyte.co",
    password: "123123123",
    id: "2",
    createdAt: Date.prototype,
    profilePhoto: "https://profilephoto.com",
    updatedAt: Date.prototype,
    eId: "E01",
    role: "BQA",
    clientTeam: "abc",
    Role: "Employee",
  },
];
beforeEach(() => {
  jest.spyOn(window, "fetch").mockImplementation((url): any => {
    if (url === "https://backend-mu-plum.vercel.app/user/all") {
      const headers = new Headers();
      headers.set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVhMTI5YzA0LTRmNWItNDUwZC1hMjY5LTYwZTZlOTc5M2FlZSIsImVtYWlsIjoic2hyZXlhc0BpbmN1Ynl0ZS5jbyIsImlhdCI6MTY4MTQ2NjMzNywiZXhwIjoxNjgxNDY5OTM3fQ.qo4Ek_bgMs_4Hv1iHJLSgVP246B7Y5rAeO-hBBDK87U"
      );
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockUsers),
        headers: headers,
      });
    }
  });
});

afterEach(() => {
  cleanup();
});

describe("Users Component", () => {
  describe("User Table", () => {
    test("User Table is present", async () => {
      render(
        <BrowserRouter>
          <Users />
        </BrowserRouter>
      );
      await waitFor(() => {
        const usersTable = screen.getByTestId("UsersTable");

        expect(usersTable).toBeInTheDocument();
      });
    });
  });
});
