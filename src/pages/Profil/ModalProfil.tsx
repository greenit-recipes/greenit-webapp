import { RouteName } from "App";
import useIsMobile from "hooks/isMobile";
import React from "react";
import { Link } from "react-router-dom";
import authService from "services/auth.service";

export const ModalProfil: React.FC = () => {
  const isMobile = useIsMobile();
  return (
    <>
      <div
        className={`flex ${
          isMobile ? "" : "login-modal-size"
        } justify-items-center flex flex-col`}
      >
        <div className="relative p-6 flex-auto text-center">
          <button
            className={
              "py-2 text-center text-xl mb-2 cursor-pointer border-b-4 | hover:border-blue"
            }
            onClick={() => authService.logout()}
          >
            <h2>Déconnexion</h2>
          </button>
        </div>
        <Link to={RouteName.deleteProfil} className="justify-center flex">
          <div className="relative cursor pointer flex-auto py-2 text-start w-2/3 max-w-12 mb-8 ml-6 border-b-4 text-center | hover:border-blue">
            <h2 className="text-xl">Supprimer mon compte</h2>
          </div>
        </Link>
      </div>
    </>
  );
};
