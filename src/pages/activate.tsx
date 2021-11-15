import { useMutation } from "@apollo/client";
import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router";
import { VERIFY_ACCOUNT } from "services/auth.service";
import "../App.css";
import { Footer, Navbar } from "../components";

const Activate: React.FC = () => {
  const location = useLocation();
  const { tokenActivationAccount } =
    useParams<{ tokenActivationAccount: string }>();

  console.log("tokenActivationAccount -->", tokenActivationAccount);
  console.log("path", location.pathname);
  const [verifyAccount, { data, loading, error }] = useMutation(
    VERIFY_ACCOUNT,
    {
      variables: {
        token: tokenActivationAccount,
      },
    }
  );

  console.log("data", data);
  console.log("error", error);

  useEffect(() => {
    verifyAccount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // <-- empty dependency array

  return (
    <div className="flex flex-col | items-center self-center">
      <Navbar />

      <div>plplpl {data?.verifyAccount?.success}</div>
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
