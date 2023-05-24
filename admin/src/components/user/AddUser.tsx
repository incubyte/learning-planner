import { ToastContainer, toast } from "react-toastify";
import * as XLSX from "xlsx";

const addUser = () => {
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
      fileReader.onload = (e) => {
        const arrayBuffer: any = fileReader.result;
        var data = new Uint8Array(arrayBuffer);
        var arr = new Array();
        for (var i = 0; i != data.length; ++i)
          arr[i] = String.fromCharCode(data[i]);
        var bstr = arr.join("");
        var workbook = XLSX.read(bstr, { type: "binary" });
        var first_sheet_name = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[first_sheet_name];
        console.log(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
        var arraylist = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      };
    }
  };

  return (
    <>
      <div className="h-screen font-sans text-gray-900 bg-gray-300 border-box">
        <div className="flex justify-center w-full mx-auto sm:max-w-lg">
          <div className="flex flex-col items-center justify-center w-full h-auto my-20 bg-white sm:w-3/4 sm:rounded-lg sm:shadow-xl">
            <div className="mt-10 mb-10 text-center">
              <h2 className="text-2xl font-semibold mb-2">Upload your files</h2>
              <p className="text-xs text-gray-500">
                File should be of format .csv .xlsx .xls
              </p>
            </div>
            <form
              action="#"
              className="relative w-4/5 h-32 max-w-xs mb-10 bg-white bg-gray-100 rounded-lg shadow-inner"
            >
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept=".csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                onChange={(event) => {
                  onChange(event);
                }}
              />
              <ToastContainer />
              <label className="z-20 flex flex-col-reverse items-center justify-center w-full h-full cursor-pointer">
                <p className="z-10 text-xs font-light text-center text-gray-500">
                  Drag & Drop your files here
                </p>
                <svg
                  className="z-10 w-8 h-8 text-indigo-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
                </svg>
              </label>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default addUser;
