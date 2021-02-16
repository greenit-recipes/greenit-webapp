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
  };
  let item = Object.keys(types[type as keyof typeof types][0]);
  // @ts-ignore
  item = item[Math.floor(Math.random() * item.length)];
  return (
    <div className={`col-span-2 ${start ? "col-start-2" : ""}`}>
      <img
        /* @ts-ignore */
        src={types[type as keyof typeof types][0][(item as unknown) as string]}
        className="h-auto w-auto"
      />
      <h1 className="py-1 flex justify-center">{item}</h1>
    </div>
  );
};
