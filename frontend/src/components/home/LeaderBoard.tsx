import Carousel from "../utilities/Carousel";
import "../../css/home/LeaderBoard.css";
import { useEffect, useState } from "react";
import { courseType } from "../courses/Courses";
import { LeaderBoardType } from "./LeaderBoardType";
import React from "react";
import { userType } from "../user/user";
import LoadingScreen from "../utilities/LoadingScreen";
import { ToastContainer, toast } from "react-toastify";

const LeaderBoard = () => {
  const [activeCourses, setActiveCourses] = useState<courseType[]>([]);
  const [leaderBoardUsers, setLeaderBoardUsers] = useState<LeaderBoardType[]>(
    []
  );
  const [currentUserCredit, setCurrentUserCredit] = useState<number>(0);
  const [currentUser, setCurrentUser] = useState<userType>();

  const authToken = localStorage.getItem("authToken");
  const [isLoading, setIsLoading] = useState(true);
  const fetchCurrentUserCredit = async () => {
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

  const fetchLeaderBoardUsers = async () => {
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
    ]);

    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <>
      <div className="LeaderBoardContainer " role="leaderBoard">
        <div className="w-full text-center mb-8">
          <h2
            className="LeaderBoardTitleContainer"
            data-testid="leaderBoardTitle"
          >
            The Leader Board
          </h2>
        </div>
        <div className="LeaderBoardContainers" data-testid="container1">
          <div className="LeaderBoardInnerContainer">
            <div>
              <img
                className="LeaderBoardInnerFirstImageContainer"
                src={currentUser?.profilePhoto}
                alt="user image"
                data-testid="container1 Image"
              />
            </div>
            <div
              className="LeaderBoardUserInfoContainer"
              data-testid="container1 user Info"
            >
              <div className="LeaderBoardUserInnerInfoContainer">
                <p className="LeaderBoardUserInnerInfo">
                  Email: {currentUser?.email}
                </p>
                <p className="LeaderBoardUserInnerInfo">
                  Credits: {currentUserCredit}
                </p>
                <p className="LeaderBoardUserInnerInfo">
                  Role: {currentUser?.role}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="LeaderBoardContainers" data-testid="container2">
          <div className="LeaderBoardContainerTwoTableContainer">
            <div className="LeaderBoardInnerContainerScrollbar">
              <table
                className="LeaderBoardContainerTwoTable "
                data-testid="container2 table"
              >
                <thead>
                  <tr role="row">
                    <th className="rounded-tl LeaderBoardContainerTwoTableBorder">
                      Rank
                    </th>
                    <th className="LeaderBoardContainerTwoTableBorder">
                      Email
                    </th>
                    <th className="LeaderBoardContainerTwoTableBorder">Role</th>
                    <th className="LeaderBoardContainerTwoTableBorder">
                      Credits
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {leaderBoardUsers.map((leaderBoardUser, index) => {
                    return (
                      <React.Fragment key={index}>
                        {
                          <tr
                            className={`${
                              index % 2 === 0 ? "bg-gray-100" : "bg-white"
                            }`}
                            role="row"
                          >
                            <td className="LeaderBoardContainerTwoTableBorder">
                              {index + 1}
                            </td>
                            <td className="LeaderBoardContainerTwoTableBorder">
                              {leaderBoardUser?.user?.email}
                            </td>
                            <td className="LeaderBoardContainerTwoTableBorder">
                              {leaderBoardUser?.user?.role}
                            </td>
                            <td className="LeaderBoardContainerTwoTableBorder">
                              {leaderBoardUser?.CompletedCourseCount * 10}
                            </td>
                          </tr>
                        }
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <br />
      <Carousel
        titleName="Active Courses"
        contentId={"activeContent"}
        courses={activeCourses}
      />
      <ToastContainer />
    </>
  );
};

export default LeaderBoard;
