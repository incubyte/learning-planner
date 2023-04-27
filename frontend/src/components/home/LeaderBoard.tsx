import Carousel from "../utilities/Carousel";

const LeaderBoard = () => {
  return (
    <>
      <div
        className="flex flex-wrap justify-between items-center border p-5 border-gray-200 rounded-lg "
        role="leaderBoard"
      >
        <div className="w-full text-center mb-8">
          <h2
            className="text-3xl font-semibold text-center"
            data-testid="leaderBoardTitle"
          >
            The Leader Board
          </h2>
        </div>
        <div className="w-full md:w-1/2 p-2" data-testid="container1">
          <div className="bg-gray-100 h-[450px] flex flex-col items-center justify-center p-2 border border-black border-solid rounded-lg">
            <div>
              <img
                className="rounded-full border border-gray-100 shadow-sm ml-5 mt-5"
                src="https://randomuser.me/api/portraits/women/81.jpg"
                alt="user image"
                data-testid="container1 Image"
              />
            </div>
            <div className="mt-2" data-testid="container1 user Info">
              <div className="text-xl font-semibold xsm:text-lg xsm:font-medium">
                <p className="m-8 sm:m-2 md:m-3">Rank : 1</p>
                <p className="m-8 sm:m-2 md:m-3">Email : charvit@incubyte.co</p>
                <p className="m-8 sm:m-2 md:m-3">Credits : 20</p>
                <p className="m-8 sm:m-2 md:m-3">Role : Software Craftperson</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-2" data-testid="container2">
          <div className="bg-gray-100 h-[450px] flex items-center justify-center p-4 border border-black border-solid rounded-lg">
            <div className="overflow-x-auto">
              <table
                className="table w-auto justify-around text-center text-lg md:text-xl mt-5 border border-gray-400"
                data-testid="container2 table"
              >
                <thead>
                  <tr role="row">
                    <th className="border border-gray-100 p-3">Rank</th>
                    <th className="border border-gray-100 p-3">Email</th>
                    <th className="border border-gray-100 p-3">Role</th>
                    <th className="border border-gray-100 p-3">Credits</th>
                  </tr>
                </thead>
                <tbody>
                  <tr role="row">
                    <td className="border border-gray-100 p-3">2</td>
                    <td className="border border-gray-100 p-3">
                      aayush@incubyte.co
                    </td>
                    <td className="border border-gray-100 p-3">
                      Software Craftperson
                    </td>
                    <td className="border border-gray-100 p-3">10</td>
                  </tr>
                  <tr role="row">
                    <td className="border border-gray-100 p-3">3</td>
                    <td className="border border-gray-100 p-3">
                      aman.r@incubyte.co
                    </td>
                    <td className="border border-gray-100 p-3">
                      Test Craftperson
                    </td>
                    <td className="border border-gray-100 p-3">30</td>
                  </tr>
                  <tr role="row">
                    <td className="border border-gray-100 p-3">4</td>
                    <td className="border border-gray-100 p-3">
                      shreyas@incubyte.co
                    </td>
                    <td className="border border-gray-100 p-3">
                      Test Craftperson intern
                    </td>
                    <td className="border border-gray-100 p-3">50</td>
                  </tr>
                  <tr role="row">
                    <td className="border border-gray-100 p-3">5</td>
                    <td className="border border-gray-100 p-3">
                      shreyas@incubyte.co
                    </td>
                    <td className="border border-gray-100 p-3">
                      Software Craftperson
                    </td>
                    <td className="border border-gray-100 p-3">10</td>
                  </tr>
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
        courses={[
          {
            id: "1",
            imageUrl:
              "https://upload.wikimedia.org/wikipedia/commons/a/a8/NestJS.svg",
            name: "Nest js",
          },
          {
            id: "1",
            imageUrl:
              "https://upload.wikimedia.org/wikipedia/commons/a/a8/NestJS.svg",
            name: "Nest js1",
          },
          {
            id: "1",
            imageUrl:
              "https://upload.wikimedia.org/wikipedia/commons/a/a8/NestJS.svg",
            name: "Nest js2",
          },
          {
            id: "1",
            imageUrl:
              "https://upload.wikimedia.org/wikipedia/commons/a/a8/NestJS.svg",
            name: "Nest js3",
          },
          {
            id: "1",
            imageUrl:
              "https://upload.wikimedia.org/wikipedia/commons/a/a8/NestJS.svg",
            name: "Nest js4",
          },
        ]}
      />
    </>
  );
};

export default LeaderBoard;
