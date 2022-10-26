import {
  GET_DIETS,
  GET_RECIPEBYID,
  CLEAN_DATA,
  GET_RECIPEBYNAME,
  GET_RECIPES,
  FILTERASC,
  FILTERSCORE,
  FILTERTYPE,
  GETDETAIL,
  POST_RECIPE,
  GETBYDBAPI,
} from "../actions/actions";

const initialState = {
  recipes: [],
  recipesCopy: [],
  diets: [],
  recipesDetailById: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_DIETS:
      return {
        ...state,
        diets: action.payload,
      };
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        recipesCopy: action.payload,
      };
    case GET_RECIPEBYID:
      return {
        ...state,
        recipesDetailById: action.payload,
      };
    case GET_RECIPEBYNAME:
      return {
        ...state,
        recipes: action.payload.fil,
      };
    case CLEAN_DATA:
      return {
        ...state,
        recipesDetailById: {},
      };
    case FILTERASC:
      let result = [];

      if (action.payload === "ASD") {
        result = state.recipes.sort((a, p) => {
          if (a.name < p.name) return -1;
          if (a.name > p.name) return 1;
          return 0;
        });
      } else {
        result = state.recipes.sort((a, p) => {
          if (a.name > p.name) return -1;
          if (a.name < p.name) return 1;
          return 0;
        });
      }

      return {
        ...state,
        recipes: [...result],
      };
    case FILTERSCORE:
      let filtrado = [];

      if (action.payload === "min") {
        filtrado = state.recipes.sort((a, p) => {
          if (a.healthyScore < p.healthyScore) return -1;
          if (a.healthyScore > p.healthyScore) return 1;
          return 0;
        });
      } else {
        filtrado = state.recipes.sort((a, p) => {
          if (a.healthyScore > p.healthyScore) return -1;
          if (a.healthyScore < p.healthyScore) return 1;
          return 0;
        });
      }

      return {
        ...state,
        recipes: [...filtrado],
      };

    case FILTERTYPE:
      const allRecipe = state.recipesCopy;
      const filtroDiet =
        action.payload === "All"
          ? allRecipe
          : allRecipe.filter((e) => e.diets.includes(action.payload));
      return {
        ...state,
        recipes: [...filtroDiet],
      };

    case GETDETAIL:
      const recipes = state.recipesCopy;
      const recipe = recipes.filter((e) => e.id === action.payload);
      return {
        ...state,
        recipesDetailById: recipe[0],
      };

    case POST_RECIPE:
      return {
        ...state,
      };
    case GETBYDBAPI:
      let all = state.recipesCopy;
      let filt = [];
      console.log(action.payload);
      if (action.payload === "DB") filt = all.filter((e) => e.db);
      else if (action.payload === "API") filt = all.filter((e) => !e.db);
      else filt = all;
      // console.log(filt.length);
      if (!filt.length) filt.push("Not Found");
      return {
        ...state,
        recipes: filt,
      };
    default:
      return state;
  }
}
