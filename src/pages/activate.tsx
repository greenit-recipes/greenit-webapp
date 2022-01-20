import { useMutation } from "@apollo/client";
import { Button } from "components/misc/Button";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import authService, {
  RESEND_ACTIVATION_EMAIL,
  VERIFY_ACCOUNT,
  WELCOME_NEW_USER
} from "services/auth.service";
import "../App.css";
import { Footer, Navbar } from "../components";

const ActivateAccount: React.FC = () => {
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

  const [resendActivationEMail] = useMutation(RESEND_ACTIVATION_EMAIL, {
    errorPolicy: "all",
  });

  useEffect(() => {
    verifyAccount().then((dataReponse) => {
      if (!authService.getEmail()) return;
      if (dataReponse?.data?.verifyAccount?.success) {
        welcomeNewUser({
          variables: {
            email: authService.getEmail(),
          },
        });
      }
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
              Inscription finalisée !
            </h1>
            <h4 className="text-center text-sm md:text-lg mt-2 mb-10">
              Tu peux désormais soumettre tes recettes, liker, partager,
              commenter… et bien plus !
            </h4>
          </div>
          <Link to="/connexion">
            <Button type="green">Se connecter à mon profil</Button>
          </Link>
        </div>
      ) : (
        <div className="grid justify-items-center auto-rows-max h-screen mt-28">
          <div className="w-full">
            <h1 className="text-center text-2xl md:text-3xl">
            Il y a eu un problème avec la création de ton compte ! 😥
            </h1>
            <h4 className="text-center text-xl md:text-2xl mt-10">
            Tu peux réessayer, si le problème persiste n’hésite pas à nous contacter.
            </h4>
          </div>
          <Link to="/register">
            <Button className="mb-5" type="green">Réessayer de créer un compte</Button>
          </Link>
          <Button
            onClick={() => {
              resendActivationEMail({
                variables: { email: authService.getEmail() },
              });
            }}
            type="green"
          >
            Renvoyer l'email d'activation
          </Button>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ActivateAccount;
