import { useState } from "react";
import Swal from "sweetalert2";

import axios from "axios";
import CandidateList from "./CandidateList";

const Search = () => {
  const [text, setText] = useState("");
  const [phraseQuery, setPhraseQuery] = useState(false);
  const [isPending, setIsPending] = useState(false);

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
        setText("");
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: res.data.response,
        });
        console.log(res.data);
      }
    });
  };

  const handleChangePhraseQuery = () => {
    setPhraseQuery(!phraseQuery);
  };

  return (
    <>
      <div className="h-100 d-flex justify-content-center align-items-center container rounded bg-white">
        <div className="">
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

              <div className="row mt-3">
                <div className="col-md-12">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={phraseQuery}
                      onChange={handleChangePhraseQuery}
                      id="flexCheckDefault"
                    />
                    <label className="form-check-label">Phrase Query</label>
                  </div>
                </div>
              </div>
              <div className="mt-5 text-center">
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
