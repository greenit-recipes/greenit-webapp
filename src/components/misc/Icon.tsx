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
  text?: string;
  height?: number;
  width?: number;
  icon?: string;
}
export const Icon: React.FC<IconProps> = ({ text, height, width, icon }) => {
  const types = {
    // category
    Maison: home,
    "Bien-être": wellbeing,
    Corps: body,
    Visage: face,
    Cheveux: hair,

    // difficulty
    Facile: beginner,
    Intermediaire: intermediate,
    Expert: advanced,

    // duration
    "15 min": fifteenMin,
    "30 min": thirtyMin,
    "1 heure": oneHour,
    Rating: logo,
  };
  const item = types[icon as keyof typeof types];

  return (
    <div className="flex flex-col items-center">
      <img src={item} className={`h-${height ?? 28} w-${width ?? 32}`} />
      <h1 className="mb-2 text-sm md:text-sm">{icon}</h1>
    </div>
  );
};
