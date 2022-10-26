import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes, get_Diets } from "../../redux/actions/actions";
import { store } from "../../redux/store/store";
import React from "react";
import icono from "../../imagenes/icono.png";
import Card from "../../components/cards/Cards";
import { Paginado } from "../../components/Paginado/Paginado";
import "./Recipes.css";

export default function Recipes() {
  const dispatch = useDispatch();

  const recetas = useSelector((state) => {
    return state.recipes;
  });

  //Paginas
  const [pagActual, setPagActual] = useState(1);
  const [cantidad] = useState(9);
  const final = cantidad * pagActual;
  const inicio = final - cantidad;
  const allPage = recetas.slice(inicio, final);

  const CambiarPag = (num) => {
    setPagActual(num);
  };

  useEffect(() => {
    dispatch(get_Diets());
    dispatch(getRecipes()).then(() => console.log(store.getState()));
  }, [dispatch]);

  return (
    <div>
      <span className="RecipeContent"></span>
      <span className="shadow"></span>
      <span className="backRecipe"></span>
      {!recetas.length ? null : (
        <Paginado total={recetas.length} set={CambiarPag} cantidad={cantidad} />
      )}
      <div className="contentCards">
        {!allPage.length ? (
          <div className="cargando">
            <img src={icono} className="icono" alt="" />
            <div className="race-by"></div>
          </div>
        ) : allPage[0] === "Not Found" ? (
          <h1 className="SinRecetas">Sin Recetas :c</h1>
        ) : (
          allPage.map((K) => (
            <Card
              key={K.id}
              id={K.id}
              name={K.name || "aoiwndoiawnd"}
              image={K.image}
              diets={K.diets}
              score={K.healthyScore}
            />
          ))
        )}
      </div>
    </div>
  );
}
