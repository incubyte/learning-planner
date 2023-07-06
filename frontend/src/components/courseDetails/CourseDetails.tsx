import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "../../css/courseDetails/courseDetails.css";
import { courseType } from "../courses/Courses";
import Navbar from "../utilities/Navbar";
import ContentLoader from "react-content-loader";

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
        "https://backend-mu-plum.vercel.app/course/getTagsByCourseId/" + id,
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
        "https://backend-mu-plum.vercel.app/course/getCourseById/" + id,
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
        "https://backend-mu-plum.vercel.app/user/course/status/" + id,
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

    await Promise.all([fetchCourse(), fetchCourseStatus(), fetchCourseTag()]);
    setIsLoading(false);
  };

  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    fetchData();
  }, []);

  return isLoading ? (
    <>
      <Navbar
        isCourse={true}
        isHome={true}
        isProfile={true}
        isSearch={false}
      ></Navbar>
      <div className="hidden lg:block md:block">
        <ContentLoader viewBox="0 0 350 260">
          <rect x="12" y="12" rx="2" ry="2" width="330" height="136" />
          <rect x="90" y="160" rx="2" ry="2" width="180" height="100" />
        </ContentLoader>
      </div>
      <div className="lg:hidden md:hidden sm:block xsm:block">
        <ContentLoader viewBox="0 0 350 600">
          <rect x="35" y="35" rx="5" ry="5" width="280" height="336" />
          <rect x="30" y="400" rx="5" ry="5" width="290" height="200" />
        </ContentLoader>
      </div>
    </>
  ) : (
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
            {tags.map((tag, index) => (
              <button key={index} className="courseTags">
                {tag.name}
              </button>
            ))}
          </div>
          <div className="courseDescriptionContainer">
            <div data-testid="courseDescription" className="m-12">
              {/* <p>{course?.description}</p> */}
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque
                voluptas consequatur impedit vitae unde accusantium at odit iste
                molestiae dicta? Quibusdam quisquam veniam perspiciatis!
                Officiis aliquid aspernatur, cumque necessitatibus vitae
                doloribus a pariatur maxime mollitia at eveniet itaque
                architecto consequuntur quisquam ullam magni quae exercitationem
                atque maiores et iste reiciendis? Minima, optio. Eos molestiae
                veniam ut itaque quibusdam aliquam numquam excepturi et velit,
                totam ab, aut sapiente minus, modi a! Molestias praesentium aut
                debitis ut magnam dolor cupiditate tempore. Eligendi ab quod
                iste hic. Vero laudantium ex quod exercitationem, distinctio
                culpa sint quas repellat possimus provident assumenda iste
                veritatis voluptas?
              </p>
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
