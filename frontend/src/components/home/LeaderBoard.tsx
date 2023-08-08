import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "../../css/home/LeaderBoard.css";
import { courseType } from "../courses/Courses";
import { userType } from "../user/user";
import Carousel from "../utilities/Carousel";
import { LeaderBoardType } from "./LeaderBoardType";
import HomePage from "../../assets/HomePage.png";
import Skeleton from "react-loading-skeleton";

const LeaderBoard = () => {
  const [activeCourses, setActiveCourses] = useState<courseType[]>([]);
  const [completeCourses, setCompleteCourses] = useState<courseType[]>([]);
  const [leaderBoardUsers, setLeaderBoardUsers] = useState<LeaderBoardType[]>(
    []
  );
  const [currentUserCredit, setCurrentUserCredit] = useState<number>(0);
  const [currentUser, setCurrentUser] = useState<userType>();
  const [isLoading, setIsLoading] = useState(true);
  const fetchCurrentUserCredit = async () => {
    const authToken = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        "https://backend-mu-plum.vercel.app/user/course?status=completed",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response && response.ok) {
        const fetchCourses = await response.json();
        setCurrentUserCredit(fetchCourses.courses.length * 10);
      }
    } catch (error) {
      toast.error("An error occurred" + error, {
        autoClose: 2500,
        closeButton: false,
      });
    }
  };

  const fetchActiveCourses = async () => {
    const authToken = localStorage.getItem("authToken");

    try {
      const response = await fetch(
        "https://backend-mu-plum.vercel.app/user/course?status=active",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response && response.ok) {
        const fetchCourses = await response.json();
        setActiveCourses(fetchCourses.courses);
      }
    } catch (error) {
      toast.error("An error occurred" + error, {
        autoClose: 2500,
        closeButton: false,
      });
    }
  };

  const fetchCompleteCourses = async () => {
    const authToken = localStorage.getItem("authToken");

    try {
      const response = await fetch(
        "https://backend-mu-plum.vercel.app/user/course?status=completed",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response && response.ok) {
        const fetchCourses = await response.json();
        setCompleteCourses(fetchCourses.courses);
      }
    } catch (error) {
      toast.error("An error occurred" + error, {
        autoClose: 2500,
        closeButton: false,
      });
    }
  };

  const fetchLeaderBoardUsers = async () => {
    const authToken = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        "https://backend-mu-plum.vercel.app/user/leaderboard",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response && response.ok) {
        const leaderBoardUsersResponse = await response.json();
        setLeaderBoardUsers(leaderBoardUsersResponse);
      }
    } catch (error) {
      toast.error("An error occurred" + error, {
        autoClose: 2500,
        closeButton: false,
      });
    }
  };

  const fetchCurrentUser = async () => {
    const authToken = localStorage.getItem("authToken");

    try {
      const response = await fetch("https://backend-mu-plum.vercel.app/user", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response && response.ok) {
        const currentUserResponse = await response.json();
        setCurrentUser(currentUserResponse);
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
    await Promise.all([
      fetchCurrentUserCredit(),
      fetchActiveCourses(),
      fetchLeaderBoardUsers(),
      fetchCurrentUser(),
      fetchCompleteCourses(),
    ]);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="leaderBoard">
        <div className="flex flex-col mx-3 sm:mx-10 my-1 sm:my-2 shadow-md rounded-lg bg-home-page bg-[length:100%_25vh] h-[25vh] lg:bg-[length:100%_50vh] md:bg-[length:100%_30vh] lg:h-[50vh] md:h-[30vh] justify-center">
          <div className="inset-0 flex flex-col justify-center items-center text-white text-center p-4">
            <p className="text-base md:text-2xl lg:text-3xl font-bold">
              Learning is a never-ending journey, and the more you explore, the
              more you discover.
            </p>
          </div>
        </div>
        <h1 data-testid="leaderBoardTitle" className="courseHeading">
          Leader Board
        </h1>
        <div
          className="courseContainer"
          data-testid="container2"
          role="leaderBoard"
        >
          {isLoading ? (
            <Skeleton height={360} />
          ) : (
            <table data-testid="container2 table" className="courseTable">
              <thead className="courseTableHead" data-testid="tableHeading">
                <tr>
                  <th scope="col" className="courseTableHeadCols">
                    SrNo.
                  </th>
                  <th scope="col" className="courseTableHeadCols">
                    Email
                  </th>
                  <th scope="col" className="courseTableHeadCols">
                    Role
                  </th>
                  <th scope="col" className="courseTableHeadCols">
                    Credits
                  </th>
                </tr>
              </thead>
              <tbody>
                {leaderBoardUsers?.map((leaderBoardUser, index) => {
                  return (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 1 ? "bg-gray-100" : "bg-white"
                      }`}
                      role="row"
                    >
                      <td className="courseTableRows">{index + 1}</td>
                      <td className="courseTableRows">
                        {leaderBoardUser?.user?.email}
                      </td>
                      <td className="courseTableRows">
                        {leaderBoardUser?.user?.role}
                      </td>
                      <td className="courseTableRows">
                        {leaderBoardUser?.CompletedCourseCount * 10}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <br />
        <hr className="mt-10" />
        <Carousel
          titleName="Active Courses"
          contentId={"activeContent"}
          courses={activeCourses}
          isLoading={isLoading}
        />
        <hr className="mt-10" />
        <Carousel
          titleName="Completed Courses"
          contentId={"completeContent"}
          courses={completeCourses}
          isLoading={isLoading}
        />

        <ToastContainer />
      </div>
    </>
  );
};

export default LeaderBoard;
