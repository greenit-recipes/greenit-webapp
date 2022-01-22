// SOURCE = https://ohdoylerules.com/snippets/tailwind-screens-in-js/

export const getBreakpoint = (screen = "") => {
  // "Theme" is an alias to where you keep your tailwind.config.js - most likely your project root
  const screens = require("./tailwind.config.js").theme.extend.screens;
  // create a keyed object of screens that match
  const matches = Object.entries(screens).reduce((results, [name, size]) => {
    const mediaQuery =
      typeof size === "string"
        ? `(min-width: ${size})`
        : /*@ts-ignore*/
          `(max-width: ${size.max})`;
    // @ts-ignore
    results[name] = window.matchMedia(mediaQuery).matches;
    return results;
  }, {});
  // show all matches when there is no screen choice
  if (screen === "") {
    return matches;
  }
  // invalid screen choice
  if (!screens[screen]) {
    return false;
  }
  // @ts-ignore
  const breakpoints = matches[screen];
  return breakpoints;
};

export const getSecondsFromDuration = (duration: string) => {
  const getNumber = (item: string | null) => {
    return item
      ? item.length === 2
        ? parseInt(item.substr(0, 1))
        : parseInt(item.substr(0, 2))
      : 0;
  };
  let amount: number = 0;
  const hours = duration.match(/([0-9]{1,2}h)/g);
  const minutes = duration.match(/([0-9]{1,2}m)/g);
  const seconds = duration.match(/([0-9]{1,2}s)/g);
  if (hours) {
    amount += getNumber(hours[0]) * 3600;
  }
  if (minutes) {
    amount += getNumber(minutes[0]) * 60;
  }
  if (seconds) {
    amount += getNumber(seconds[0]);
  }
  return amount;
};

export const filterData = [
  {
    title: "Catégories",
    name: "category",
    options: [
      { title: "Maison" },
      { title: "Corps" },
      { title: "Visage" },
      { title: "Cheveux" },
      { title: "Bien-être" },
    ],
  },
  {
    title: "Filtres",
    name: "tags",
    options: [
      { title: "Premiers pas" },
      { title: "Zéro-déchet" },
      {
        title: "Ingrédients de la cuisine",
      },
    ],
  },
  {
    title: "Temps",
    name: "duration",
    options: [
      { title: "Moins de 15 min", value: 15 },
      { title: "Moins de 30 min", value: 30 },
      { title: "Moins de 1 heure", value: 60 },
    ],
  },
  {
    title: "Difficulté",
    name: "difficulty",
    options: [
      { title: "Facile", value: "BEGINNER" },
      { title: "Intermediaire", value: "INTERMEDIATE" },
      { title: "Expert", value: "ADVANCED" },
    ],
  },
  {
    title: "Nombre d'ingrédients",
    name: "numberOfIngredients",
    options: [
      { title: "1 ingrédient", value: "1" },
      { title: "2 ingrédient", value: "2" },
      { title: "3 ingrédient", value: "3" },
      { title: "4 ingrédient", value: "4" },
      { title: "5 ingrédient", value: "5" },
      { title: "6 ingrédient", value: "6" },
      { title: "7 ingrédient", value: "7" },
    ],
  },
];
