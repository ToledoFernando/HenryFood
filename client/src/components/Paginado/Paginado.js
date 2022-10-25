import { useDispatch } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  filterASD,
  filterDiets,
  filterScore,
  getByDBAPI,
  getRecipes,
  get_recipeByName,
} from "../../redux/actions/actions";
import { store } from "../../redux/store/store";
import "./Paginado.css";

export const Paginado = ({ total, cantidad, set, buscar }) => {
  const dispatch = useDispatch();

  const paginas = [];

  const [name, setname] = useState("");

  const HandleChange = (e) => {
    setname(e.target.value);
  };

  const handleSubmit = () => {
    !name.length ? dispatch(getRecipes()) : dispatch(get_recipeByName(name));
  };

  for (let i = 1; i <= Math.ceil(total / cantidad); i++) {
    paginas.push(i);
  }

  const FilterName = (e) => {
    dispatch(filterASD(e.target.value));
  };
  const FilterScore = (e) => {
    const xd = dispatch(filterScore(e.target.value));
    console.log(xd);
  };

  const FilterDiets = (e) => {
    dispatch(filterDiets(e.target.value));
  };

  const HandleView = (e) => {
    dispatch(getByDBAPI(e.target.value));
  };

  return (
    <nav className="NavBar">
      <Link className="BackHome" to="/">
        Inicio
      </Link>
      <h1>Welcome to Page Food</h1>
      <div className="opcionesFilt">
        <div className="Buscador">
          <form>
            <input type="text" name="Buscar" onChange={HandleChange} />
          </form>
          <input
            className="buscar"
            onClick={handleSubmit}
            type="submit"
            value="🔎"
          />
        </div>
        <div className="FiltrosBasic">
          <select
            className="FiltroASDDES"
            onChange={FilterName}
            defaultValue="default"
          >
            <option value="default" disabled>
              Ordenar por Nombre
            </option>
            <option value="ASD">ASC</option>
            <option value="DES">DES</option>
          </select>

          <select onChange={FilterScore} defaultValue="default">
            <option value="default" disabled>
              Ordenar por puntaje
            </option>
            <option value="min">Min - Max</option>
            <option value="max">Max - Min</option>
          </select>

          <select onChange={FilterDiets} defaultValue="default">
            <option value="default" disabled>
              Tipo de Dieta
            </option>
            <option value="All">All</option>
            {store.getState().diets.map((e) => {
              return (
                <option value={e.name} key={e.id}>
                  {e.name}
                </option>
              );
            })}
          </select>
        </div>

        <select name="DBAPI" onChange={HandleView}>
          <option value="ALL">All</option>
          <option value="DB">DataBase</option>
          <option value="API">API</option>
        </select>
        <Link className="CrearReceta" to="/createRecipe">
          Create recipe
        </Link>
      </div>

      <div className="paginas">
        {paginas.map((e) => (
          <button
            className="PaginaN"
            onClick={() => set(e)}
            key={e}
            type="button"
            value={e}
          >
            {e}
          </button>
        ))}
      </div>
    </nav>
  );
};
