import isMobile from "hooks/isMobile";
import { BackroundImage, BackroundImageDesktop } from "icons"

interface IBackgroundImage {
  className?: string;
}

export const BackgroundImage: React.FC<IBackgroundImage> = ({ className }) => {
  return (
    <div>
      {isMobile() ? (
        <img className="backgroundImage" src={BackroundImage}></img>
      ) : (
        <img className="backgroundImage" src={BackroundImageDesktop}></img>
      )}
    </div>
  );
};