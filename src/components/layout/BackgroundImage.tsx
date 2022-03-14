import useIsMobile from "hooks/isMobile";
import { BackgroundImageMobile, BackgroundImageDesktop } from "icons"

interface IBackgroundImage {
  className?: string;
}

export const BackgroundImage: React.FC<IBackgroundImage> = ({ className }) => {
  const isMobile = useIsMobile()

  return (
    <div>
      {isMobile ? (
        <img className="backgroundImage" src={BackgroundImageMobile} alt="fond" loading="lazy"></img>
      ) : (
        <img className="backgroundImage" src={BackgroundImageDesktop} alt="fond" loading="lazy"></img>
      )}
    </div>
  );
};