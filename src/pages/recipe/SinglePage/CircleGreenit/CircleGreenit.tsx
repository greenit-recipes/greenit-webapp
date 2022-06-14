interface ICircleGreenit {
  number?: any;
  text?: string;
  textWidth?: string;
  symbol?: string;
  icon: any;
  sizeCircle?: string;
  customClassName?: string;
  isSymbolAtEndOfLine?: boolean;
  isOnlyIcon?: boolean;
  colorCircle: string;
}

export const CircleGreenit: React.FC<ICircleGreenit> = ({
  number,
  text,
  textWidth,
  colorCircle,
  symbol,
  icon,
  sizeCircle = null,
  customClassName = "",
  isSymbolAtEndOfLine = true,
  isOnlyIcon = false,
}) => {
  const sizeCircleDefault = sizeCircle
    ? sizeCircle
    : "w-16 h-16 lg:w-20 lg:h-20";
  return (
    <div className={`${customClassName} flex flex-col | items-center`}>
      <div
        className={`${sizeCircleDefault} rounded-full flex items-center justify-center relative ${colorCircle}`}
      >
        {icon}
        {!isOnlyIcon && (
          <div className="text-center fontQSemibold text-xl lg:text-2xl">
            {symbol && !isSymbolAtEndOfLine && (
              <span className="fontQSmedium text-xl mr-2">{symbol} </span>
            )}
            {number}
            {symbol && isSymbolAtEndOfLine && (
              <span className="fontQSmedium text-xl ml-2">{symbol}</span>
            )}
          </div>
        )}
      </div>
      {!isOnlyIcon && (
        <div
          className={`${
            textWidth ? textWidth : ""
          } text-center mt-1`}
        >
          {text}
        </div>
      )}
    </div>
  );
};
