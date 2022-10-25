import "./NotFound.css";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div>
      <h1>Not Found xd</h1>
      <Link to="/recipes">Ir al inicio</Link>
    </div>
  );
}
