import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "../../css/courseDetails/courseDetails.css";
import { courseType } from "../courses/Courses";
import Navbar from "../utilities/Navbar";

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState<courseType>();
  const [tags, setTags] = useState([{ id: "1", name: "Java" }]);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const fetchCourse = async () => {
    const response = await fetch(
      "https://backend-mu-plum.vercel.app/course/getCourseById/" + id,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    if (response.ok) {
      const jsonResnponse = await response.json();
      await setCourse(jsonResnponse);
    }
  };

  const enrollCourse = async () => {
    const response = await fetch(
      "https://backend-mu-plum.vercel.app/user/course/enroll",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      }
    );

    if (response.ok) {
      toast.success("Course Enrolled!!", {
        autoClose: 2500,
        closeButton: false,
      });
      setIsEnrolled(true);
    } else {
      const jsonResponse = await response.json();
      toast.error(jsonResponse.message, {
        autoClose: 2500,
        closeButton: false,
      });
    }
  };

  const completeCourse = async () => {
    const response = await fetch(
      "https://backend-mu-plum.vercel.app/user/course/completeCourse",
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      }
    );

    if (response.ok) {
      toast.success("Course Completed!!", {
        autoClose: 2500,
        closeButton: false,
      });
      setIsCompleted(true);
    } else {
      const jsonResponse = await response.json();
      toast.error(jsonResponse.message, {
        autoClose: 2500,
        closeButton: false,
      });
    }
  };

  const fetchCourseStatus = async () => {
    const response = await fetch(
      "https://backend-mu-plum.vercel.app/user/course/status/" + id,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    if (response.ok) {
      const courseStatusResponse = await response.json();
      if (courseStatusResponse == 0) {
        setIsEnrolled(false);
        setIsCompleted(false);
      } else if (courseStatusResponse == 1) {
        setIsEnrolled(true);
        setIsCompleted(false);
      } else {
        setIsCompleted(true);
      }
    }
  };

  const fetchTags = async () => {
    const response = await fetch("https://backend-mu-plum.vercel.app/tag/", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    if (response.ok) {
      const tagsResponse = await response.json();
      setTags(tagsResponse);
    }
  };

  const authToken = localStorage.getItem("authToken");
  useEffect(() => {
    fetchCourse();
    fetchTags();
    fetchCourseStatus();
  }, []);

  return (
    <>
      <Navbar
        isCourse={true}
        isHome={true}
        isProfile={true}
        isSearch={false}
      ></Navbar>

      <div className="courseDetailsMainPage">
        <div className="courseDetailsContainer">
          <div className="courseImageDiv">
            <img
              data-testid="courseImage"
              className="courseImage"
              src={course?.imageUrl}
            ></img>
          </div>
          <div data-testid="courseName" className="courseHeader">
            {course?.name}
          </div>
          <div data-testid="courseTags" className="courseTagsDiv">
            {course?.tags.map((tag, index) => (
              <button key={index} className="courseTags">
                {tags[tag - 1]?.name}
              </button>
            ))}
          </div>
          <div className="courseDescriptionContainer">
            <div data-testid="courseDescription" className="m-12">
              <p>{course?.description}</p>
            </div>
          </div>
          {!isCompleted && (
            <div data-testid="courseButton" className="mb-4 mt-2">
              {!isEnrolled && (
                <button
                  data-testid="courseEnroll"
                  className="courseButtons"
                  onClick={enrollCourse}
                >
                  Enroll
                </button>
              )}
              {isEnrolled && (
                <button
                  data-testid="courseComplete"
                  className="courseButtons"
                  onClick={completeCourse}
                >
                  Complete Course
                </button>
              )}
            </div>
          )}
          <ToastContainer />
        </div>
      </div>
      {isEnrolled && (
        <div className="resourceContainer">
          <div className="courseResources">
            <iframe
              width="640"
              height="360"
              src={course?.resourseUrls[0]}
              allowFullScreen
              className="resourceFrame"
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseDetails;
