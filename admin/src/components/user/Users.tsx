import { useEffect, useState } from "react";
import Navbar from "../utilities/Navbar";
import { userType } from "./user";

const Users = () => {
  const [allUsers, setAllUsers] = useState<userType[]>();
  const authToken = localStorage.getItem("authToken");
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
    fetchUsers();
  }, []);
  return (
    <>
      <Navbar
        isCourse={true}
        isHome={true}
        isProfile={true}
        isUser={false}
      ></Navbar>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-10">
        <table
          data-testid="UsersTable"
          className="w-full table text-center text-base border border-gray-400 bg-white rounded-b-lg rounded-lg justify-center align-middle p-5"
        >
          <thead className="text-gray-700 uppercase bg-gray-200">
            <tr>
              <th scope="col" className="border border-gray-100 p-5 m-5">
                EId
              </th>
              <th scope="col" className="border border-gray-100 p-5 m-5">
                Email
              </th>
              <th scope="col" className="border border-gray-100 p-5 m-5">
                Designation
              </th>
              <th scope="col" className="border border-gray-100 p-5 m-5">
                Role
              </th>
              <th scope="col" className="border border-gray-100 p-5 m-5">
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
                  <td scope="row" className="border border-gray-100 p-5 m-5">
                    {user.eId}
                  </td>
                  <td className="border border-gray-100 p-5 m-5">
                    {user.email}
                  </td>
                  <td className="border border-gray-100 p-5 m-5">
                    {user.role}
                  </td>
                  <td className="border border-gray-100 p-5 m-5">
                    {user.roles}
                  </td>
                  <td className="border border-gray-100 p-5 m-5">
                    <a
                      href={"user/" + user.id}
                      className="font-medium text-blue-600 hover:underline"
                    >
                      Info
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
