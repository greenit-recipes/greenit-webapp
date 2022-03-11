interface IPress {
  title: string;
  image: string;
  subtitle: string;
  inverted?: boolean;
}
export const Press: React.FC<IPress> = ({
  title,
  image,
  subtitle,
  inverted = false,
}) => {
  return (
    <div className="flex lg:flex-col items-center lg:justify-around h-40 lg:w-96 lg:h-80">
      <h2 className="hidden lg:flex mx-4 lg:mb-4 md:text-lg text-sm md: lg:h-20 text-center">
        {title}
      </h2>
      <img
        className="rounded-full w-24 lg:w-28"
        src={image}
        alt="logo de la presse"
      />
      <h3 className="hidden lg:flex mx-4 md: text-xs text-center lg:mt-4 lg:h-20">
        {subtitle}
      </h3>

      {/* A refacto  */}
      <div
        style={inverted ? { order: -1 } : {}}
        className="flex lg:hidden flex-col sm:w-96 lg:w-full px-4"
      >
        <h2 className="lg:mb-4 md:text-lg text-sm md: lg:h-20 text-center">
          {title}
        </h2>
        <h3 className="mt-2 md: text-xs text-center lg:mt-4 lg:h-20">
          {subtitle}
        </h3>
      </div>
    </div>
  );
};
