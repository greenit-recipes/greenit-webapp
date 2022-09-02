import { RouteName } from "App";
import useIsMobile from "hooks/isMobile";
import React from "react";
import { Link } from "react-router-dom";
import authService from "services/auth.service";

export const ModalProfil: React.FC = () => {
  const isMobile = useIsMobile();
  return (
    <div className="flex flex-col gap-2 p-6 md:p-20">
      <div className="flex gap-3 hover:text-blue">
        <i className="bx bxs-user-x text-3xl"></i>
        <button onClick={() => authService.logout()}>
          <h2 className="text-xl">Déconnexion</h2>
        </button>
      </div>
      <div className="flex gap-3 hover:text-red">
        <i className="bx bxs-trash text-2xl"></i>
        <Link to={RouteName.deleteProfil}>
          <h2 className="text-xl">Supprimer mon compte</h2>
        </Link>
      </div>
    </div>
  );
};
