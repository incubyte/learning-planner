import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "../../css/courseDetails/courseDetails.css";
import { courseType } from "../courses/Courses";
import Navbar from "../utilities/Navbar";
import ContentLoader from "react-content-loader";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState<courseType>();
  const [tags, setTags] = useState([{ id: 1, name: "Java" }]);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCourseTag = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/course/getTagsByCourseId/" + id,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response && response.ok) {
        const jsonResnponse = await response.json();
        await setTags(jsonResnponse);
      }
    } catch (error) {
      toast.error("An error occurred" + error, {
        autoClose: 2500,
        closeButton: false,
      });
    }
  };
  const fetchCourse = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/course/getCourseById/" + id,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response && response.ok) {
        const jsonResnponse = await response.json();
        await setCourse(jsonResnponse);
      }
    } catch (error) {
      toast.error("An error occurred" + error, {
        autoClose: 2500,
        closeButton: false,
      });
    }
  };

  const enrollCourse = async () => {
    try {
      const response = await fetch("http://localhost:5000/user/course/enroll", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });

      if (response && response.ok) {
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
    } catch (error) {
      toast.error("An error occurred" + error, {
        autoClose: 2500,
        closeButton: false,
      });
    }
  };

  const completeCourse = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/user/course/completeCourse",
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: id }),
        }
      );

      if (response && response.ok) {
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
    } catch (error) {
      toast.error("An error occurred" + error, {
        autoClose: 2500,
        closeButton: false,
      });
    }
  };

  const fetchCourseStatus = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/user/course/status/" + id,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response && response.ok) {
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
      } else {
        toast.error("course not found");
      }
    } catch (error) {
      toast.error("An error occurred" + error, {
        autoClose: 2500,
        closeButton: false,
      });
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    await setTimeout(async () => {
      await Promise.all([fetchCourse(), fetchCourseStatus(), fetchCourseTag()]);
      setIsLoading(false);
    }, 5000);
  };

  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    fetchData();
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
            {isLoading ? (
              <>
                <div className="block lg:block md:hidden sm:hidden xsm:hidden">
                  <Skeleton
                    baseColor="#E5E4E2"
                    highlightColor="#ebebeb"
                    circle={true}
                    height={180}
                    width={180}
                  />
                </div>
                <div className="hidden md:block lg:hidden sm:hidden xsm:hidden">
                  <Skeleton
                    baseColor="#E5E4E2"
                    highlightColor="#ebebeb"
                    circle={true}
                    height={150}
                    width={150}
                  />
                </div>
                <div className="hidden sm:block lg:hidden md:hidden xsm:block">
                  <Skeleton
                    baseColor="#E5E4E2"
                    highlightColor="#ebebeb"
                    circle={true}
                    height={100}
                    width={100}
                  />
                </div>
              </>
            ) : (
              <>
                <img
                  data-testid="courseImage"
                  className="courseImage"
                  src={course?.imageUrl}
                ></img>
              </>
            )}
          </div>
          <div data-testid="courseName" className="courseHeader">
            {isLoading ? (
              <>
                <div className="block lg:block md:block sm:hidden xsm:hidden">
                  <Skeleton
                    baseColor="#E5E4E2"
                    highlightColor="#ebebeb"
                    height={50}
                    width={350}
                  />
                </div>
                <div className="hidden sm:block lg:hidden md:hidden xsm:block">
                  <Skeleton
                    baseColor="#E5E4E2"
                    highlightColor="#ebebeb"
                    height={70}
                    width={200}
                  />
                </div>
              </>
            ) : (
              <>{course?.name}</>
            )}
          </div>
          <div data-testid="courseTags" className="courseTagsDiv">
            {isLoading ? (
              <>
                <div className="block lg:block md:block sm:hidden xsm:hidden">
                  <Skeleton
                    baseColor="#E5E4E2"
                    highlightColor="#ebebeb"
                    height={40}
                    width={150}
                  />
                </div>
                <div className="hidden sm:block lg:hidden md:hidden xsm:block">
                  <Skeleton
                    baseColor="#E5E4E2"
                    highlightColor="#ebebeb"
                    height={30}
                    width={100}
                  />
                </div>
              </>
            ) : (
              <>
                {tags.map((tag, index) => (
                  <button key={index} className="courseTags">
                    {tag.name}
                  </button>
                ))}
              </>
            )}
          </div>
          <div className="courseDescriptionContainer">
            <div data-testid="courseDescription" className="m-12">
              {isLoading ? (
                <Skeleton
                  baseColor="#f5f5f5"
                  highlightColor="#ebebeb"
                  height={200}
                />
              ) : (
                <>
                  <p>{course?.description}</p>
                </>
              )}
            </div>
          </div>
          {!isCompleted && (
            <div data-testid="courseButton" className="mb-4 mt-2">
              {!isEnrolled && (
                <>
                  {isLoading ? (
                    <Skeleton
                      baseColor="f5f5f5"
                      highlightColor="#ebebeb"
                      height={50}
                      width={100}
                    />
                  ) : (
                    <>
                      <button
                        data-testid="courseEnroll"
                        className="courseButtons"
                        onClick={enrollCourse}
                      >
                        Enroll
                      </button>
                    </>
                  )}
                </>
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
      {(isEnrolled || isCompleted) && (
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
