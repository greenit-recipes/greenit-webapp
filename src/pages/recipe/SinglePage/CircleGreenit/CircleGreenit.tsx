interface ICircleGreenit {
  number: string;
  text: string;
  symbol: string;
  icon: any;
  customClassName?: string;
  isSymbolAtEndOfLine?: boolean;
  colorCircle: string;
}

export const CircleGreenit: React.FC<ICircleGreenit> = ({
  number,
  text,
  colorCircle,
  symbol,
  icon,
  customClassName = '',
  isSymbolAtEndOfLine = true,
}) => {
  return (
    <div className={ `${customClassName} flex flex-col | items-center` }>
      <div
        className={
          "w-16 h-16 lg:w-24 lg:h-24 rounded-full flex items-center justify-center relative" +
          " " +
          colorCircle
        }
      >
          {icon}
        <div className="text-center fontQSbold text-xl lg:text-2xl">
          {!isSymbolAtEndOfLine && (
            <span className="fontQSmedium text-xl mr-2">{symbol} </span>
          )}
          {number}
          {isSymbolAtEndOfLine && (
            <span className="fontQSmedium text-xl ml-2">{symbol}</span>
          )}
        </div>
      </div>
      <div className="fontQSmedium text-center text-sm mt-1">{text}</div>
    </div>
  );
};
