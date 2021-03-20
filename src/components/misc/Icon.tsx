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
}
export const Icon: React.FC<IconProps> = ({ type, start, height, width }) => {
  const types = {
    category: [
      { Home: home, Wellbeing: wellbeing, Body: body, Face: face, Hair: hair },
    ],
    difficulty: [
      { Beginner: beginner, Amateur: intermediate, Advanced: advanced },
    ],
    duration: [
      {
        "15 min": fifteenMin,
        "30 min": thirtyMin,
        "1 hour": oneHour,
      },
    ],
    star: [{ Rating: logo }],
  };
  let item = Object.keys(types[type as keyof typeof types][0]);
  // @ts-ignore
  item = item[Math.floor(Math.random() * item.length)];
  return (
    <div>
      <img
        /* @ts-ignore */
        src={types[type as keyof typeof types][0][(item as unknown) as string]}
        className={`h-${height ?? 28} w-${width ?? 32}`}
      />
      <h1 className="py-1 flex justify-center text-md md:text-lg">{item}</h1>
    </div>
  );
};
