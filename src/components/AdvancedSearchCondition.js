import { useState, useEffect } from "react";

const AdvancedSearchCondition = ({
  numOfElements,
  addConditionChanger,
  updateConditionChanger,
  removeConditionChanger,
  conditionIndex,
  condition,
}) => {
  const [category, setCategory] = useState("");
  const [text, setText] = useState("");
  const [operator, setOperator] = useState("");

  useEffect(() => {
    if (condition) {
      setCategory(condition.category);
      setText(condition.text);
      setOperator(condition.operator);
    }
  }, []);

  // const Validate = () => {
  //   if (conditionIndex != numOfElements - 1 && operator == "") return true;
  //   if (category == "" || text == "") return false;
  //   return true;
  // };

  const dodajUslov = () => {
    addConditionChanger();
  };

  const ukloniUslov = () => {
    removeConditionChanger(conditionIndex);
    console.log(conditionIndex);
  };

  const azurirajUslov = (category, text, operator) => {
    let uslov = {
      index: conditionIndex,
      category: category,
      content: text,
      operator: operator,
    };
    updateConditionChanger(uslov);
  };

  const removeDisabled = () => {
    return !(numOfElements > 1);
  };

  const handleSetCategory = (newValue) => {
    setCategory(newValue);
    azurirajUslov(newValue, text, operator);
  };

  const handleSetText = (newValue) => {
    setText(newValue);
    azurirajUslov(category, newValue, operator);
  };

  const handleSetOperator = (newValue) => {
    setOperator(newValue);
    azurirajUslov(category, text, newValue);
  };

  return (
    <>
      <div className="h-100 d-flex align-items-center container rounded bg-white">
        <div className="">
          <div className="md-5">
            <div className="row p-3 py-5">
              <div className="col">
                <div className="row mt-3">
                  <div className="col-md-12">
                    <label className="labels">Kategorija</label>
                    <select
                      id="InputCategory"
                      name="category"
                      className="form-control"
                      value={category}
                      onChange={(e) => handleSetCategory(e.target.value)}
                    >
                      <option value="" disabled>
                        Odaberite kategoriju
                      </option>
                      <option value="name">Ime potpisnika</option>
                      <option value="surname">Prezime potpisnika</option>
                      <option value="governmentName">Naziv vlade</option>
                      <option value="governmentType">Nivo uprave</option>
                      <option value="contractContent">Sadrzaj ugovora</option>
                      <option value="lawContent">Sadrzaj zakona</option>
                    </select>
                  </div>
                </div>
                {category != "" && (
                  <div className="row mt-3">
                    <div className="col-md-12">
                      <label className="labels">Tekst</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="..."
                        value={text}
                        onChange={(e) => handleSetText(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                {conditionIndex != numOfElements - 1 && (
                  <div className="row mt-3">
                    <div className="col-md-12">
                      <label className="labels">Operator</label>
                      <select
                        id="InputOperator"
                        name="operator"
                        className="form-control"
                        value={operator}
                        onChange={(e) => handleSetOperator(e.target.value)}
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
                )}
              </div>
              <div className="col">
                <div className="mt-5 text-center">
                  <button
                    onClick={(e) => ukloniUslov(e)}
                    disabled={removeDisabled()}
                    className="btn btn-danger profile-button"
                    type="button"
                  >
                    Ukloni uslov
                  </button>
                </div>
                <div className="mt-5 text-center">
                  <button
                    onClick={(e) => dodajUslov(e)}
                    // disabled={Validate()}
                    className="btn btn-primary profile-button"
                    type="button"
                  >
                    Dodaj uslov
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdvancedSearchCondition;
