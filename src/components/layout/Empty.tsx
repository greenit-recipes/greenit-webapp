import React from "react";

export const Empty: React.FC = () => {
  return (
    <div className="flex flex-col">
      <p className="text-3xl md:text-5xl text-center">🥲</p>
      <h2 className="font-diy text-2xl md:text-3xl text-center">
        {" "}
        Aucune recette trouvée avec ces filtres.
      </h2>
    </div>
  );
};
