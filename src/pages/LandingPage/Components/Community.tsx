//Todo : Use typescript path lib scoping for cleaner paths
import { clone, filter, includes } from "lodash";

import {
  Member1,
  Member10,
  Member2,
  Member3,
  Member4,
  Member5,
  Member6,
  Member7,
  Member8,
  Member9,
} from "icons";
import { useEffect, useState } from "react";

const communityMembers = [
  {
    image: Member1,
    name: "Andréa",
    describe: "experte de DIY depuis 4 ans",
  },
  {
    image: Member2,
    name: "Adrien",
    describe: "se nourrit des communautés engagées",
  },
  {
    image: Member3,
    name: "Florian",
    describe: "cherche des produits sains et durables",
  },
  {
    image: Member4,
    name: "Zack",
    describe: "membre de communauté de passionnés",
  },
  {
    image: Member5,
    name: "Annabelle",
    describe: "soucieuse de mon bilan carbone",
  },
  {
    image: Member6,
    name: "Clemence",
    describe: "milite pour le progrès sociale",
  },
  {
    image: Member7,
    name: "Camille",
    describe: "fait déjà tout maison",
  },
  {
    image: Member8,
    name: "Carlos",
    describe: "fait son ménage au naturel",
  },
  {
    image: Member9,
    name: "Hugues",
    describe: "bénévole engagé",
  },
  {
    image: Member10,
    name: "Hugo",
    describe: "coach de startups engagées",
  },
];

export const Community: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
  const [numeros, setNumeros] = useState<any>([0, 1, 2, 3, 4, 5]);
  function randomIntFromInterval(min: any, max: any) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function randomImage(element: any) {
    const currentIndexNumberPhoto = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; // 10 photos
    const imgHired = filter(
      currentIndexNumberPhoto,
      (x: any) => !includes(element, x),
    );
    return imgHired[Math.floor(Math.random() * imgHired.length)];
  }

  useEffect(() => {
    // create interval
    const interval = setTimeout(() => {
      const rndInt = randomIntFromInterval(0, 5);
      const currentNums = numeros;
      currentNums[rndInt] = randomImage(currentNums);
      const newImgRandom = clone(currentNums);
      setNumeros(newImgRandom);
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [numeros]);

  return (
    <div className="w-full pt-4 pl-4 pb-12 text-center">
      <div
        className={`justify-center ${
          isMobile ? " grid grid-cols-2 justify-items-center" : "flex"
        }`}
      >
        {communityMembers?.slice(0, 6).map((person, index) => (
          <div className="flex flex-col items-center w-52 ml-4 justify-center">
            <img
              src={communityMembers[numeros[index]].image}
              className="w-24 h-24 rounded-full object-cover"
              alt={communityMembers[numeros[index]].name}
            />
            <h4>{communityMembers[numeros[index]].name}</h4>
            <h4 className="font-diy text-2xl">
              {communityMembers[numeros[index]].describe}
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
};
