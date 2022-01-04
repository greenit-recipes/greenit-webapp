import { useMutation } from "@apollo/client";
import { Button } from "components/misc/Button";
import React from "react";
import authService, { RESEND_ACTIVATION_EMAIL } from "services/auth.service";
import "../App.css";
import { Footer, Navbar } from "../components";
import { useTranslation } from "react-i18next";

const AccountCreated: React.FC = () => {
  const { t, i18n } = useTranslation("common");
  const [resendActivationEMail] = useMutation(RESEND_ACTIVATION_EMAIL, {
    errorPolicy: "all",
  });

  return (
    <div className="flex flex-col | items-center self-center">
      <Navbar />
      <div className="grid justify-items-center auto-rows-max h-screen mt-28">
        <div className="w-3/4">
          <h1 className="text-center text-2xl md:text-3xl">
          {t("accountCreated.title")}
          </h1>
          <h1 className="text-center text-green text-2xl md:text-3xl">
          {t("accountCreated.subtitle")}
          </h1>
          <h4 className="text-center text-xl md:text-2xl mt-10">
          {t("accountCreated.content1")}
          </h4>
          <h4 className="text-center text-xl md:text-2xl mt-10">
          {t("accountCreated.content2")}
          </h4>
          <h4 className="text-center text-sm md:text-lg mt-2 mb-10">
          {t("accountCreated.content3")}
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
          {t("accountCreated.button")}
        </Button>
      </div>
      <Footer />
    </div>
  );
};

export default AccountCreated;
