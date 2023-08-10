import Multiselect from "multiselect-react-dropdown";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { imageUpload } from "../user/ImageUpload";
import Navbar from "./../utilities/Navbar";
import "../../css/course/addCourse.css";
const AddCourse = () => {
  const navigator = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showAddTagModel, setShowAddTagModal] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [createCourse, setCreateCourse] = useState();
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [credit, setCredit] = useState("");
  const [defaultTags, setDefaultTags] = useState([]);
  const [resourseUrls, setResourseUrls] = useState<string[]>([]);
  const [testUrls, setTestUrls] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState("");
  const [newTagName, setNewTagName] = useState("");
  const authToken = localStorage.getItem("authToken");

  const changeAvatar = (e: any) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const handleImageUrl = async () => {
    let media: any = [];
    if (avatar) {
      try {
        media = await imageUpload([avatar]);
        await setImageUrl(media[0].url);
      } catch (error) {
        toast.error("" + error, {
          autoClose: 2500,
          closeButton: false,
        });
      }
    }
    setShowModal(false);
  };

  const fetchTags = async () => {
    const response = await fetch("https://backend-mu-plum.vercel.app/tag/", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    if (response && response.ok) {
      const tagsResponse = await response.json();
      setDefaultTags(tagsResponse);
    }
  };

  useEffect(() => {
    fetchTags();
  }, [defaultTags]);

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

  const handleCreateCourse = async () => {
    const response = await fetch(
      "https://backend-mu-plum.vercel.app/course/create",
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          name: courseName,
          description: description,
          tags: tags,
          credit: +credit,
          resourseUrls: resourseUrls,
          testUrls: testUrls,
          imageUrl: imageUrl,
        }),
      }
    );
    if (response.ok) {
      const jsonResnponse = await response.json();
      setCreateCourse(jsonResnponse);
      toast.success("Course created successfully", {
        autoClose: 2500,
        closeButton: false,
      });
      setTimeout(() => {
        navigator("/courses");
      }, 2500);
    } else {
      toast.error("Please enter valid data", {
        autoClose: 2500,
        closeButton: false,
      });
    }
  };

  const handleSubmit = (event: any) => {
    handleCreateCourse();
    event.preventDefault();
    setCredit("");
    setCourseName("");
    setDescription("");
    setTags([]);
    setResourseUrls([]);
    setTestUrls([]);
    setImageUrl("");
  };

  useEffect(() => {
    if (resourseUrls.length === 0) {
      setResourseUrls([""]);
    }
  }, []);

  useEffect(() => {
    if (testUrls.length === 0) {
      setTestUrls([""]);
    }
  }, []);

  const handleResourceUrlChange = (index: number, event: any) => {
    const updatedUrls = [...resourseUrls];
    updatedUrls[index] = event.target.value;
    setResourseUrls(updatedUrls);
  };

  const handleAddResourceUrl = () => {
    setResourseUrls([...resourseUrls, ""]);
  };

  const handleRemoveResourceUrl = (index: number) => {
    const updatedUrls = [...resourseUrls];
    updatedUrls.splice(index, 1);
    setResourseUrls(updatedUrls);
  };

  const handleTestUrlChange = (index: number, event: any) => {
    const updatedUrls = [...testUrls];
    updatedUrls[index] = event.target.value;
    setTestUrls(updatedUrls);
  };

  const handleAddTestUrl = () => {
    setTestUrls([...testUrls, ""]);
  };

  const handleRemoveTestUrl = (index: number) => {
    const updatedUrls = [...testUrls];
    updatedUrls.splice(index, 1);
    setTestUrls(updatedUrls);
  };

  const data = {
    options: defaultTags.map((tag: { id: number; name: string }) => ({
      id: tag.id,
      name: tag.name,
    })),
  };

  useEffect(() => {}, [tags]);

  return (
    <>
      {showModal ? (
        <>
          <div data-testid="courseImageModel" className="CourseImageModel">
            <div className="relative w-auto my-6 mx-auto">
              <div className="CourseImageModalContainer">
                <div className="CourseModelUploadContainer">
                  <h3 className="text-3xl font-semibold">Upload Image</h3>
                  <button
                    className="CourseModalUploadButton"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-black h-6 w-6 text-2xl block outline-none">
                      x
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <label className="CourseModelUploadFileLabel">
                    Upload file
                  </label>
                  <input
                    data-testid="courseImageInput"
                    accept="image/*"
                    className="CourseModalUploadInput"
                    aria-describedby="file_input_help"
                    id="file_input"
                    type="file"
                    onChange={changeAvatar}
                  />
                  <p
                    className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                    id="file_input_help"
                  >
                    SVG, PNG, JPG or GIF (MAX. 350kb).
                  </p>
                </div>
                <div className="CourseModalFooter">
                  <button
                    data-testid="courseImageClose"
                    className="CourseModalCloseButton"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    data-testid="courseImageSave"
                    className="CourseModalSaveButton bg-emerald-500 active:bg-emerald-600"
                    type="button"
                    onClick={handleImageUrl}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      {showAddTagModel ? (
        <>
          <div
            data-testid="profileImageModel"
            className="CourseImageModel"
          >
            <div className="relative w-auto my-6 mx-auto">
              <div className="CourseImageModalContainer">
                <div className="CourseModelUploadContainer">
                  <h3 className="text-3xl font-semibold">Add Tags here</h3>
                  <button
                    className="CourseModalUploadButton"
                    onClick={() => setShowAddTagModal(false)}
                  >
                    <span className="text-black h-6 w-6 text-2xl block outline-none">
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
                    className="CourseModalUploadInput"
                    placeholder="Tag name"
                  />
                </div>
                <div className="CourseModalFooter">
                  <button
                    data-testid="courseImageClose"
                    className="CourseModalCloseButton"
                    type="button"
                    onClick={() => setShowAddTagModal(false)}
                  >
                    Close
                  </button>
                  <button
                    data-testid="AddTagButton"
                    className="CourseModalSaveButton bg-emerald-500 active:bg-emerald-600"
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
        isHome={false}
        isProfile={false}
        isUser={true}
        isTag={false}
      ></Navbar>
      <div>
        <h1
          className="text-center pt-10 text-3xl font-bold"
          data-testid="addCourseHeading"
        >
          Add Course
        </h1>
      </div>
      <div className="flex justify-center">
        <ToastContainer />
        <form
          data-testid="formContainer"
          onSubmit={handleSubmit}
          className="AddCourseContainer"
        >
          <div className="form-group mt-3" data-testid="courseTitle">
            <label className="AddCourseTextLabel text-md">
              Title
            </label>
            <input
              className="AddCourseTextInput"
              type="text"
              data-testid="courseTitleInput"
              placeholder="Enter course name"
              required
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
            />
          </div>
          <div className="form-group mt-3" data-testid="courseDescription">
            <label className="AddCourseTextLabel text-md">
              Description
            </label>
            <textarea
              className="AddCourseTextInput"
              placeholder="Enter course description"
              required
              data-testid="courseDescriptionInput"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group mt-3" data-testid="courseCredit">
            <label className="AddCourseTextLabel text-md">
              Credit
            </label>
            <input
              className="AddCourseTextInput"
              type="number"
              data-testid="courseCreditInput"
              placeholder="Enter course credit"
              required
              value={credit}
              onChange={(e) => setCredit(e.target.value)}
            />
          </div>
          <div className="form-group mt-3" data-testid="multiselect">
            <label className="AddCourseTextLabel text-md">
              Tags
            </label>
            <Multiselect
              options={data.options}
              data-testid="multiSelectInput"
              className="mt-2"
              displayValue="name"
              onSelect={(selectedOptions) => {
                const updatedTagsIds: any = [...tags];
                selectedOptions.forEach((option: any) => {
                  if (!updatedTagsIds.includes(option.id)) {
                    updatedTagsIds.push(option.id);
                  }
                });
                setTags(updatedTagsIds);
              }}
              onRemove={(removedOptions) => {
                const removedTagsIds = removedOptions.map(
                  (removedTag: { id: number }) => removedTag.id
                );
                const updatedTagsIds = tags.filter(
                  (tagId: number) => !removedTagsIds.includes(tagId)
                );
                setTags(updatedTagsIds);
              }}
            />
            <button
              type="button"
              className="AddCourseAddTagButton"
              onClick={() => setShowAddTagModal(true)}
            >
              Add Tags
            </button>
          </div>
          <div className="form-group mt-3 justify-between">
            <label className="text-md font-bold">Resource URLs</label>
            {resourseUrls.map((url, index) => (
              <div key={index} className="flex mt-2">
                <input
                  type="url"
                  className="AddCourseTextInput"
                  value={url}
                  required={index === 0}
                  placeholder="Enter resource URL"
                  data-testid="ResourceUrl"
                  onChange={(event) => handleResourceUrlChange(index, event)}
                />
                {resourseUrls.length > 1 ? (
                  <button
                    type="button"
                    data-testid="RemoveButton"
                    className="AddCourseRemoveUrlButton"
                    onClick={() => handleRemoveResourceUrl(index)}
                  >
                    Remove
                  </button>
                ) : null}
              </div>
            ))}
            <button
              type="button"
              data-testid="Add Resource Url"
              className="AddCourseAddUrlButton"
              onClick={handleAddResourceUrl}
            >
              Add
            </button>
          </div>

          <div className="form-group mt-3 justify-between">
            <label className="text-md font-bold">Test URLs</label>
            {testUrls.map((url, index) => (
              <div key={index} className="flex mt-2">
                <input
                  type="url"
                  className="AddCourseTextInput"
                  value={url}
                  data-testid="testUrl"
                  required={index === 0}
                  placeholder="Enter Test URL"
                  onChange={(event) => handleTestUrlChange(index, event)}
                />
                {testUrls.length > 1 ? (
                  <button
                    type="button"
                    data-testid="RemoveTestButton"
                    className="AddCourseRemoveUrlButton"
                    onClick={() => handleRemoveTestUrl(index)}
                  >
                    Remove
                  </button>
                ) : null}
              </div>
            ))}
            <button
              type="button"
              data-testid="Add Test Url"
              className="AddCourseAddUrlButton"
              onClick={handleAddTestUrl}
            >
              Add
            </button>
          </div>
          <div
            className="AddCourseImageContainer form-group"
            data-testid="CourseImageContainer"
          >
            <label className="text-md  font-bold">Image</label>
            <div className="h-10 w-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                data-testid="courseImageButton"
                className="ProfileImageUpdateIcon"
                onClick={() => setShowModal(true)}
                viewBox="0 0 24 24"
              >
                <path d="M19,13a1,1,0,0,0-1,1v.38L16.52,12.9a2.79,2.79,0,0,0-3.93,0l-.7.7L9.41,11.12a2.85,2.85,0,0,0-3.93,0L4,12.6V7A1,1,0,0,1,5,6h7a1,1,0,0,0,0-2H5A3,3,0,0,0,2,7V19a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V14A1,1,0,0,0,19,13ZM5,20a1,1,0,0,1-1-1V15.43l2.9-2.9a.79.79,0,0,1,1.09,0l3.17,3.17,0,0L15.46,20Zm13-1a.89.89,0,0,1-.18.53L13.31,15l.7-.7a.77.77,0,0,1,1.1,0L18,17.21ZM22.71,4.29l-3-3a1,1,0,0,0-.33-.21,1,1,0,0,0-.76,0,1,1,0,0,0-.33.21l-3,3a1,1,0,0,0,1.42,1.42L18,4.41V10a1,1,0,0,0,2,0V4.41l1.29,1.3a1,1,0,0,0,1.42,0A1,1,0,0,0,22.71,4.29Z" />
              </svg>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              data-testid="submitButton"
              className="AddCourseSubmitButton"
              type="submit"
            >
              Add Course
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddCourse;
