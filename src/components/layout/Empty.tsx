import React from "react";

export const Empty: React.FC = () => {
  return (
    <h2 className="font-diy text-center">
      Aucune recette ne correspond à vos filtres
    </h2>
    // <div className="flex flex-col">
    //   <img
    //     src={emptyIcon}
    //     className="h-36 w-36 lg:h-48 lg:w-48 self-center"
    //     alt="vide"
    //   />
    //   <h2 className="text-xl lg:text-3xl" style={{ color: "#535353" }}>
    //     Aucune recette trouvée
    //   </h2>
    // </div>
  );
};
