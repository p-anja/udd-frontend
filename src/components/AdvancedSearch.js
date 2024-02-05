import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";

const AdvancedSearch = () => {
  const [isPending, setIsPending] = useState(false);
  const [firstCategory, setFirstCategory] = useState("");
  const [secondCategory, setSecondCategory] = useState("");
  const [firstText, setFirstText] = useState("");
  const [secondText, setSecondText] = useState("");
  const [operator, setOperator] = useState("");
  const [results, setResults] = useState([]);

  const propertiesToCheck = [
    "name",
    "surname",
    "governmentName",
    "governmentType",
    "contractContent",
    "lawContent",
  ];

  const onSubmit = async (e) => {
    e.preventDefault();

    setIsPending(true);

    axios
      .post(axios.defaults.baseURL + "search/advanced", {
        keywords: [
          `${firstCategory}:${firstText}`,
          operator,
          `${secondCategory}:${secondText}`,
        ],
      })
      .then((res) => {
        if (res.data.error) {
          setIsPending(false);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: res.data.error,
          });
        } else {
          setIsPending(false);
          setResults(res.data.content);
        }

        console.log(res);
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

  return (
    <div className="container rounded bg-white mt-5 mb-5">
      <div className="row">
        <div className="col-md-5 border-right">
          <div className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center mb-3 px-3">
              <h4 className="text-right">Napredna pretraga</h4>
            </div>

            <div className="h-100 d-flex align-items-center container rounded bg-white">
              <div className="col">
                <div className="row mt-3">
                  <div className="col-md-12">
                    <label className="labels">Kategorija</label>
                    <select
                      id="InputCategory"
                      name="firstCategory"
                      className="form-control"
                      value={firstCategory}
                      onChange={(e) => setFirstCategory(e.target.value)}
                    >
                      <option value="" disabled>
                        Odaberite kategoriju
                      </option>
                      <option value="name">Ime potpisnika</option>
                      <option value="surname">Prezime potpisnika</option>
                      <option value="governmentName">Naziv vlade</option>
                      <option value="governmentType">Nivo uprave</option>
                      <option value="contractContent">Sadrzaj ugovora</option>
                    </select>
                  </div>
                </div>
                {firstCategory != "" && (
                  <div className="row mt-3">
                    <div className="col-md-12">
                      <label className="labels">Tekst</label>
                      <input
                        type="firstText"
                        className="form-control"
                        placeholder="..."
                        value={firstText}
                        onChange={(e) => setFirstText(e.target.value)}
                      />
                    </div>
                  </div>
                )}
                <div className="row mt-3">
                  <div className="col-md-12">
                    <label className="labels">Operator</label>
                    <select
                      id="InputOperator"
                      name="operator"
                      className="form-control"
                      value={operator}
                      onChange={(e) => setOperator(e.target.value)}
                    >
                      <option value="" disabled>
                        Odaberite logicki operator
                      </option>
                      <option value="AND">I</option>
                      <option value="OR">ILI</option>
                      <option value="NOT">NE</option>
                    </select>
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-md-12">
                    <label className="labels">Kategorija</label>
                    <select
                      id="InputCategory"
                      name="secondCategory"
                      className="form-control"
                      value={secondCategory}
                      onChange={(e) => setSecondCategory(e.target.value)}
                    >
                      <option value="" disabled>
                        Odaberite kategoriju
                      </option>
                      <option value="name">Ime potpisnika</option>
                      <option value="surname">Prezime potpisnika</option>
                      <option value="governmentName">Naziv vlade</option>
                      <option value="governmentType">Nivo uprave</option>
                      <option value="contractContent">Sadrzaj ugovora</option>
                    </select>
                  </div>
                </div>
                {secondCategory != "" && (
                  <div className="row mt-3">
                    <div className="col-md-12">
                      <label className="labels">Tekst</label>
                      <input
                        type="secondText"
                        className="form-control"
                        placeholder="..."
                        value={secondText}
                        onChange={(e) => setSecondText(e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-5 text-center">
              {isPending && <label>Pretraga je u toku...</label>}
              {!isPending && (
                <button
                  onClick={(e) => onSubmit(e)}
                  className="btn btn-primary profile-button"
                  type="button"
                  disabled={
                    firstCategory == "" ||
                    secondCategory == "" ||
                    firstText == "" ||
                    secondText == "" ||
                    operator == ""
                  }
                >
                  Potvrda
                </button>
              )}
            </div>
          </div>
          {!!results.length &&
            results.map((result) => {
              return (
                <div className="border p-5 w-100" key={uuidv4()}>
                  <p>{result.contractContent.substring(0, 600)} ...</p>
                  <button
                    className="btn btn-secondary"
                    onClick={() => downloadFile(result.contractFilename)}
                  >
                    Preuzmi
                  </button>
                </div>
              );
            })}
        </div>
      </div>
      {/* <div className="row">
        {candidates && (
          <div className="m-5 p-4">
            <CandidateList candidates={candidates} />
          </div>
        )}
      </div> */}
    </div>
  );
};

export default AdvancedSearch;
