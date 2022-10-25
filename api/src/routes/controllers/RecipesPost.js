const { Recipe } = require("../../db");

const postRecipes = async (req, res) => {
  const { image, name, diets, summary, healthyScore, dishTypes, steps } =
    req.body.newRecipe;
  console.log(req.body.newRecipe);
  try {
    if (
      image.length === 0 ||
      name.length === 0 ||
      diets.length === 0 ||
      summary.length === 0 ||
      healthyScore.length === 0 ||
      dishTypes.length === 0 ||
      steps.length === 0
    )
      throw Error("Faltan Datos");
    const newRecipe = await Recipe.create({
      image,
      name,
      summary,
      healthyScore,
      dishTypes,
      steps,
      diets,
    });
    await newRecipe.addDiets(diets);
    res.status(201).json({ msg: "Creado con exito" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ Error: "Ocurrio un error al crear" });
  }
};

module.exports = {
  postRecipes,
};
