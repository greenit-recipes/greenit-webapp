import React from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "../../components/misc";

const RecipeSinglePage = () => {
  // @ts-ignore
  const { id } = useParams();
  return (
    <div>
      <Navbar />
    </div>
  );
};
export default RecipeSinglePage;
