import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useEffect } from "react";
import { Route } from "react-router-dom";
import authService, { VERIFY_TOKEN } from "services/auth.service";

const PublicRoute = ({ component: Component, restricted, ...rest }: any) => {
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

  return user ? (
    <Route {...rest} render={(props) => <Component {...props} />} />
  ) : null;
};

export default PublicRoute;
