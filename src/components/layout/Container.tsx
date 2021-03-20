import React from "react";

interface ContainerProps {
  title?: string;
  margin?: number;
  className?: string;
  itemsCenter?: boolean;
}

export const Container: React.FC<ContainerProps> = ({
  className,
  margin,
  title,
  children,
  itemsCenter
}) => {
  return (
    <div className={`${className} mt-${margin} mb-${margin} ${itemsCenter ? "flex flex-col items-center": ""}`}>
      {title && (
        <h1 className="text-3xl md:text-5xl | md:mb-10">
          {title}
        </h1>
      )}
      {children}
    </div>
  );
};
