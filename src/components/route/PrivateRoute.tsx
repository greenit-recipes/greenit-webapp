import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import authService, { VERIFY_TOKEN } from "services/auth.service";

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const [user, setUser] = useState("");

  const [verifyToken, { data, loading, error }] = useMutation(VERIFY_TOKEN, {
    variables: {
      token: authService.getToken(),
    },
  });

  useEffect(() => {
    if (authService.getToken()) {
      verifyToken();
      setUser(data);
      return;
    }

    setUser("-");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isLoggedIn = data?.verifyToken?.success;
  return user ? (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  ) : null;
};

export default PrivateRoute;
