import React from "react";
import "./App.css";
import "./index.css";
import { createBrowserHistory } from "history";
import { Route, Router, Switch } from "react-router-dom";
import RecipeListPage from "./pages/recipe/ListPage";
import LandingPage from "./pages/LandingPage";
import RecipeSinglePage from "./pages/recipe/SinglePage";
import PersonalizedSearch from "./pages/PersonalizedSearch";

const App: React.FC = () => {
  const history = createBrowserHistory();
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/recipes" component={RecipeListPage} />
        <Route exact path="/recipes/:id" component={RecipeSinglePage} />
        <Route
          exact
          path="/personalizedSearch"
          component={PersonalizedSearch}
        />
      </Switch>
    </Router>
  );
};

export default App;
