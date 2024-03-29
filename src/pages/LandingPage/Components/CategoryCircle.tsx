import { RouteName } from "App";
import {
  getObjectSession,
  setObjectFilterSession,
} from "helpers/session-helper";
import { useHistory } from "react-router-dom";
import { Circle, CircleProps } from "../../../components/misc/Circle";

export const CategoryCircle: React.FC<CircleProps> = ({
  name,
  icon,
  isLandingPage = false,
  id,
}) => {
  const history = useHistory();
  const isTag = [
    "Premiers pas",
    "Zéro-déchet",
    "Avec les ingrédients de la cuisine",
  ].includes(name);
  return (
    <div
      onClick={() => {
        const value = isTag
          ? { tags: [{ title: name, value: name }] }
          : { category: [{ title: name, value: name }] };
        setObjectFilterSession(getObjectSession("filterListPage"), value);
        history.push(RouteName.recipes);
      }}
    >
      <Circle name={name} icon={icon} id={id} isLandingPage={isLandingPage} />
    </div>
  );
};
