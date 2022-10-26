import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { get_Diets, postRecipe } from "../../redux/actions/actions";
import "./CreateRecipe.css";

const initial = {
  dishTypes: "",
  name: "",
  summary: "",
  healthyScore: 0,
  steps: "",
  image: "",
  diets: [],
};

export default function CreateRecipe() {
  const diets = useSelector((state) => state.diets);
  const dispatch = useDispatch();
  const histori = useHistory();
  const [Ds, setDs] = useState([]);

  const [type, setType] = useState(true);
  const [input, setInput] = useState(initial);

  useEffect(() => {
    dispatch(get_Diets());
  }, [dispatch]);

  const HandleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const HandleSelect = (e) => {
    if (!input.diets.includes(e.target.value)) {
      setInput({ ...input, diets: [...input.diets, e.target.value] });
      let result = diets.filter((a) => a.id == e.target.value);
      setDs([...Ds, result[0]]);
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
      .then((e) => {
        setInput(initial);
        alert("Producto Agregado con exito");
        histori.goBack();
      })
      .catch((err) => {
        console.log(err);
        alert("Ocurrio un error");
      });
  };

  const validator =
    input.name.length < 5 ||
    input.image.length < 10 ||
    input.summary.length < 15 ||
    !input.diets[0] ||
    input.healthyScore > 100 ||
    input.healthyScore < 0 ||
    input.dishTypes.length < 3 ||
    input.steps.length < 15;

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
          {input.image.length <= 9 ? (
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
          {input.name.length <= 4 ? (
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
          {input.summary.length <= 14 ? (
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
              min="0"
              max="100"
              onChange={HandleChange}
              value={input.healthyScore}
            />
          )}
          {input.healthyScore >= 101 ? (
            <p className="Error">Maximo de 100</p>
          ) : (
            <label className="ScoreLabel">{input.healthyScore}</label>
          )}
          {input.healthyScore < 0 || input.healthyScore.length === 0 ? (
            <p className="Error"> Minimo de 0</p>
          ) : null}

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
          <label className="info">Diets: </label>
          <select name="diets" className="diets" onChange={HandleSelect}>
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
                  <div key={e.id}>
                    <div className="dietAdd">
                      <p>{e.name}</p>
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
              disabled={validator}
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
