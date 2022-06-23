import { RouteName } from "App";
import useIsMobile from "hooks/isMobile";
import { Link } from "react-router-dom";

interface CommentField {
  className?: string;
}

export const FakeRecipeCard: React.FC<CommentField> = ({ className }) => {
  const isMobile = useIsMobile();
  const height = isMobile ? 60 : 96;
  const width = isMobile ? 40 : 60;
  return (
    <div className="relative m-2 mb-14 lg:m-4">
      <Link to={RouteName.createRecipe} className={`inline-block`}>
        <div>
          <div
            className={`flex  bg-blue flex-col object-cover | w-60 h-96
            rounded-3xl | justify-self-center`}
            // @ts-ignore
          >
            <div>rjkpoekrpok</div>
          </div>
        </div>
      </Link>
    </div>
  );
};
