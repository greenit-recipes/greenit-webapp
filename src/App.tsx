import React from "react";
import "./App.css";
import "./index.css";
import { createBrowserHistory } from "history";
import { Route, Router, Switch } from "react-router-dom";
import RecipeListPage from "./pages/recipe/ListPage";
import LandingPage from "./pages/LandingPage";
import RecipeSinglePage from "./pages/recipe/SinglePage";
import PersonalizedSearch from "./pages/PersonalizedSearch";
import ContactPage from "./pages/ContactPage";
import WhyPage from "./pages/WhyPage";
import NotFoundPage from "./pages/misc/NotFoundPage";
import WorkshopPage from "./pages/WorkshopPage";
import ProfilPage from "./pages/ProfilPage";

const App: React.FC = () => {
  const history = createBrowserHistory();
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/why" component={WhyPage} />
        <Route exact path="/contact" component={ContactPage} />
        <Route exact path="/recipes" component={RecipeListPage} />
        <Route exact path="/recipes/:id" component={RecipeSinglePage} />
        <Route
          exact
          path="/personalizedSearch"
          component={PersonalizedSearch}
        />
        <Route exact path="/workshops" component={WorkshopPage} />
        <Route exact path="/profil" component={ProfilPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
};

export default App;
