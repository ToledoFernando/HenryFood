import { useEffect } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import NotFound from "./components/notFound/NotFound";
import RecipeDetail from "./pages/RecipeDetail/RecipeDetail";
import Recipes from "./pages/Recipes/Recipes";
import CreateRecipe from "./pages/CreateRecipe/CreateRecipe";

function App() {
  useEffect(() => {});
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/recipes">
          <Recipes />
        </Route>

        <Route exact path="/recipe/:id">
          <RecipeDetail />
        </Route>

        <Route exact path="/createRecipe">
          <CreateRecipe />
        </Route>

        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
