import React, { useEffect, useState } from "react";
import Navbar from "../utilities/Navbar";
import "../../css/course/courses.css";
import "tippy.js/dist/tippy.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { courseType } from "./course";
import { Link } from "react-router-dom";

const Course = () => {
  const authToken = localStorage.getItem("authToken");
  const [getAllCourse, setGetAllCourse] = useState<courseType[]>();

  const fetchCourses = async () => {
    const response = await fetch("https://backend-mu-plum.vercel.app/course/", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    if (response && response.ok) {
      const courseResponse = await response.json();
      setGetAllCourse(courseResponse);
    }
  };

  const deleteCourses = async (id: string) => {
    const response = await fetch(
      `https://backend-mu-plum.vercel.app/course/delete/${id}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        method: "DELETE",
      }
    );
    if (response && response.ok) {
      fetchCourses();
      toast("Hurray! Course deleted Successfully 🥳🥳", {
        autoClose: 2500,
        closeButton: false,
      });
    }
  };

  const handleDelete = (id: string) => {
    deleteCourses(id);
  };

  useEffect(() => {
    fetchCourses();
  }, []);
  return (
    <>
      <Navbar
        isCourse={false}
        isHome={true}
        isProfile={true}
        isUser={false}
      ></Navbar>
      <div>
        <h1 data-testid="CourseHeading" className="courseHeading">
          List of Courses
        </h1>
      </div>
      <div className="courseContainer">
        <table data-testid="container2 table" className="courseTable">
          <thead className="courseTableHead" data-testid="tableHeading">
            <tr>
              <th scope="col" className="courseTableHeadCols">
                SrNo.
              </th>
              <th scope="col" className="courseTableHeadCols">
                Name
              </th>
              <th scope="col" className="courseTableHeadCols">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {getAllCourse?.map((course, index) => {
              return (
                <tr
                  key={index}
                  className={`${index % 2 === 1 ? "bg-gray-100" : "bg-white"}`}
                  role="row"
                >
                  <td className="courseTableRows">{index + 1}</td>
                  <td className="courseTableRows">{course.name}</td>
                  <td className="courseTableUpdateCol" data-testid="Actions">
                    <Link
                      data-testid="updateButton"
                      to="/updateCourse"
                      state={course}
                      className="courseUpdateButton"
                    >
                      Update
                    </Link>
                    <button
                      data-testid={"deleteButton" + `${course.id}`}
                      role="deleteButton"
                      className="courseDeleteButton"
                      onClick={() => handleDelete(course.id)}
                    >
                      Delete
                    </button>
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

export default Course;
