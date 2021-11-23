

interface BackgroundImage {
  className?: string;
}
  
export const BackgroundImage: React.FC<BackgroundImage> = ({
  className,
}) => {
    return (
        <div 
          className={ `${className}` }
        >
          <div className="landingpage_bg_1 | w-32 h-32 md:w-56 md:h-56"></div>
          <div className="landingpage_bg_2 | w-36 h-36 md:w-72 md:h-72"></div>
          <div className="landingpage_bg_3 | w-32 h-32 md:w-56 md:h-56"></div>
          <div className="landingpage_bg_4 | w-32 h-32 md:w-56 md:h-56"></div>
        
        </div>
    );
  };