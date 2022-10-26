import axios from "axios";

export const GET_RECIPES = "GET_RECIPES";
export const CLEAN_DATA = "CLEAN_DATA";
export const GET_RECIPEBYNAME = "GET_RECIPEBYNAME";
export const GET_RECIPEBYID = "GET_RECIPEBYID";
export const GET_DIETS = "GET_DIETS";
export const FILTERASC = "FILTERASC";
export const FILTERSCORE = "FILTERSCORE";
export const FILTERTYPE = "FILTERTYPE";
export const GETDETAIL = "GETDETAIL";
export const POST_RECIPE = "POST_RECIPE";
export const GETBYDBAPI = "GETBYDBAPI";

export const getRecipes = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("http://192.168.1.13:3001/recipes");
      // console.log([data]);
      // console.log(data.concat());
      return dispatch({
        type: GET_RECIPES,
        payload: data,
      });
    } catch (error) {
      throw Error(error.message);
    }
  };
};

export const clean_data = () => {
  return (dispatch) => {
    return dispatch({
      type: CLEAN_DATA,
      payload: {},
    });
  };
};

export const get_recipeByName = (name) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `http://192.168.1.13:3001/recipes?name=${name}`
      );
      return dispatch({
        type: GET_RECIPEBYNAME,
        payload: data,
      });
    } catch (error) {
      return dispatch({
        type: GET_RECIPEBYNAME,
        payload: [],
      });
    }
  };
};

export const postRecipe = (newRecipe) => {
  return async (dispatch) => {
    try {
      const result = await axios.post("http://192.168.1.13:3001/recipes", {
        newRecipe,
      });
      return dispatch({
        type: POST_RECIPE,
        payload: result,
      });
    } catch (error) {
      throw Error(error.message);
    }
  };
};

export const get_recipeById = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `http://192.168.1.13:3001/recipes/${id}`
      );
      return dispatch({
        type: GET_RECIPEBYID,
        payload: data,
      });
    } catch (error) {
      throw Error(error.message);
    }
  };
};

export const get_Diets = () => {
  return async (dispatch) => {
    const { data } = await axios.get("http://192.168.1.13:3001/diets");
    return dispatch({
      type: GET_DIETS,
      payload: data,
    });
  };
};

export const filterASD = (payload) => {
  return {
    type: FILTERASC,
    payload,
  };
};

export const filterScore = (payload) => {
  return {
    type: FILTERSCORE,
    payload,
  };
};

export const filterDiets = (payload) => {
  return {
    type: FILTERTYPE,
    payload,
  };
};

export const getDetail = (payload) => {
  return {
    type: GETDETAIL,
    payload,
  };
};

export const getByDBAPI = (payload) => {
  return {
    type: GETBYDBAPI,
    payload,
  };
};
