export interface CircleProps {
  name: string;
  icon: string;
  isLandingPage?: boolean;
}

export const Circle: React.FC<CircleProps> = ({
  name,
  icon,
  isLandingPage = false,
}) => {
  return (
    <div className="flex cursor-pointer flex-col | items-center">
      <div
        className={
          isLandingPage
            ? `bg-white mx-4 | rounded-full shadow-lg`
            : `w-16 h-16 md:w-20 md:h-20 bg-white mx-4 | rounded-full shadow-lg`
        }
      >
        <img
          loading="lazy"
          className={
            isLandingPage
              ? `w-28 h-28 ml-auto mr-auto | flex place-self-center rounded-full transform sm:hover:scale-105 ease-linear transition-all duration-150`
              : `max-h-full max-w-full | ml-auto mr-auto | flex place-self-center rounded-full`
          }
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
