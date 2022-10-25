import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { get_Diets, postRecipe } from "../../redux/actions/actions";
import { store } from "../../redux/store/store";
import "./CreateRecipe.css";

export default function CreateRecipe() {
  const diets = useSelector((state) => state.diets);
  const dispatch = useDispatch();
  const histori = useHistory();
  const [Ds, setDs] = useState([]);

  const [type, setType] = useState(true);
  const [error, setError] = useState(false);
  const [input, setInput] = useState({
    dishTypes: "",
    name: "",
    summary: "",
    healthyScore: 0,
    steps: "",
    image: "",
    diets: [],
  });

  useEffect(() => {
    dispatch(get_Diets());
  }, [dispatch]);

  const HandleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setError(validator());
  };

  const HandleSelect = (e) => {
    if (!input.diets.includes(e.target.value)) {
      setInput({ ...input, diets: [...input.diets, e.target.value] });
      let result = diets.filter((a) => a.id == e.target.value);
      setDs([...Ds, result[0]]);
      setError(validator());
    } else {
      alert("Ya agregado");
    }
  };

  const DeleteDiet = (id) => {
    setInput({ ...input, diets: [...input.diets.filter((e) => e != id)] });
    setDs(Ds.filter((e) => e.id != id));
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    dispatch(postRecipe(input))
      .then((e) => alert("Producto Agregado con exito"))
      .catch((err) => {
        console.log(err);
        alert("Ocurrio un error");
      });
  };
  const validator = () => {
    let result = true;
    if (input.image.length === 0) {
      result = false;
    } else if (input.name.length === 0) {
      result = false;
    } else if (input.summary.length === 0) {
      result = false;
      console.log(input);
    } else if (
      Number(input.healthyScore) === 0 ||
      Number(input.healthyScore) > 100
    ) {
      result = false;
    } else if (input.dishTypes.length === 0) {
      result = false;
    } else if (input.diets.length === 0) {
      result = false;
    } else if (input.steps.length === 0) {
      result = false;
    }
    return result;
  };

  return (
    <div className="CreateRecipe">
      <button className="VolverHombe" onClick={() => histori.goBack()}>
        volver
      </button>
      <div className="contentForm">
        <h1>Create Food</h1>
        <form>
          <p className="info">URL IMAGE</p>
          <input
            type="text"
            name="image"
            autoComplete="off"
            onChange={HandleChange}
            placeholder="URL image"
            value={input.image}
          />
          {input.image.length < 7 ? (
            <p className="Error">Falta URL de imagen</p>
          ) : null}
          <p className="info">Name</p>
          <input
            type="text"
            name="name"
            autoComplete="off"
            onChange={HandleChange}
            placeholder="Name"
            value={input.name}
          />
          {input.name.length < 4 ? (
            <p className="Error">Falta un Nombre</p>
          ) : null}

          <p className="info">Summary</p>
          <textarea
            name="summary"
            cols="30"
            rows="8"
            placeholder="Summary"
            onChange={HandleChange}
            value={input.summary}
          ></textarea>
          {input.summary.length < 10 ? (
            <p className="Error">Falta Summary (Min 10 caracteres)</p>
          ) : null}

          <p className="info">
            <b>HealthyScore</b>
          </p>
          <input type="checkbox" name="xd" onChange={() => setType(!type)} />
          {type ? (
            <input
              className="Score"
              type="number"
              name="healthyScore"
              onChange={HandleChange}
              value={input.healthyScore}
            />
          ) : (
            <input
              type="range"
              name="healthyScore"
              max="100"
              onChange={HandleChange}
              value={input.healthyScore}
            />
          )}
          {input.healthyScore >= 101 ? (
            <p>Maximo de 100</p>
          ) : (
            <label className="ScoreLabel">{input.healthyScore}</label>
          )}

          <p className="info">DishTypes</p>
          <input
            type="text"
            autoComplete="off"
            name="dishTypes"
            onChange={HandleChange}
            placeholder="DishTypes"
            value={input.dishTypes}
          />
          <br />
          <select name="diets" onChange={HandleSelect}>
            {!diets.length ? (
              <option>Cargando...</option>
            ) : (
              diets.map((e) => {
                return (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                );
              })
            )}
          </select>
          <br />
          <div className="DietasAgregadas">
            <label>Dietas Agregadas</label>
            {!Ds
              ? null
              : Ds.map((e) => (
                  <div>
                    <div className="dietAdd">
                      <p key={e.id}>{e.name}</p>
                      <button
                        onClick={(a) => {
                          a.preventDefault();
                          DeleteDiet(e.id);
                        }}
                      >
                        X
                      </button>
                    </div>
                    <hr className="div" />
                  </div>
                ))}
          </div>

          <textarea
            name="steps"
            onChange={HandleChange}
            value={input.steps}
            cols="30"
            rows="10"
            placeholder="Steps x step"
          ></textarea>
          <br />
          <div className="divCreate">
            <input
              disabled={!error}
              className="create"
              type="submit"
              value="Create Recipe"
              onClick={HandleSubmit}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
