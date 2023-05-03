import { useState } from "react";
import Navbar from "../utilities/Navbar";

const CourseDetails = () => {
  const tags = [
    { id: "1", name: "Java1" },
    { id: "7", name: "Java2" },
    { id: "8", name: "Java3" },
    { id: "9", name: "Java4" },
  ];
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
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtbEno7OdEiusIYUNSglF3c2UxRluhs8ZpR951-9hs&s"
            ></img>
          </div>
          <div className="text-5xl lg:text-4xl md:text-4xl xsm:text-4xl mt-4">
            Java by comparison
          </div>
          <div className="my-5 place-items-center w-full">
            {tags.map((tag) => (
              <button
                key={tag.id}
                className="hover:cursor-default rounded-full inline-block whitespace-nowrap bg-gradient-to-r from-sky-300 to-indigo-300 px-[0.20em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-xs md:text-sm font-bold leading-none my-1 md:my-0 md:mr-2 md:mt-3 w-[120px] text-black"
              >
                {tag.name}
              </button>
            ))}
          </div>
          <div className="container w-10/12 bg-slate-300 rounded-lg">
            <div className="m-12">
              <p>
                This Java course takes a unique approach to teaching programming
                by comparing and contrasting Java with other popular programming
                languages. Through a series of lectures, coding exercises, and
                real-world examples, students will learn the fundamentals of
                Java and how it differs from other languages like Python, C++,
                and JavaScript.{" "}
              </p>
              <br></br>
              <p>
                The course starts with an introduction to Java`s syntax, data
                types, and control structures. Students will learn how to create
                classes and objects in Java, as well as how to use inheritance,
                polymorphism, and interfaces to create more complex programs.
                Throughout the course, students will gain an understanding of
                the unique features of Java, such as its garbage collection and
                exception handling mechanisms.
              </p>
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
