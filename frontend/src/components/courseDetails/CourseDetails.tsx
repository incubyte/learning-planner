import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { courseType } from "../courses/Courses";
import Navbar from "../utilities/Navbar";

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState<courseType>();
  const [tags, setTags] = useState([{ id: "1", name: "Java" }]);
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

  const [isEnrolled, setIsEnrolled] = useState(true);
  return (
    <>
      <Navbar
        isCourse={true}
        isHome={true}
        isProfile={true}
        isSearch={false}
      ></Navbar>

      <div className="grid justify-items-center content-center object-contain p-10">
        <div className="container grid justify-items-center content-center object-contain bg-slate-100 rounded-lg">
          <div className="relative mt-5">
            <img
              className="rounded-full h-40 w-40 block"
              src={course?.imageUrl}
            ></img>
          </div>
          <div className="text-5xl lg:text-4xl md:text-4xl xsm:text-4xl mt-4">
            {course?.name}
          </div>
          <div className="my-5 place-items-center w-full">
            {course?.tags.map((tag, index) => (
              <button
                key={index}
                className="hover:cursor-default rounded-full inline-block whitespace-nowrap bg-gradient-to-r from-sky-300 to-indigo-300 px-[0.20em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-xs md:text-sm font-bold leading-none my-1 md:my-0 md:mr-2 md:mt-3 w-[120px] text-black"
              >
                {tags[tag - 1]?.name}
              </button>
            ))}
          </div>
          <div className="container w-10/12 bg-slate-300 rounded-lg">
            <div className="m-12">
              <p>{course?.description}</p>
            </div>
          </div>
          <div className="my-8">
            {isEnrolled && (
              <button
                className="text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg mr-1 mb-1 ease-linear transition-all duration-150 bg-emerald-500 active:bg-emerald-600"
                onClick={() => {
                  setIsEnrolled(!isEnrolled);
                }}
              >
                Enroll
              </button>
            )}
            {!isEnrolled && (
              <button
                className="text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg mr-1 mb-1 ease-linear transition-all duration-150 bg-emerald-500 active:bg-emerald-600"
                onClick={() => {
                  setIsEnrolled(!isEnrolled);
                }}
              >
                Complete Course
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetails;
