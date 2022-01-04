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
import { RouteName } from "App";
import { useTranslation } from "react-i18next";

const ActivateAccount: React.FC = () => {
  const { t, i18n } = useTranslation("common");
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
      console.log(dataReponse)
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
              {t("activate.success.title")}
            </h1>
            <h4 className="text-center text-sm md:text-lg mt-2 mb-10">
            {t("activate.success.subtitle")}
            </h4>
          </div>
          <Link to="/">
            <Button type="green">{t("activate.success.button")}</Button>
          </Link>
        </div>
      ) : (
        <div className="grid justify-items-center auto-rows-max h-screen mt-28">
          <div className="w-full">
            <h1 className="text-center text-2xl md:text-3xl">
            {t("activate.fail.title")}
            </h1>
            <h4 className="text-center text-xl md:text-2xl mt-10">
            {t("activate.fail.subtitle1")}
            </h4>
            <h4 className="text-center text-xl md:text-2xl mt-10">
            {t("activate.fail.subtitle1")}
            </h4>
          </div>
          <Link to={RouteName.register}>
            <Button className="mb-5 mt-5" type="green">{t("activate.fail.buttonProfil")}l</Button>
          </Link>

          <Link to={RouteName.register}>
            <Button className="mb-5 mt-5" type="green">{t("activate.fail.buttonRecreate")}</Button>
          </Link>
          <Button
            onClick={() => {
              resendActivationEMail({
                variables: { email: authService.getEmail() },
              });
            }}
            type="green"
          >
            {t("activate.fail.buttonResend")}
          </Button>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ActivateAccount;
