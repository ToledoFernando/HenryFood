const { Router } = require("express");
const { getAllDiets } = require("./controllers/Diets");
const { getRecipes, getRecipesByID } = require("./controllers/Recipes");
const { postRecipes } = require("./controllers/RecipesPost");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/diets", getAllDiets);
router.get("/recipes", getRecipes);
router.get("/recipes/:id", getRecipesByID);
router.post("/recipes", postRecipes);

module.exports = router;
