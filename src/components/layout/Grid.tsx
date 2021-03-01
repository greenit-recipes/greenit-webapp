import React from "react";

interface GridProps {
  type: "row" | "col";
  gap: string;
  className: string;
  size: {
    default: number;
    [key: string]: number;
  };
}

export const Grid: React.FC<GridProps> = ({
  size,
  type,
  children,
  gap,
  className,
}) => {
  const sizes = Object.keys(size)
    .filter((item) => item !== "default")
    .map((item) => `${item}:grid-${type}s-${size[item]}`);
  console.log(sizes);
  return (
    <div
      className={`${className} grid ${sizes.join(" ")} grid-${type}s-${
        size.default
      } ${gap && `gap-${gap}`} `}
    >
      {children}
    </div>
  );
};
