import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
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
      console.log(jsonResnponse);
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
  const fetchTags = async () => {
    const response = await fetch("https://backend-mu-plum.vercel.app/tag/", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    if (response && response.ok) {
      const tagsResponse = await response.json();
      setTags(tagsResponse);
    }
  };

  const authToken = localStorage.getItem("authToken");
  useEffect(() => {
    fetchCourse();
    fetchTags();
  }, []);

  return (
    <>
      <Navbar
        isCourse={true}
        isHome={true}
        isProfile={true}
        isSearch={false}
      ></Navbar>

      <div className="grid justify-items-center content-center object-contain p-10">
        <div className="container grid justify-items-center content-center object-contain bg-slate-100 rounded-lg max-w-full">
          <div className="relative mt-5">
            <img
              data-testid="courseImage"
              className="rounded-full lg:h-40 md:h-36 sm:h-24 xsm:h-24 lg:w-40 md:w-36 sm:w-24 xsm:w-24 block"
              src={course?.imageUrl}
            ></img>
          </div>
          <div
            data-testid="courseName"
            className="text-5xl lg:text-4xl md:text-3xl sm:text-3xl xsm:text-2xl mt-4"
          >
            {course?.name}
          </div>
          <div data-testid="courseTags" className="my-5 place-items-center">
            {course?.tags.map((tag, index) => (
              <button
                key={index}
                className="hover:cursor-default rounded-full inline-block whitespace-nowrap bg-gradient-to-r from-sky-300 to-indigo-300 px-[0.20em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-xs md:text-sm lg:text-sm sm:text-sm xsm:text-sm font-bold leading-none my-1 md:my-0 sm:my-0 xsm:my-1 xsm:mx-1 md:mx-1 sm:mx-1 md:mt-3 sm:mt-3 xsm:mt-2 w-[120px] text-black"
              >
                {tags[tag - 1]?.name}
              </button>
            ))}
          </div>
          <div className="container w-10/12 xsm:max-w-full bg-slate-300 rounded-lg">
            <div data-testid="courseDescription" className="m-12">
              <p>{course?.description}</p>
            </div>
          </div>
          {!isCompleted && (
            <div data-testid="courseButton" className="my-8">
              {!isEnrolled && (
                <button
                  className="text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg mr-1 mb-1 ease-linear transition-all duration-150 bg-emerald-500 active:bg-emerald-600"
                  onClick={enrollCourse}
                >
                  Enroll
                </button>
              )}
              {isEnrolled && (
                <button
                  className="text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg mr-1 mb-1 ease-linear transition-all duration-150 bg-emerald-500 active:bg-emerald-600"
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
    </>
  );
};

export default CourseDetails;
