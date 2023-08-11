import { useState } from "react";
import Navbar from "../utilities/Navbar";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../../css/user/addUserForm.css";

export const AddUserForm = () => {
  const [email, setEmail] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [designation, setDesignation] = useState("");
  const [clientTeam, setclientTeam] = useState("");
  const [role, setRole] = useState("Employee");
  const navigator = useNavigate();
  const handleCreateUser = async () => {
    const authToken = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        "https://backend-mu-plum.vercel.app/user/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            users: [
              {
                eId: employeeId,
                role: designation,
                clientTeam: clientTeam,
                email: email,
                roles: role,
              },
            ],
          }),
        }
      );

      if (response.ok) {
        toast.success("User added", {
          autoClose: 2500,
          closeButton: false,
        });
        setTimeout(() => {
          navigator("/users");
        }, 2500);
      } else {
        if (response.status !== 400) {
          const jsonResponse = await response.json();
          toast.error(jsonResponse.message, {
            autoClose: 2500,
            closeButton: false,
          });
        } else {
          toast.error("Email must contain a incubyte domain", {
            autoClose: 2500,
            closeButton: false,
          });
        }
      }
    } catch (error) {
      toast.error("An error occurred" + error, {
        autoClose: 2500,
        closeButton: false,
      });
    }
  };

  const handleRoleChange = (event: any) => {
    setRole(event.target.value);
  };
  const handleSubmit = (event: any) => {
    handleCreateUser();
    event.preventDefault();
  };
  return (
    <>
      <Navbar
        isCourse={true}
        isHome={false}
        isProfile={false}
        isUser={true}
        isTag={false}
      ></Navbar>
      <div>
        <h1
          className="text-center pt-10 text-3xl font-bold"
          data-testid="addUserHeading"
        >
          Add User
        </h1>
      </div>
      <div className="flex justify-center">
        <form
          data-testid="formContainer"
          onSubmit={handleSubmit}
          className="AddUserContainer"
        >
          <div className="form-group mt-3">
            <label className="AddUserTextLabel text-md">Email</label>
            <input
              className="AddUserTextInput"
              data-testid="emailInput"
              type="text"
              placeholder="Enter email id"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label className="AddUserTextLabel text-md">Employee ID</label>
            <input
              className="AddUserTextInput"
              type="text"
              data-testid="employeeIdInput"
              placeholder="Enter employee id"
              required
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label className="AddUserTextLabel text-md">Designation</label>
            <input
              className="AddUserTextInput"
              type="text"
              data-testid="designationInput"
              placeholder="Enter designation"
              required
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label className="AddUserTextLabel text-md">Client Team</label>
            <input
              className="AddUserTextInput"
              type="text"
              placeholder="Enter client team"
              required
              value={clientTeam}
              onChange={(e) => setclientTeam(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label className="AddUserTextLabel text-md">Role</label>
            <div>
              <select
                name="select role"
                className="AddUserTextInput"
                required
                onChange={handleRoleChange}
              >
                <option value="Employee">Employee</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              data-testid="submitButton"
              className="AddUserSubmitButton bg-blue-500"
              type="submit"
            >
              Add User
            </button>
          </div>
        </form>
        <ToastContainer></ToastContainer>
      </div>
    </>
  );
};
