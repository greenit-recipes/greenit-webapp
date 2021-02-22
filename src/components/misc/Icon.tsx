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
}
export const Icon: React.FC<IconProps> = ({ type, start }) => {
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
    <div className="pr-20">
      <img
        /* @ts-ignore */
        src={types[type as keyof typeof types][0][(item as unknown) as string]}
        className="h-28 w-32"
      />
      <h1 className="py-1 flex justify-center text-2xl">{item}</h1>
    </div>
  );
};
