import { Link } from "react-router-dom";

interface CategoryCircleProps {
    name: string;
    icon: string;
  }
  
 export const CategoryCircle: React.FC<CategoryCircleProps> = ({ name, icon }) => {
    const isTag = ["Premiers pas", "Zéro-déchet", "Ingrédients de la cuisine"].includes(
      name
    );
    return (
      <div className="flex flex-col | items-center | max-w-28">
        <div className="w-20 h-20 md:w-26 md:h-26 bg-white | rounded-full shadow-lg">
          <Link to={`/recipes?${isTag ? `tags=${name}` : `category=${name}`}`}>
            <img
              className=" max-h-full max-w-full | ml-auto mr-auto | flex place-self-center rounded-full"
              src={icon}
            ></img>
          </Link>
        </div>
        <h3 className="pt-2 text-center text-md md:text-lg"> {name} </h3>
      </div>
    );
  };