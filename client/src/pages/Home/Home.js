import { Link } from "react-router-dom";
import mesa from "../../imagenes/mesa.png";
import plato from "../../imagenes/plato1.png";
import plato2 from "../../imagenes/plato2.png";
import plato4 from "../../imagenes/plato4.png";
import "./Home.css";

export default function Home() {
  return (
    <div className="back">
      <a
        className="by"
        href="https://www.linkedin.com/in/toledo-fernando-266612245/"
        target="_blank"
      >
        By: Toledo
      </a>
      <div className="text">
        <h1>Welcome</h1>
        <h2>to Henry Food</h2>
      </div>
      <div className="toRecipes">
        <Link to="/recipes">
          <img data={plato} src={plato} alt="Plato" />
        </Link>
      </div>
      <img src={plato4} className="obj1" alt="" />
      <img src={plato2} className="obj2" alt="" />
      <img className="mesa" src={mesa} alt="mesaHenryFood" />
    </div>
  );
}
