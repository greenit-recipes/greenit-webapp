import React from "react";
import {
  home,
  wellbeing,
  body,
  face,
  hair,
  advanced,
  intermediate,
  beginner,
  fifteenMin,
  thirtyMin,
  oneHour,
  logo,
} from "../../icons";

interface IconProps {
  type: string;
  start?: boolean;
  height?: number;
  width?: number;
  icon?: string;
}
export const Icon: React.FC<IconProps> = ({
  type,
  start,
  height,
  width,
  icon,
}) => {
  const types = {
    // category
    Home: home,
    Wellbeing: wellbeing,
    Body: body,
    Face: face,
    Hair: hair,

    // difficulty
    Beginner: beginner,
    Intermediate: intermediate,
    Advanced: advanced,

    // duration
    "15 min": fifteenMin,
    "30 min": thirtyMin,
    "1 hour": oneHour,
    Rating: logo,
  };
  const item = types[icon as keyof typeof types];

  return (
    <div>
      <img src={item} className={`h-${height ?? 28} w-${width ?? 32}`} />
      <h1 className="py-1 flex justify-center text-sm md:text-lg">{icon}</h1>
    </div>
  );
};
