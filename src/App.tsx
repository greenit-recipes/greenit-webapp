import React from "react";
import "./App.css";
import "./index.css";
import { createBrowserHistory } from "history";
import { Route, Router, Switch } from "react-router-dom";
import RecipeListPage from "./pages/recipe/ListPage";
import LandingPage from "./pages/LandingPage";

const App: React.FC = () => {
  const history = createBrowserHistory();
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/recipes" component={RecipeListPage} />
      </Switch>
    </Router>
  );
};

export default App;
