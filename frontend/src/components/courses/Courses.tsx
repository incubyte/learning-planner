import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "../utilities/Carousel";
import CoursePageIndex from "./CoursePageIndex";
import Filter from "./Filter";
import Navbar from "./Navbar";

const CoursePage = () => {
  const [query, setQuery] = useState("");
  const [availableCourses, setAvailableCourses] = useState<any[]>([]);
  const navigator = useNavigate();
  const getQuery = (query: string) => {
    setQuery(query);
  };

  const [courseUrl, setCourseUrl] = useState<string>(
    "https://backend-mu-plum.vercel.app/course"
  );
  const getCourseByFilter = (courses: any[]) => {
    setAvailableCourses(courses);
  };

  const authToken = localStorage.getItem("authToken");
  const fetchCourses = async (url: string) => {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    if (response.ok) {
      const courses = await response.json();
      setAvailableCourses(courses);
    } else {
      navigator("/auth/signin");
    }
  };
  useEffect(() => {
    fetchCourses(courseUrl);
  }, []);

  const search = (data: any) => {
    const pattern = query.replace(/ /g, "").toLowerCase();
    const filteredList = data.filter((item: any) => {
      const text = item.name.replace(/ /g, "").toLowerCase();
      let patternIndex = 0;
      let textIndex = 0;
      while (patternIndex < pattern.length && textIndex < text.length) {
        if (pattern[patternIndex] === text[textIndex]) {
          patternIndex++;
        }
        textIndex++;
      }
      return patternIndex === pattern.length;
    });
    return filteredList;
  };
  return (
    <>
      <Navbar getQuery={getQuery} />
      <CoursePageIndex />
      <hr className="mt-10" />
      <Filter getCourseByFilter={getCourseByFilter} />
      <hr className="mt-10" />
      <Carousel
        titleName="Popular courses"
        courses={search(availableCourses)}
        contentId="popContent"
      />
      <hr className="mt-10" />
      <Carousel
        titleName="Available courses"
        courses={search(availableCourses)}
        contentId="availContent"
      />
    </>
  );
};

export default CoursePage;
