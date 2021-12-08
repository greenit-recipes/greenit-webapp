import React from "react";
import "./App.css";
import "./index.css";
import { createBrowserHistory } from "history";
import { Route, Router, Switch } from "react-router-dom";
import RecipeListPage from "./pages/recipe/ListPage/ListPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import PersonalizedSearch from "./pages/PersonalizedSearch";
import ContactPage from "./pages/ContactPage";
import WhyPage from "./pages/WhyPage";
import NotFoundPage from "./pages/misc/NotFoundPage";
import WorkshopPage from "./pages/WorkshopPage";
import ProfilPage from "./pages/Profil/ProfilPage";
import Register from "./pages/Register/register";
import Login from "pages/Login/Login";
import Activate from "pages/activate";
import PrivateRoute from "components/route/PrivateRoute";
import PublicRoute from "components/route/PublicRoute";
import CreateRecipe from "pages/CreateRecipe/CreateRecipe";
import RecipeSinglePage from "pages/recipe/SinglePage/SinglePage";
import ForgetPassword from "pages/Login/ForgetPassword";
import ActivateResetPassword from "pages/ActivateResetPassword";
import RecetteCrééePage from "pages/CreateRecipe/CreateRecipeSuccess";

export const history = createBrowserHistory();

export const RouteName = {
  resetPassword: "/mot-de-passe-oublié",
};

const App: React.FC = () => {
  return (
    <Router history={history}>
      <Switch>
        <PublicRoute path="/" component={LandingPage} exact />
        <PublicRoute path="/why" component={WhyPage} exact />
        <PublicRoute path="/contact" component={ContactPage} exact />
        <PublicRoute path="/recipes" component={RecipeListPage} exact />
        <PublicRoute path="/recipes/:id" component={RecipeSinglePage} exact />
        <PublicRoute
          path="/personalizedSearch"
          component={PersonalizedSearch}
          exact
        />
        <PublicRoute path="/workshops" component={WorkshopPage} exact />
        <PrivateRoute
          path="/créer-une-recette"
          component={CreateRecipe}
          exact
        />
        <PrivateRoute
          path="/recette-créée"
          component={RecetteCrééePage}
          exact
        />
        <Route exact path="/register" component={Register} />
        <Route exact path="/connexion" component={Login} />
        <Route
          exact
          path={RouteName.resetPassword}
          component={ForgetPassword}
        />
        <PrivateRoute component={ProfilPage} path="/profil" exact />
        <Route
          exact
          path="/activate/:tokenActivationAccount"
          component={Activate}
        />
        <Route
          exact
          path="/activate/mot-de-passe-oublié/:tokenActivationAccount"
          component={ActivateResetPassword}
        />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
};

export default App;
