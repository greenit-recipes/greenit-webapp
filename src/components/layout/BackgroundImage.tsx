import isMobile from "hooks/isMobile";
import { BackgroundImageMobile, BackgroundImageDesktop } from "icons"

interface IBackgroundImage {
  className?: string;
}

export const BackgroundImage: React.FC<IBackgroundImage> = ({ className }) => {
  return (
    <div>
      {isMobile() ? (
        <img className="backgroundImage" src={BackgroundImageMobile}></img>
      ) : (
        <img className="backgroundImage" src={BackgroundImageDesktop}></img>
      )}
    </div>
  );
};