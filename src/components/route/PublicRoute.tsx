import { Route } from "react-router-dom";

const PublicRoute = ({ component: Component, restricted, ...rest }: any) => {
  return (
    <Route {...rest} render={(props) => <Component key={Date.now()} {...props} />} />
  )
};  

export default PublicRoute;
