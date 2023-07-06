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
    "https://backend-mu-plum.vercel.app/course"
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
      const response = await fetch(
        "https://backend-mu-plum.vercel.app/course/popular",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
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

    await Promise.all([fetchCourses(courseUrl), fetchPopularCourses()]);

    setIsLoading(false);
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

  return isLoading ? (
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
      <div className="hidden lg:block md:block">
        <ContentLoader viewBox="0 0 380 50">
          <rect x="160" y="10" rx="2" ry="2" width="70" height="10" />
          <rect x="30" y="40" rx="5" ry="5" width="40" height="10" />
          <rect x="75" y="40" rx="5" ry="5" width="40" height="10" />
          <rect x="120" y="40" rx="5" ry="5" width="40" height="10" />
          <rect x="165" y="40" rx="5" ry="5" width="40" height="10" />
          <rect x="210" y="40" rx="5" ry="5" width="40" height="10" />
          <rect x="255" y="40" rx="5" ry="5" width="40" height="10" />
          <rect x="300" y="40" rx="5" ry="5" width="40" height="10" />
        </ContentLoader>
        <hr className="mt-10" />
        <ContentLoader viewBox="0 0 380 120">
          <rect x="160" y="10" rx="2" ry="2" width="70" height="10" />
          <rect x="12" y="35" rx="5" ry="5" width="100" height="80" />
          <rect x="122" y="35" rx="5" ry="5" width="100" height="80" />
          <rect x="232" y="35" rx="5" ry="5" width="100" height="80" />
          <rect x="342" y="35" rx="5" ry="5" width="100" height="80" />
        </ContentLoader>
        <hr className="mt-10" />
        <ContentLoader viewBox="0 0 380 120">
          <rect x="160" y="10" rx="2" ry="2" width="70" height="10" />
          <rect x="12" y="35" rx="5" ry="5" width="100" height="80" />
          <rect x="122" y="35" rx="5" ry="5" width="100" height="80" />
          <rect x="232" y="35" rx="5" ry="5" width="100" height="80" />
          <rect x="342" y="35" rx="5" ry="5" width="100" height="80" />
        </ContentLoader>
      </div>
      <div className="lg:hidden md:hidden sm:block xsm:block">
        <ContentLoader viewBox="0 0 180 90">
          <rect x="50" y="10" rx="2" ry="2" width="80" height="15" />
          <rect x="25" y="40" rx="5" ry="5" width="60" height="12" />
          <rect x="95" y="40" rx="5" ry="5" width="60" height="12" />
          <rect x="25" y="56" rx="5" ry="5" width="60" height="12" />
          <rect x="95" y="56" rx="5" ry="5" width="60" height="12" />
          <rect x="25" y="72" rx="5" ry="5" width="60" height="12" />
          <rect x="95" y="72" rx="5" ry="5" width="60" height="12" />
        </ContentLoader>
        <hr className="mt-10" />
        <ContentLoader viewBox="0 0 180 155">
          <rect x="50" y="15" rx="2" ry="2" width="80" height="15" />
          <rect x="12" y="45" rx="5" ry="5" width="130" height="110" />
          <rect x="150" y="45" rx="5" ry="5" width="130" height="110" />
        </ContentLoader>
        <hr className="mt-10" />
        <ContentLoader viewBox="0 0 180 165">
          <rect x="50" y="15" rx="2" ry="2" width="80" height="15" />
          <rect x="12" y="45" rx="5" ry="5" width="130" height="110" />
          <rect x="150" y="45" rx="5" ry="5" width="130" height="110" />
        </ContentLoader>
      </div>
    </>
  ) : (
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
      />
      <hr className="mt-10" />
      <Carousel
        titleName="Available courses"
        courses={search(availableCourses)}
        contentId="availContent"
      />
      <ToastContainer />
    </>
  );
};

export default CoursePage;
