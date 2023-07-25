import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "../utilities/Carousel";
import Navbar from "../utilities/Navbar";
import CoursePageIndex from "./CoursePageIndex";
import Filter from "./Filter";
import { ToastContainer, toast } from "react-toastify";
import ContentLoader from "react-content-loader";

export interface courseType {
  id: string;
  name: string;
  resourseUrls: string[];
  testUrls: string[];
  imageUrl: string;
  credit: number;
  tags: number[];
  description: string;
  createdAt: string;
  updatedAt: string;
}

const CoursePage = () => {
  const [query, setQuery] = useState("");
  const [availableCourses, setAvailableCourses] = useState<courseType[]>([]);
  const [popularCourses, setPopularCourses] = useState<courseType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [courseUrl, setCourseUrl] = useState<string>(
    "http://localhost:5000/course"
  );
  const getQuery = (query: string) => {
    setQuery(query);
  };

  const getCourseByFilter = (courses: courseType[]) => {
    setAvailableCourses(courses);
  };

  const getPopularCourseByFilter = (courses: courseType[]) => {
    setPopularCourses(courses);
  };

  const authToken = localStorage.getItem("authToken");
  const fetchCourses = async (url: string) => {
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response && response.ok) {
        const courses = await response.json();
        setAvailableCourses(courses);
      }
    } catch (error) {
      toast.error("An error occurred" + error, {
        autoClose: 2500,
        closeButton: false,
      });
    }
  };
  const fetchPopularCourses = async () => {
    try {
      const response = await fetch("http://localhost:5000/course/popular", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (response && response.ok) {
        const courses = await response.json();
        setPopularCourses(courses);
      }
    } catch (error) {
      toast.error("An error occurred" + error, {
        autoClose: 2500,
        closeButton: false,
      });
    }
  };

  const fetchData = async (courseUrl: string) => {
    setIsLoading(true);
    await setTimeout(async () => {
      await Promise.all([fetchCourses(courseUrl), fetchPopularCourses()]);
      setIsLoading(false);
    }, 5000);
  };

  useEffect(() => {
    fetchData(courseUrl);
  }, []);

  const search = (data: courseType[]) => {
    const pattern = query.replace(/ /g, "").toLowerCase();
    const filteredList = data?.filter((item: courseType) => {
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
      <Navbar
        getQuery={getQuery}
        isCourse={false}
        isHome={true}
        isProfile={true}
        isSearch={true}
      />
      <CoursePageIndex />
      <hr className="mt-10" />
      <Filter
        getCourseByFilter={getCourseByFilter}
        getPopularCourseByFilter={getPopularCourseByFilter}
      />
      <hr className="mt-10" />
      <Carousel
        titleName="Popular courses"
        courses={search(popularCourses)}
        contentId="popContent"
        isLoading={isLoading}
      />
      <hr className="mt-10" />
      <Carousel
        titleName="Available courses"
        courses={search(availableCourses)}
        contentId="availContent"
        isLoading={isLoading}
      />
      <ToastContainer />
    </>
  );
};

export default CoursePage;
