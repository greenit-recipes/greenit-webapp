import { Route } from "react-router-dom";
import ModalPersonalizationPopUp from "../personalization/ModalPersonalizationPopUp";

const PublicRoute = ({ component: Component, restricted, ...rest }: any) => {
  return (
    <Route
      {...rest}
      render={props => (
        <>
          <Component key={Date.now()} {...props} />{" "}
          <ModalPersonalizationPopUp />
        </>
      )}
    />
  );
};

export default PublicRoute;
