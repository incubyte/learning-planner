import { ToastContainer, toast } from "react-toastify";
import * as XLSX from "xlsx";
import "../../css/user/addMultipleUsersForm.css";
const AddMultipleUsersForm = () => {
  var arraylist: any[] = [];
  const handleSubmit = async () => {
    const authToken = localStorage.getItem("authToken");
    console.log(arraylist);
    try {
      const response = await fetch(
        "https://backend-mu-plum.vercel.app/user/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ users: arraylist }),
        }
      );

      if (response.ok) {
        toast.success("users added", {
          autoClose: 2500,
          closeButton: false,
        });
      } else {
        if (response.status !== 400) {
          const jsonResponse = await response.json();
          toast.error(jsonResponse.message, {
            autoClose: 2500,
            closeButton: false,
          });
        } else {
          toast.error("Please check data and try again", {
            autoClose: 2500,
            closeButton: false,
          });
        }
      }
    } catch (error) {
      toast.error("An error occurred" + error, {
        autoClose: 2500,
        closeButton: false,
      });
    }
  };

  const onChange = (event: any) => {
    let file = event.target.files[0];

    const allowedFileTypes = [
      "application/vnd.ms-excel",
      "text/csv",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
    if (!allowedFileTypes.includes(file.type)) {
      toast.error("Please upload .csv or .xlsx or .xsl file", {
        autoClose: 2500,
        closeButton: false,
      });
    } else {
      let fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = async (e) => {
        const arrayBuffer: any = fileReader.result;
        var data = new Uint8Array(arrayBuffer);
        var arr = new Array();
        for (var i = 0; i != data.length; ++i)
          arr[i] = String.fromCharCode(data[i]);
        var bstr = arr.join("");
        var workbook = XLSX.read(bstr, { type: "binary" });
        var first_sheet_name = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[first_sheet_name];
        arraylist = XLSX.utils.sheet_to_json(worksheet, { raw: true });
        if (arraylist.length > 0) handleSubmit();
      };
    }
  };
  return (
    <>
      <div data-testid="fileContainer" className="FileUploadFormContainer">
        <div className="FileUploadForm">
          <label htmlFor="dropzone-file" className="FileUploadFormLable">
            <div className="FileUploadTextAndSvgContainer">
              <svg
                className="FileUploadSvg"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-xl text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-base text-gray-500">csv, xlsx, xls</p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              accept=".csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              onChange={(event) => {
                onChange(event);
              }}
            />
          </label>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default AddMultipleUsersForm;
