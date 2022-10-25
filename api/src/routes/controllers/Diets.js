require("dotenv").config();
const { Diets } = require("../../db");
const { getApiDiets } = require("./ApiData");

const getAllDiets = async (req, res) => {
  try {
    const resultados = await Diets.findAll();
    if (resultados.length == 0) {
      const result = await getApiDiets();
      return res.json(result);
    }
    res.json(resultados);
  } catch (error) {
    console.log(error);
    res.status(400).json({ Error: "Ocurrio un error al obtener las Dietas" });
  }
};
module.exports = {
  getAllDiets,
};
