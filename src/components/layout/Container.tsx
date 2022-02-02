import React from "react";
import useIsMobile from "../../hooks/isMobile";

interface ContainerProps {
  title?: string;
  margin?: number;
  className?: string;
  itemsCenter?: boolean;
  padding?: boolean;
}

export const Container: React.FC<ContainerProps> = ({
  className,
  margin,
  title,
  children,
  padding,
  itemsCenter,
}) => {
  const isMobile = useIsMobile()
  return (
    <div
      className={`${className} mt-${margin} mb-${margin} ${
        itemsCenter ? "flex flex-col items-center" : ""
      }`}
      style={{
        ...(padding
          ? {
              paddingLeft: isMobile ? "2%" : "10%",
              paddingRight: isMobile ? "2%" : "10%",
            }
          : {}),
      }}
    >
      {title && <h2 className="text-2xl lg:text-3xl | md:mb-10">{title}</h2>}
      {children}
    </div>
  );
};
