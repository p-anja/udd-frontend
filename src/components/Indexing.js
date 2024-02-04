import { useState } from "react";
import Swal from "sweetalert2";

import axios from "axios";

const Indexing = () => {
  const [contract, setContract] = useState(null);
  const [law, setLaw] = useState(null);

  const [isPending, setIsPending] = useState(false);

  const Validate = () => {
    if (contract === null || law === null) {
      return true;
    }
    return false;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    setIsPending(true);
    const contractFileInput = document.querySelector("#contractInput");
    const lawFileInput = document.querySelector("#lawInput");

    let formData = new FormData();
    formData.append("contract", contractFileInput.files[0]);
    formData.append("law", lawFileInput.files[0]);
    axios
      .post(axios.defaults.baseURL + "index/create", formData)
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
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: res.data.response,
          });
        }
      });
  };

  return (
    <div className="h-100 d-flex justify-content-center align-items-center container rounded bg-white">
      <div className="">
        <div className="md-5">
          <div className="row mt-3">
            <div className="col-md-6">
              <label className="labels">Ugovor</label>
              <input
                enctype="multipart/form-data"
                type="file"
                accept="application/pdf"
                className="form-control"
                id="contractInput"
                value={contract}
                onChange={(e) => setContract(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="labels">Zakon</label>
              <input
                enctype="multipart/form-data"
                type="file"
                accept="application/pdf"
                className="form-control"
                id="lawInput"
                value={law}
                onChange={(e) => setLaw(e.target.value)}
              />
            </div>
          </div>
          <div className="p-3 py-5">
            <div className="mt-5 text-center">
              {isPending && <label>Dodavanje je u toku...</label>}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Indexing;
