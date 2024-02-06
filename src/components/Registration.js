import { useState } from "react";
import Swal from "sweetalert2";

import axios from "axios";

const Registration = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState("");

  const [isPending, setIsPending] = useState(false);

  const Validate = () => {
    if (name == "" || type == "" || address == "" || city == "") {
      return true;
    }
    return false;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    setIsPending(true);

    axios
      .post(axios.defaults.baseURL + "government", {
        governmentName: name,
        type: type,
        city: city,
        address: address,
        username: username,
        password: password,
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
          setAddress("");
          setCity("");
          setUsername("");
          setName("");
          setType("");
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
          <div className="p-3 py-5">
            <div className="mb-3">
              <h4 className="text-right">Registracija vlade</h4>
            </div>
            <div className="row mt-3">
              <div className="col-md-6">
                <label className="labels">Ime</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label className="labels">Korisničko ime</label>
                <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12">
                <label className="labels">Lozinka</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6">
                <label className="labels">Ulica</label>
                <input
                  type="text"
                  className="form-control"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label className="labels">Grad</label>
                <input
                  type="text"
                  className="form-control"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12">
                <label className="labels">Nivo</label>
                <select
                  id="InputStepen"
                  name="degree"
                  className="form-control"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="" disabled>
                    Odaberite nivo uprave
                  </option>
                  <option value="municipal">muncipal</option>
                  <option value="city">city</option>
                  <option value="provincial">provincial</option>
                  <option value="state">state</option>
                </select>
              </div>
            </div>

            <div className="mt-5 text-center">
              {isPending && <label>Registracija je u toku...</label>}
              {!isPending && (
                <button
                  onClick={(e) => onSubmit(e)}
                  disabled={Validate()}
                  className="btn btn-primary profile-button"
                  type="button"
                  style={{ backgroundColor: "gray", color: "white", fontSize: "16px" }}

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

export default Registration;
