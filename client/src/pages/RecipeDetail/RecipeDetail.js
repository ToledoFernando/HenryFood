import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./RecipeDetail.css";
import { useEffect } from "react";
import { getDetail } from "../../redux/actions/actions";

export default function RecipeDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const recipe = useSelector((state) => state.recipesDetailById);
  const histori = useHistory();

  useEffect(() => {
    dispatch(getDetail(id));
    console.log(recipe);
  }, [dispatch]);

  let dietas = recipe.diets;

  return (
    <div className="backDetail">
      <button className="VolverDetail" onClick={() => histori.goBack()}>
        Volver
      </button>
      {!recipe.name ? (
        <h1>404 NotFound :c</h1>
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
                {!dietas[0].name
                  ? dietas.map((e) => <p key={e}>{e}</p>)
                  : dietas.map((e) => <p key={e.id}>{e.name}</p>)}
              </div>
            </div>
          </div>
          <p name="summary" className="summary">
            {recipe.summary}
          </p>
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
