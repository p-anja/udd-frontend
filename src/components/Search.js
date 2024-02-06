import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const Search = () => {
  const [text, setText] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [results, setResults] = useState([]);
  const propertiesToCheck = [
    "name",
    "surname",
    "governmentName",
    "governmentType",
    "contractContent",
    "lawContent",
  ];

  const Validate = () => {
    if (text === "") return true;
    return false;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    setIsPending(true);
    const dto = {
      keywords: [text],
    };

    axios.post(axios.defaults.baseURL + "search/simple", dto).then((res) => {
      if (res.data.error) {
        setIsPending(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: res.data.error,
        });
      } else {
        setIsPending(false);
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: res.data.response,
        });
        setResults(res.data.content);
      }
    });
  };

  const downloadFile = async (fileName) => {
    try {
      const response = await axios.get(
        axios.defaults.baseURL + "file/" + fileName,
        {
          responseType: "arraybuffer", // Set responseType to arraybuffer
        }
      );
      const blob = new Blob([response.data]);

      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName; // Set the filename for the download
      document.body.appendChild(a);

      // Trigger the download
      a.click();

      // Remove the download link
      document.body.removeChild(a);

      // Revoke the Object URL to free up resources
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error downloading file",
      });
    }
  };

  useEffect(() => {
    setResults([]);
  }, [text]);

  return (
    <>
      <div className="h-100 w-100 d-flex justify-content-center align-items-center container rounded bg-white">
        <div className="w-100">
          <div className="md-5">
            <div className="p-3 py-5">
              <div className="mb-3">
                <h4 className="text-right">Pretraga</h4>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <label className="labels">Tekst</label>
                  <input
                    type="text"
                    className="form-control"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-5 mb-5 text-center">
                {isPending && <label>Pretraga je u toku...</label>}
                {!isPending && (
                  <button
                    onClick={(e) => onSubmit(e)}
                    disabled={Validate()}
                    className="btn btn-primary profile-button"
                    type="button"
                  >
                    Potvrda
                  </button>
                )}
              </div>
              {!!results.length &&
                results.map((result) => {
                  let contentToShow = "";
                  let fileName = "";
                  for (let prop of propertiesToCheck) {
                    if (
                      result[prop] &&
                      result[prop].toLowerCase().includes(text.toLowerCase())
                    ) {
                      contentToShow = result[prop];
                      if (result[prop] == "lawContent")
                        fileName = result["lawFilename"];
                      else fileName = result["contractFilename"];
                    }
                  }
                  return (
                    <div className="border p-5 w-50" key={uuidv4()}>
                      <p>
                        {result["highlight"]
                          ? result["highlight"]
                          : contentToShow.substring(0, 600)}{" "}
                        ...
                      </p>
                      <button
                        className="btn btn-secondary"
                        onClick={() => downloadFile(fileName)}
                      >
                        Preuzmi
                      </button>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
