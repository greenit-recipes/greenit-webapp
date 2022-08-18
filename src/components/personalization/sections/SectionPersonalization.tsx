import ModalPersonalization from "../ModalPersonalization";
import React from "react";
import { useLocation } from "react-router-dom";
import { RouteName } from "../../../App";
import Auth, { UPDATE_PARTICULARITIES_ACCOUNT } from "services/auth.service";
import { useMutation } from "@apollo/client";

interface ISectionPersonalization {
  particularities?: any;
}

export const SectionPersonalization: React.FC<ISectionPersonalization> = ({
  particularities,
}) => {
  const location = useLocation();
  const isLoggedIn = Auth.isLoggedIn();

  const [
    updateParticularitiesAccount,
    { data: updateAccountData, loading, error },
  ] = useMutation(UPDATE_PARTICULARITIES_ACCOUNT, { errorPolicy: "all" });

  const resetParticularities = () => {
    updateParticularitiesAccount({
      variables: {
        particularities: JSON.stringify({}),
      },
    });
  };

  if (isLoggedIn) {
    return (
      <div>
        <div className="flex flex-col md:flex-row md:justify-center md:space-x-24 msm:space-y-3 mx-10 mb-5">
          <div className="md:flex md:flex-col items-center">
            <h4 className="text-xl font-normal mb-2">Mon type de peau</h4>
            <div className="flex">
              <span className="text-base font-light text-white py-1 px-2 bg-green rounded-lg">
                {particularities.tagsSkin}
              </span>
            </div>
          </div>
          <div className="md:flex md:flex-col items-center">
            <h4 className="text-xl font-normal mb-2">Mon type de cheveux</h4>
            <div className="flex">
              <span className="text-base font-light text-white py-1 px-2 bg-green rounded-lg">
                {particularities.tagsHair}
              </span>
            </div>
          </div>
          <div className="md:flex md:flex-col items-center">
            <h4 className="text-xl font-normal mb-2">Mes particularités</h4>
            <div className="flex flex-wrap space-x-2">
              {particularities.tagsParticularity.map((item: string) => (
                <span className="text-base font-light text-white py-1 px-2 bg-green rounded-lg">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center md:flex-row md:space-x-4">
          <ModalPersonalization
            btn={
              <div
                className="text-center mb-2"
                id="listpage-mes-particularites-modifier"
              >
                <span className="underline font-medium cursor-pointer">
                  Modifier mes préférences
                </span>
              </div>
            }
          ></ModalPersonalization>
          {location.pathname === RouteName.profil && (
            <div className="text-center mb-2">
              <span
                className="underline font-medium cursor-pointer"
                id="listpage-mes-particularites-supprimer"
                onClick={() => {
                  resetParticularities();
                  window.location.reload();
                }}
              >
                Supprimer mes préférences
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }
  return <></>;
};

export default SectionPersonalization;
