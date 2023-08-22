import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "../../css/tag/Tags.css";
import LoadingScreen from "../utilities/LoadingScreen";
import Navbar from "../utilities/Navbar";

const Tags = () => {
  const authToken = localStorage.getItem("authToken");
  const [getAllTag, setGetAllTag] = useState([]);
  const [showAddTagModel, setShowAddTagModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showupdateTagModel, setShowupdateTagModal] = useState({
    isModalOpen: false,
    tagId: 0,
  });
  const [newTagName, setNewTagName] = useState("");
  const [tagName, setTagName] = useState("");

  const handelTagSubmit = async () => {
    const response = await fetch(
      "https://backend-mu-plum.vercel.app/tag/create",
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          name: newTagName,
        }),
      }
    );
    if (response.ok) {
      fetchTag();
      const jsonResnponse = await response.json();
      setNewTagName(jsonResnponse);
      toast.success("Tag created successfully", {
        autoClose: 2500,
        closeButton: false,
      });
      setNewTagName("");
    } else {
      const jsonResponse = await response.json();
      toast.error(jsonResponse.message, {
        autoClose: 2500,
        closeButton: false,
      });
    }
  };

  const handleUpdatetag = async (id: number) => {
    const response = await fetch(
      `https://backend-mu-plum.vercel.app/tag/update/${id}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify({
          name: tagName,
        }),
      }
    );
    if (response.ok) {
      fetchTag();
      const jsonResnponse = await response.json();
      setTagName(jsonResnponse);
      toast.success("Tag Updated Successfully", {
        autoClose: 2500,
        closeButton: false,
      });
    } else {
      const jsonResponse = await response.json();
      toast.error(jsonResponse.message, {
        autoClose: 2500,
        closeButton: false,
      });
    }
  };

  const fetchTag = async () => {
    const response = await fetch("https://backend-mu-plum.vercel.app/tag/", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    if (response && response.ok) {
      const tagResponse = await response.json();
      setGetAllTag(tagResponse);
    }
  };

  const deleteTag = async (id: string) => {
    const response = await fetch(
      `https://backend-mu-plum.vercel.app/tag/delete/${id}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        method: "DELETE",
      }
    );
    if (response && response.ok) {
      fetchTag();
      toast.success("Tag deleted Successfully", {
        autoClose: 2500,
        closeButton: false,
      });
    }
  };

  const handleDelete = (id: string) => {
    deleteTag(id);
  };

  const fetchData = async () => {
    setIsLoading(true);

    await Promise.all([fetchTag()]);

    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return isLoading ? (
    <LoadingScreen />
  ) : (
    <>
      {showupdateTagModel.isModalOpen ? (
        <>
          <div data-testid="profileImageModel" className="TagImageModel">
            <div className="relative w-auto my-6 mx-auto">
              <div className="TagImageModalContainer">
                <div className="TagModelUploadContainer">
                  <h3
                    className="text-3xl font-semibold tracking-[.08px]"
                    data-testid="modelHeader"
                  >
                    Update Tag
                  </h3>
                  <button
                    className="TagModalUploadButton"
                    data-testid="modelUpdateButton"
                    onClick={() =>
                      setShowupdateTagModal({
                        isModalOpen: false,
                        tagId: 0,
                      })
                    }
                  >
                    <span className="text-black h-6 w-6 text-2xl block outline-none tracking-[.08px]">
                      x
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <input
                    data-testid="tagsInput"
                    className="TagModalUploadInput"
                    onChange={(e) => {
                      setTagName(e.target.value);
                    }}
                    placeholder="Tag name"
                  />
                </div>
                <div className="TagModalFooter">
                  <button
                    data-testid="modelClose"
                    className="TagModalCloseButton"
                    type="button"
                    onClick={() => {
                      setShowupdateTagModal({
                        isModalOpen: false,
                        tagId: 0,
                      });
                    }}
                  >
                    Close
                  </button>
                  <button
                    data-testid="modelUpdateTagButton"
                    className="TagModalSaveButton bg-[#0e3252] hover:bg-[#05243f]"
                    type="button"
                    onClick={() => {
                      const id = showupdateTagModel.tagId;
                      handleUpdatetag(id);
                      setShowupdateTagModal({
                        isModalOpen: false,
                        tagId: 0,
                      });
                    }}
                  >
                    Update Tag
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>{" "}
        </>
      ) : null}

      {showAddTagModel ? (
        <>
          <div data-testid="profileImageModel" className="TagImageModel">
            <div className="relative w-auto my-6 mx-auto">
              <div className="TagImageModalContainer">
                <div className="TagModelUploadContainer">
                  <h3 className="text-2xl font-semibold tracking-[.08px]">
                    Add Tag
                  </h3>
                  <button
                    className="TagModalUploadButton"
                    onClick={() => setShowAddTagModal(false)}
                  >
                    <span className="text-black h-6 w-6 text-2xl block outline-none tracking-[.08px]">
                      x
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <input
                    value={newTagName}
                    onChange={(e) => {
                      setNewTagName(e.target.value);
                    }}
                    data-testid="tagsInput"
                    className="TagModalUploadInput"
                    placeholder="Tag name"
                  />
                </div>
                <div className="TagModalFooter">
                  <button
                    data-testid="tagImageClose"
                    className="TagModalCloseButton"
                    type="button"
                    onClick={() => setShowAddTagModal(false)}
                  >
                    Close
                  </button>
                  <button
                    data-testid="AddTagButtonModal"
                    className="TagModalSaveButton bg-[#0e3252] hover:bg-[#05243f]"
                    type="button"
                    onClick={() => {
                      handelTagSubmit();
                      setShowAddTagModal(false);
                    }}
                  >
                    Add Tag
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>{" "}
        </>
      ) : null}
      <Navbar
        isCourse={true}
        isHome={true}
        isProfile={true}
        isUser={true}
        isTag={true}
      />
      <div>
        <h1 data-testid="tagHeading" className="tagHeading">
          List of Tags
        </h1>
      </div>
      <div className="grid justify-center">
        <button
          data-testid="AddTagButton"
          type="button"
          className="AddTagButton bg-[#0e3252] hover:bg-[#05243f]"
          onClick={() => setShowAddTagModal(true)}
        >
          Add Tag
        </button>
      </div>

      <div className="tagContainer">
        <table data-testid="container2 table" className="tagTable">
          <thead className="tagTableHead" data-testid="tableHeading">
            <tr>
              <th scope="col" className="tagTableHeadCols">
                Sr No.
              </th>
              <th scope="col" className="tagTableHeadCols">
                Name
              </th>
              <th scope="col" className="tagTableHeadCols">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {getAllTag?.map((tag: { name: string; id: string }, index) => {
              return (
                <tr
                  key={index}
                  className={`${index % 2 === 1 ? "bg-gray-100" : "bg-white"}`}
                  role="row"
                >
                  <td className="tagTableRows">{index + 1}</td>
                  <td className="tagTableRows">{tag.name}</td>
                  <td className="tagTableUpdateCol" data-testid="Actions">
                    <button
                      data-testid={"updateButton" + `${tag.id}`}
                      onClick={() => {
                        setShowupdateTagModal({
                          isModalOpen: true,
                          tagId: +tag.id,
                        });
                      }}
                      className="UpdateTagButton"
                    >
                      Update
                    </button>
                    <button
                      data-testid={"deleteButton" + `${tag.id}`}
                      role="deleteButton"
                      className="DeleteTagButton"
                      onClick={() => handleDelete(tag.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Tags;
