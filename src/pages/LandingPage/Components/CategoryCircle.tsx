import { Link } from "react-router-dom";
import { RouteName } from "App";

interface CategoryCircleProps {
  name: string;
  icon: string;
}

export const CategoryCircle: React.FC<CategoryCircleProps> = ({
  name,
  icon,
}) => {
  const isTag = [
    "Premiers pas",
    "Zéro-déchet",
    "Avec les ingrédients de la cuisine",
  ].includes(name);
  return (
    <div className="flex flex-col | items-center">
      <div className="w-16 h-16 md:w-20 md:h-20 bg-white mx-4 | rounded-full shadow-lg">
        <Link to={`${RouteName.recipes}?${isTag ? `tags=${name}` : `category=${name}`}`}>
          <img
            loading="lazy"
            className=" max-h-full max-w-full | ml-auto mr-auto | flex place-self-center rounded-full"
            src={icon}
            alt={name}
          ></img>
        </Link>
      </div>
      <div className="w-28 md:w-36">
        <div className="pt-2 text-center"> {name} </div>
      </div>
    </div>
  );
};
