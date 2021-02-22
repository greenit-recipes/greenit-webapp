import React from "react";

interface GridProps {
  md?: string;
  lg?: string;
  type: "rows" | "cols";
}
export const Grid: React.FC<GridProps> = ({ md, lg, type, children }) => {
  return (
    <div
      className={`${md && `md:grid-${type}-${md}`} ${
        lg && `lg:grid-type-${lg}`
      }`}
    >
      {children}
    </div>
  );
};
