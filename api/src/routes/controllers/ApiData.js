const axios = require("axios");
require("dotenv").config();
const { Diets } = require("../../db");
const { API } = process.env;

const getApiDiets = async (req, res) => {
  try {
    const { data } = await axios(API);
    const dietas = data.results.map((e) => e.diets);
    dietas.flat().map(async (dieta) => {
      await Diets.findOrCreate({
        where: {
          name: dieta,
        },
      });
    });
    const result = await Diets.findAll();
    return result;
  } catch (error) {
    console.log(error);
    res.status(400).json({ Error: "Ocurrio un error al obtener las Dietas" });
  }
};

const getApiRecipe = async () => {
  try {
    const apiUrl = await axios.get(API);

    const apiData = apiUrl.data.results.map((recipes) => {
      return {
        id: recipes.id.toString(),
        image: recipes.image,
        name: recipes.title.toLowerCase(),
        diets: recipes.diets,
        summary: recipes.summary,
        healthyScore: recipes.healthScore,
        dishTypes: recipes.dishTypes,
        steps: recipes.analyzedInstructions[0]?.steps.map((s) => {
          return {
            number: s.number,
            step: s.step,
          };
        }),
      };
    });
    return apiData;
  } catch (e) {
    console.log(error);
    res.status(400).json({ Error: "Ocurrio un error al obtener las recetas" });
  }
};

module.exports = {
  getApiRecipe,
  getApiDiets,
};
