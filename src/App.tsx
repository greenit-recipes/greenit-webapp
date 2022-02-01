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
import ActivateAccount from "pages/activate";
import PrivateRoute from "components/route/PrivateRoute";
import PublicRoute from "components/route/PublicRoute";
import CreateRecipe from "pages/CreateRecipe/CreateRecipe";
import RecipeSinglePage from "pages/recipe/SinglePage/SinglePage";
import ForgetPassword from "pages/Login/ForgetPassword";
import ActivateResetPassword from "pages/ActivateResetPassword";
import RecipeCreatedPage from "pages/CreateRecipe/CreateRecipeSuccess";
import AccountCreated from "pages/AccountCreated";
import IngredientPage from "pages/IngredientSpace/IngredientPage"
import StarterPage from "pages/StarterPage";

export const history = createBrowserHistory();

export const RouteName = {
  resetPassword: "/reinitialisation-mot-de-passe",
  tokenActivationAccount: "/activate/:tokenActivationAccount",
  accountCreated: "/compte-crée",
  activateResetPassword: "/activate/mot-de-passe-oublié/:tokenActivationAccount",
  register: "/creation-compte",
  recipeCreated: "/ajout-recette",
  workshops: "/ateliers",
  ingredientPage: "/ingredients",
  starterPage: "/page-debutant-diy",
  why: "/projet",
  contact: "/contact",
  recipes: "/recettes",
  createRecipe: "/creation-recette",
  profil: "/profil",
  connexion: "/connexion",
};

const App: React.FC = () => {
  return (
    <Router history={history}>
      <Switch>
        <PublicRoute path="/" component={LandingPage} exact />
        <PublicRoute path={RouteName.why} component={WhyPage} exact />
        <PublicRoute path={RouteName.contact} component={ContactPage} exact />
        <PublicRoute path={RouteName.recipes} component={RecipeListPage} exact />
        <PublicRoute path="/recettes/:name/:id" component={RecipeSinglePage} exact />
        <PublicRoute
          path="/personalizedSearch"
          component={PersonalizedSearch}
          exact
        />
        <PublicRoute path={RouteName.ingredientPage} component={IngredientPage} exact />
        <PublicRoute path={RouteName.workshops} component={WorkshopPage} exact />
        <PublicRoute path={RouteName.starterPage} component={StarterPage} exact />
        <PrivateRoute
          path={RouteName.createRecipe}
          component={CreateRecipe}
          exact
        />
        <PrivateRoute
          path={RouteName.recipeCreated}
          component={RecipeCreatedPage}
          exact
        />
        <Route exact path={RouteName.register} component={Register} />
        <Route exact path={RouteName.connexion} component={Login} />
        <Route
          exact
          path={RouteName.resetPassword}
          component={ForgetPassword}
        />
        <PrivateRoute component={ProfilPage} path={RouteName.profil} exact />
        <Route
          exact
          path={RouteName.tokenActivationAccount}
          component={ActivateAccount}
        />
                <Route
          exact
          path={RouteName.accountCreated}
          component={AccountCreated}
        />
        <Route
          exact
          path={RouteName.activateResetPassword}
          component={ActivateResetPassword}
        />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
};

export default App;
