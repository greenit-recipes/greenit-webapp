import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import authService, { VERIFY_TOKEN } from "services/auth.service";

const PrivateRoute = ({ component: Component, ...rest }: any) => {

  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) =>
        authService.getToken() ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  )
};

export default PrivateRoute;
