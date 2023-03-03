import { Loading } from "components";
import FullXPRoute from "components/route/FullXPRoute";
import PrivateRoute from "components/route/PrivateRoute";
import PublicRoute from "components/route/PublicRoute";
import { createBrowserHistory } from "history";
import LandingPage from "pages/LandingPage/LandingPage";
import React, { Suspense } from "react";
import { Route, Router, Switch } from "react-router-dom";
import "./App.css";
import "./index.css";

const AccountCreated = React.lazy(() => import("pages/AccountCreated"));
const ActivateAccount = React.lazy(() => import("pages/activate"));
const ActivateResetPassword = React.lazy(
  () => import("pages/ActivateResetPassword"),
);
const CreateRecipe = React.lazy(
  () => import("pages/CreateRecipe/CreateRecipe"),
);
const RecipeCreatedPage = React.lazy(
  () => import("pages/CreateRecipe/CreateRecipeSuccess"),
);

const ForgetPassword = React.lazy(() => import("pages/Login/ForgetPassword"));
const DeleteProfil = React.lazy(() => import("pages/Profil/DeleteProfil"));
const RecapPage = React.lazy(() => import("pages/RecapPage"));
const RecipeSinglePage = React.lazy(
  () => import("pages/recipe/SinglePage/SinglePage"),
);
const StarterPage = React.lazy(() => import("pages/StarterSpace/StarterPage"));
const ContactPage = React.lazy(() => import("./pages/ContactPage"));
const NotFoundPage = React.lazy(() => import("./pages/misc/NotFoundPage"));
const PersonalizedSearch = React.lazy(
  () => import("./pages/PersonalizedSearch"),
);
const ProfilPage = React.lazy(() => import("./pages/Profil/ProfilPage"));
const RecipeListPage = React.lazy(
  () => import("./pages/recipe/ListPage/ListPage"),
);
const Register = React.lazy(() => import("./pages/Register/register"));
const WhyPage = React.lazy(() => import("./pages/recipe/SinglePage/WhyPage"));

export const history = createBrowserHistory();

export const RouteName = {
  accueil: "/",
  resetPassword: "/reinitialisation-mot-de-passe", // no index
  tokenActivationAccount: "/activate/:tokenActivationAccount", // no index
  accountCreated: "/compte-crée", // no index
  activateResetPassword:
    "/activate/mot-de-passe-oublié/:tokenActivationAccount", // no index
  register: "/creation-compte",
  recipeCreated: "/ajout-recette", // no index
  starterPage: "/page-debutant-diy",
  why: "/projet",
  contact: "/contact",
  recipes: "/recettes",
  createRecipe: "/creation-recette",
  profil: "/profil",
  recap: "/recap",
  deleteProfil: "/supprimer-compte", // no index
};

const App: React.FC = () => {
  history.listen(x =>
    window.sessionStorage.setItem("pathname", JSON.stringify(x?.pathname)),
  );

  return (
    <Suspense fallback={<Loading />}>
      <Router history={history}>
        <Switch>
          <PublicRoute path={RouteName.accueil} component={LandingPage} exact />
          <PublicRoute path={RouteName.why} component={WhyPage} exact />
          <PublicRoute path={RouteName.contact} component={ContactPage} exact />
          <PublicRoute
            path={RouteName.recipes}
            component={RecipeListPage}
            exact
          />
          <PublicRoute
            path="/recettes/:name"
            component={RecipeSinglePage}
            exact
          />

          <PublicRoute
            path="/personalizedSearch"
            component={PersonalizedSearch}
            exact
          />
          <PublicRoute
            path={RouteName.starterPage}
            component={StarterPage}
            exact
          />
          <PrivateRoute
            path={RouteName.deleteProfil}
            component={DeleteProfil}
            exact
          />
          <PublicRoute
            path={RouteName.createRecipe}
            component={CreateRecipe}
            exact
          />
          <PublicRoute
            path={RouteName.recipeCreated}
            component={RecipeCreatedPage}
            exact
          />

          <Route exact path={RouteName.register} component={Register} />
          <Route exact path={RouteName.recap} component={RecapPage} />
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
    </Suspense>
  );
};
// SI VOUS RAJOUTER UNE ROUTE, IL FAUT L'AJOUTEr RDANS LE FICHIER SITE_MAP ROUTE POUR LE REFERENCEMENT SEO
export default App;
