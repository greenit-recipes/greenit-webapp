interface ICircleGreenit {
  number: string;
  text: string;
  symbol: string;
  isSymbolAtEndOfLine?: boolean;
  colorCircle: string;
}

export const CircleGreenit: React.FC<ICircleGreenit> = ({
  number,
  text,
  colorCircle,
  symbol,
  isSymbolAtEndOfLine = true,
}) => {
  return (
    <div className="flex flex-col ml-16 | items-center">
      <div
        className={
          "w-28 h-28 rounded-full flex items-center justify-center relative" +
          " " +
          colorCircle
        }
      >
        <img
          className="h-14 w-14 absolute icon-position-circle"
          src="https://img.20mn.fr/sIChN5W-TCG0VWSpGYJYLw/768x492_tous-trolls.jpg"
        ></img>
        <div className="text-center fontQSbold text-3xl">
          {!isSymbolAtEndOfLine && (
            <span className="fontQSmedium text-2xl mr-2">{symbol} </span>
          )}
          {number}
          {isSymbolAtEndOfLine && (
            <span className="fontQSmedium text-2xl ml-2">{symbol}</span>
          )}
        </div>
      </div>
      <div className="fontQSmedium text-sm mt-1">{text}</div>
    </div>
  );
};
