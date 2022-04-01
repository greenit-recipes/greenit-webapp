import { RouteName } from "App";
import { getObjectSession, setObjectFilterSession } from "helpers/session-helper";
import { useHistory } from "react-router-dom";

interface CategoryCircleProps {
  name: string;
  icon: string;
}

export const CategoryCircle: React.FC<CategoryCircleProps> = ({
  name,
  icon,
}) => {
  const history = useHistory();
  const isTag = [
    "Premiers pas",
    "Zéro-déchet",
    "Avec les ingrédients de la cuisine",
  ].includes(name);
  return (
    <div className="flex cursor-pointer flex-col | items-center" onClick={() => {
      const value = isTag ? { tags: [{ title: name, value : name}]} : { category: [{ title: name, value : name}]}
      setObjectFilterSession(getObjectSession('filterListPage'), value)
      history.push(RouteName.recipes);
    }}>
      <div className="w-16 h-16 md:w-20 md:h-20 bg-white mx-4 | rounded-full shadow-lg">
          <img
            loading="lazy"
            className=" max-h-full max-w-full | ml-auto mr-auto | flex place-self-center rounded-full"
            src={icon}
            alt={name}
          ></img>
      </div>
      <div className="w-28 md:w-36">
        <div className="pt-2 text-center"> {name} </div>
      </div>
    </div>
  );
};
