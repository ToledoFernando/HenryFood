import { Link } from "react-router-dom";
import "./Cards.css";

export default function Card({ id, name, image, diets, score }) {
  if (!diets.length) diets = ["Sin Dietas"];
  else if (diets[0].name) diets = diets.map((e) => e.name);

  return (
    <div id={id} className="Card">
      <Link to={`/recipe/${id}`}>
        <p className="titulo">{name}</p>
        <img src={image} className="imgRecipe" />
        <p>Type Diets: </p>
        <p>{diets}</p>
        <br />
        <p>HealthyScore: {score}</p>
      </Link>
    </div>
  );
}
