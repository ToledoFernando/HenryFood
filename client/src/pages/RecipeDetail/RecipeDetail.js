import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import icono from "../../imagenes/icono.png";
import "./RecipeDetail.css";
import { useEffect } from "react";
import { clean_data, get_recipeById } from "../../redux/actions/actions";
import NotFound from "../../components/notFound/NotFound";

export default function RecipeDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const recipe = useSelector((state) => state.recipesDetailById);
  const histori = useHistory();

  useEffect(() => {
    dispatch(get_recipeById(id));
  }, [dispatch]);

  const volver = () => {
    dispatch(clean_data());
    histori.goBack();
  };

  return !recipe ? (
    <NotFound />
  ) : (
    <div className="backDetail">
      <button className="VolverDetail" onClick={volver}>
        Volver
      </button>
      {!recipe.name ? (
        <div className="cargando">
          <img src={icono} className="icono" alt="" />
          <div className="race-by"></div>
          <p>Loading...</p>
        </div>
      ) : (
        <div className="detail">
          <div className="principal">
            <img src={recipe.image} alt={recipe.name} />
            <div className="data">
              <div className="uno">
                <h1>{recipe.name}</h1>
                <h4>Health Score</h4>
                <p>{recipe.healthyScore}</p>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={recipe.healthyScore}
                  disabled
                />
              </div>
              <div>
                <h2>DishTypes</h2>
                {Array.isArray(recipe.dishTypes) ? (
                  recipe.dishTypes.map((e) => <p key={e}>{e}</p>)
                ) : (
                  <p>{recipe.dishTypes}</p>
                )}
              </div>
              <div>
                <h3>Diets</h3>
                {!recipe.diets[0].name
                  ? recipe.diets.map((e) => <p key={e}>{e}</p>)
                  : recipe.diets.map((e) => <p key={e.id}>{e.name}</p>)}
              </div>
            </div>
          </div>
          <div name="summary" className="summary">
            {recipe.summary.replace(/<[^>]*>/g, "")}
          </div>
          {Array.isArray(recipe.steps) ? (
            recipe.steps.map((e) => {
              return (
                <div key={e.number}>
                  <label className="stepsN">Number: {e.number}</label>{" "}
                  <p className="stepData">{e.step}</p>
                </div>
              );
            })
          ) : (
            <p className="soloStep">{recipe.steps}</p>
          )}
        </div>
      )}
    </div>
  );
}
