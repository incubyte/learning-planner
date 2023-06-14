import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "tippy.js/dist/tippy.css";
import "../../css/course/courses.css";
import LoadingScreen from "../utilities/LoadingScreen";
import Navbar from "../utilities/Navbar";
import { courseType } from "./course";

const Course = () => {
  const authToken = localStorage.getItem("authToken");
  const [getAllCourse, setGetAllCourse] = useState<courseType[]>();
  const [isLoading, setIsLoading] = useState(true);

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
      toast.success("Course deleted Successfully", {
        autoClose: 2500,
        closeButton: false,
      });
    }
  };

  const handleDelete = (id: string) => {
    deleteCourses(id);
  };

  const fetchData = async () => {
    setIsLoading(true);

    await Promise.all([fetchCourses()]);

    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return isLoading ? (
    <LoadingScreen />
  ) : (
    <>
      <Navbar
        isCourse={false}
        isHome={true}
        isProfile={true}
        isUser={true}
        isTag={false}
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
