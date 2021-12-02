import { useMutation } from "@apollo/client";
import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router";
import authService, { VERIFY_ACCOUNT, WELCOME_NEW_USER } from "services/auth.service";
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

      <div>Oh yeah! {data?.verifyAccount?.success}</div>
      {data?.verifyAccount?.success ? (
        <div>
          <h1>Votre compte est activé, connecté vous !!!</h1>
        </div>
      ) : (
        <div>
          <h1>Un probleme à eu lieu</h1>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Activate;
