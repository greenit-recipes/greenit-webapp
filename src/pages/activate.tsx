import { useMutation } from "@apollo/client";
import React, { useEffect } from "react";
import { Button } from "components/misc/Button";
import { Link } from "react-router-dom";
import { useLocation, useParams } from "react-router";
import authService, {
  VERIFY_ACCOUNT,
  WELCOME_NEW_USER,
} from "services/auth.service";
import "../App.css";
import { Footer, Navbar } from "../components";

const Activate: React.FC = () => {
  const { tokenActivationAccount } =
    useParams<{ tokenActivationAccount: string }>();

  const [welcomeNewUser] = useMutation(WELCOME_NEW_USER);

  const [verifyAccount, { data, loading, error }] = useMutation(
    VERIFY_ACCOUNT,
    {
      variables: {
        token: tokenActivationAccount,
      },
    }
  );

  useEffect(() => {
    verifyAccount().then(() => {
      if (!authService.getEmail()) return;
      welcomeNewUser({
        variables: {
          email: authService.getEmail(),
        },
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // <-- empty dependency array

  return (
    <div className="flex flex-col | items-center self-center">
      <Navbar />
      {data?.verifyAccount?.success ? (
        <div className="grid justify-items-center auto-rows-max h-screen mt-28">
          <div className="w-3/4">
            <h1 className="text-center text-2xl md:text-3xl">
              Bienvenue au sein de la
            </h1>
            <h1 className="text-center text-green text-2xl md:text-3xl">
              Greenit Community !
            </h1>
            <h4 className="text-center text-xl md:text-2xl mt-10">
              Jette un coup d’oeil à tes mails et confirme ton adresse.
            </h4>
            <h4 className="text-center text-sm md:text-lg mt-2 mb-10">
              L’e-mail de confirmation s’est peut-être glissé dans les spams.
            </h4>
          </div>
          <Link to="/">
            <Button type="green">Revenir à la page d’accueil</Button>
          </Link>
        </div>
      ) : (
        <div className="grid justify-items-center auto-rows-max h-screen mt-28">
          <div className="w-full">
            <h1 className="text-center text-2xl md:text-3xl">
              Un problème à eu lieu 😥
            </h1>
            <h4 className="text-center text-xl md:text-2xl mt-10">
              On t'invite à réessayer de créer un compte
            </h4>
            <h4 className="text-center text-sm md:text-lg mt-2 mb-10">
              N'hesite pas à nous informer si le problème persiste
            </h4>
          </div>
          <Link to="/register">
            <Button type="green">Réessayer</Button>
          </Link>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Activate;
