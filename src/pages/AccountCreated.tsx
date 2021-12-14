import { useMutation } from "@apollo/client";
import { Button } from "components/misc/Button";
import React from "react";
import authService, { RESEND_ACTIVATION_EMAIL } from "services/auth.service";
import "../App.css";
import { Footer, Navbar } from "../components";

const AccountCreated: React.FC = () => {
  const [resendActivationEMail] = useMutation(RESEND_ACTIVATION_EMAIL, {
    errorPolicy: "all",
  });

  return (
    <div className="flex flex-col | items-center self-center">
      <Navbar />
      <div className="grid justify-items-center auto-rows-max h-screen mt-28">
        <div className="w-3/4">
          <h1 className="text-center text-2xl md:text-3xl">
            Bienvenue au sein de la
          </h1>
          <h1 className="text-center text-green text-2xl md:text-3xl">
            Greenit Community !
          </h1>
          <h4 className="text-center text-xl md:text-2xl mt-10">
            Une dernière étape est nécessaire pour finaliser ton inscription.
          </h4>
          <h4 className="text-center text-xl md:text-2xl mt-10">
            Jette un coup d’oeil à tes mails et confirme ton adresse.
          </h4>
          <h4 className="text-center text-sm md:text-lg mt-2 mb-10">
            L’e-mail de confirmation s’est peut-être glissé dans les spams.
          </h4>
        </div>
        <Button
          onClick={() => {
            resendActivationEMail({
              variables: { email: authService.getEmail() },
            });
          }}
          type="green"
        >
          Renvoyer l'email
        </Button>
      </div>
      <Footer />
    </div>
  );
};

export default AccountCreated;
