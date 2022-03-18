import React from "react";
import { Route } from "react-router-dom";

export const RouteName = {
  resetPassword: "/reinitialisation-mot-de-passe", // no index
  tokenActivationAccount: "/activate/:tokenActivationAccount", // no index
  accountCreated: "/compte-crée", // no index
  activateResetPassword:
    "/activate/mot-de-passe-oublié/:tokenActivationAccount", // no index
  register: "/creation-compte",
  recipeCreated: "/ajout-recette", // no index
  workshops: "/ateliers",
  ingredientPage: "/ingredients", // no index ( a activer quand on sort la page)
  starterPage: "/page-debutant-diy", // no index ( a activer quand on sort la page)
  why: "/projet",
  contact: "/contact",
  recipes: "/recettes",
  createRecipe: "/creation-recette",
  profil: "/profil",
  recap: "/recap",
};

export default (
    <Route>
      <Route path="/" />
      <Route path={RouteName.contact} />
      <Route path={RouteName.recipes} />
      <Route path="/recettes/:name" />
      <Route path={RouteName.ingredientPage} />
      <Route path={RouteName.workshops} />
      <Route path={RouteName.starterPage} />
      <Route path={RouteName.createRecipe} />
      <Route path={RouteName.recipeCreated} />
      <Route path={RouteName.register} />
      <Route path={RouteName.resetPassword} />
      <Route path={RouteName.profil} />
      <Route path={RouteName.accountCreated} />
      <Route path={RouteName.recap} />
      <Route />
    </Route>
);