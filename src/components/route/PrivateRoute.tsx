import { Redirect, Route } from "react-router-dom";
import authService from "services/auth.service";

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
