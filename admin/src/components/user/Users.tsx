import { useEffect, useState } from "react";
import Navbar from "../utilities/Navbar";
import { userType } from "./user";
import "../../css/user/allUser.css";
import LoadingScreen from "../utilities/LoadingScreen";

const Users = () => {
  const [allUsers, setAllUsers] = useState<userType[]>();
  const authToken = localStorage.getItem("authToken");
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = async () => {
    const response = await fetch(
      "https://backend-mu-plum.vercel.app/user/all",
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    if (response.ok) {
      const fetchUsers = await response.json();
      setAllUsers(fetchUsers);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      await Promise.all([fetchUsers()]);

      setIsLoading(false);
    };

    fetchData();
  }, []);
  return isLoading ? (
    <LoadingScreen />
  ) : (
    <>
      <Navbar
        isCourse={true}
        isHome={true}
        isProfile={true}
        isUser={false}
      ></Navbar>
      <div className="UsersContainer">
        <table data-testid="UsersTable" className="UsersTable">
          <thead className="UsersTableHead">
            <tr>
              <th scope="col" className="UsersTableHeadCols">
                EId
              </th>
              <th scope="col" className="UsersTableHeadCols">
                Email
              </th>
              <th scope="col" className="UsersTableHeadCols">
                Designation
              </th>
              <th scope="col" className="UsersTableHeadCols">
                Role
              </th>
              <th scope="col" className="UsersTableHeadCols">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {allUsers?.map((user, index) => {
              return (
                <tr
                  key={index}
                  className={`${index % 2 === 1 ? "bg-gray-100" : "bg-white"}`}
                  role="row"
                >
                  <td className="UsersTableRows">{user.eId}</td>
                  <td className="UsersTableRows">{user.email}</td>
                  <td className="UsersTableRows">{user.role}</td>
                  <td className="UsersTableRows">{user.roles}</td>
                  <td className="UsersTableUpdateCol">
                    <a
                      href={"user/" + user.id}
                      className="font-medium hover:underline"
                    >
                      <img
                        className="h-8 w-8"
                        src="https://res.cloudinary.com/dxepcudkt/image/upload/v1685424291/edit-svgrepo-com_hkhijf.svg"
                      ></img>
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Users;
