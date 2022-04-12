interface ICircleGreenit {
  number?: any;
  text?: string;
  symbol?: string;
  icon: any;
  customClassName?: string;
  isSymbolAtEndOfLine?: boolean;
  isOnlyIcon?: boolean;
  colorCircle: string;
}

export const CircleGreenit: React.FC<ICircleGreenit> = ({
  number,
  text,
  colorCircle,
  symbol,
  icon,
  customClassName = "",
  isSymbolAtEndOfLine = true,
  isOnlyIcon = false,
}) => {
  return (
    <div className={`${customClassName} flex flex-col | items-center`}>
      <div
        className={
          "w-16 h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center relative" +
          " " +
          colorCircle
        }
      >
        {icon}
        {!isOnlyIcon && (
          <div className="text-center fontQSemibold text-xl lg:text-2xl">
            {!isSymbolAtEndOfLine && (
              <span className="fontQSmedium text-xl mr-2">{symbol} </span>
            )}
            {number}
            {isSymbolAtEndOfLine && (
              <span className="fontQSmedium text-xl ml-2">{symbol}</span>
            )}
          </div>
        )}
      </div>
      {!isOnlyIcon && (
        <div className="fontQSmedium text-center text-sm mt-1">{text}</div>
      )}
    </div>
  );
};
