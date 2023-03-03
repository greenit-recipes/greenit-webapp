import { clone, filter, includes } from "lodash";

import {
  annabelle,
  andrea,
  antoni,
  angel,
  nathalier,
  carlos,
  alice,
  lea,
  fanny,
  florian,
  jacques,
  nathalies,
  camille,
  maries,
  clemence,
  anne,
  jd,
  mathilde,
  hugues,
  hugo,
  jb,
  emmanuelle,
  tanguy,
  vincent,
  adrien,
  zack,
  aarnav,
  domie,
} from "icons";
import { useEffect, useState } from "react";

const communityMembers = [
  {
    image: annabelle,
    name: "Annabelle",
    describe: "soucieuse de mon bilan carbone",
  },
  {
    image: andrea,
    name: "Andréa",
    describe: "experte de DIY depuis 4 ans",
  },
  {
    image: antoni,
    name: "Antoni",
    describe: "veut bousculer ses habitudes",
  },
  {
    image: angel,
    name: "Angel",
    describe: "cherche plus de sens à sa conso",
  },
  {
    image: nathalier,
    name: "Nathalie",
    describe: "passionnée de fleur de Bach",
  },
  {
    image: carlos,
    name: "Carlos",
    describe: "fait son ménage au naturel",
  },
  {
    image: alice,
    name: "Alice",
    describe: "assurément écolo",
  },
  {
    image: lea,
    name: "Léa",
    describe: "souhaite des produits plus naturels",
  },
  {
    image: fanny,
    name: "Fanny",
    describe: "scanne ses produits du quotidien",
  },
  {
    image: florian,
    name: "Florian",
    describe: "cherche des produits sains et durables",
  },
  {
    image: jacques,
    name: "Jacques",
    describe: "engagé depuis le début",
  },
  {
    image: nathalies,
    name: "Nathalie",
    describe: "aventurière engagée",
  },
  {
    image: camille,
    name: "Camille",
    describe: "fait déjà tout maison",
  },
  {
    image: maries,
    name: "Marie",
    describe: "adepte du minimalisme",
  },
  {
    image: clemence,
    name: "Clemence",
    describe: "milite pour le progrès social",
  },
  {
    image: anne,
    name: "Anne",
    describe: "cherche à en savoir plus sur sa conso",
  },
  {
    image: jd,
    name: "Jean-Denis",
    describe: "sensible à l'impact sur sa santé",
  },
  {
    image: mathilde,
    name: "Mathilde",
    describe: "sensible à son impact écologique",
  },
  {
    image: hugues,
    name: "Hugues",
    describe: "bénévole engagé",
  },
  {
    image: hugo,
    name: "Hugo",
    describe: "coach de startups engagées",
  },
  {
    image: jb,
    name: "Jean-Baptiste",
    describe: "donateur bourré d'idées",
  },
  {
    image: emmanuelle,
    name: "Emmanuelle",
    describe: "favorise les circuits courts",
  },
  {
    image: tanguy,
    name: "Tanguy",
    describe: "prône déjà le fait-maison ",
  },
  {
    image: vincent,
    name: "Vincent",
    describe: "cherche des produits ultra-personnalisés",
  },
  {
    image: adrien,
    name: "Adrien",
    describe: "se nourrit des communautés engagées",
  },
  {
    image: zack,
    name: "Zack",
    describe: "membre de communautés de passionnés",
  },
  {
    image: aarnav,
    name: "Aarnav",
    describe: "participe à un projet à impact",
  },
  {
    image: domie,
    name: "Domie",
    describe: "véritable passionnée depuis des années",
  },
];

export const Community: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
  const [numeros, setNumeros] = useState<any>([0, 1, 2, 3, 4, 5]);
  function randomIntFromInterval(min: any, max: any) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function randomImage(element: any) {
    const currentIndexNumberPhoto = [...Array(28).keys()]; // 28 photos
    const imgHired = filter(
      currentIndexNumberPhoto,
      (x: any) => !includes(element, x),
    );
    return imgHired[Math.floor(Math.random() * imgHired.length)];
  }

  useEffect(() => {
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
          isMobile ? " grid grid-cols-2 justify-items-center" : "flex h-52"
        }`}
      >
        {communityMembers?.slice(0, 6).map((person, index) => (
          <div
            className={`flex flex-col items-center w-52 justify-center  ${
              isMobile ? "mt-4" : "ml-4"
            }`}
          >
            <img
              src={communityMembers[numeros[index]].image}
              className="w-24 h-24 rounded-full object-cover"
              alt={communityMembers[numeros[index]].name}
            />
            <h4>{communityMembers[numeros[index]].name}</h4>
            <h4 className="font-diy leading-6 text-2xl">
              {communityMembers[numeros[index]].describe}
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
};
