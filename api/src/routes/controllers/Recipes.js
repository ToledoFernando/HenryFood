require("dotenv").config();
const { Recipe, Diets } = require("../../db");
const { getApiRecipe } = require("./ApiData");

const getAllData = async () => {
  try {
    const data = await getApiRecipe();
    const dataDb = await Recipe.findAll({
      include: {
        model: Diets,
        attributes: ["name"],
      },
    });
    const result = data.concat(dataDb);
    return result;
  } catch (error) {
    return error;
  }
};

const getRecipes = async (req, res) => {
  try {
    const { name } = req.query;
    if (name) {
      const recipe = await getAllData();

      const fil = recipe.filter((el) =>
        el.name.toLowerCase().includes(name.toLowerCase())
      );
      fil.length
        ? res.status(200).json({ fil })
        : res.status(404).json({ Error: "No se Encontro" });
    } else {
      const result = await getAllData();
      res.send(result);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ Error: "Ocurrio un error al obtener recetas" });
  }
};

const getRecipesByID = async (req, res) => {
  try {
    const { id } = req.params;
    const recipes = await getAllData();
    const filter = recipes.filter((el) => el.id == id);
    filter.length
      ? res.status(200).json(filter[0])
      : res.status(404).json({ Error: "Not found" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ Error: "Ocurrio un error al buscar por ID" });
  }
};

module.exports = { getRecipes, getRecipesByID };
