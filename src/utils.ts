// SOURCE = https://ohdoylerules.com/snippets/tailwind-screens-in-js/

import {boxIngredient, corps, fridge, maison, premierspas, visage, zeroWaste} from "icons";

export const getBreakpoint = (screen = "") => {
    // "Theme" is an alias to where you keep your tailwind.config.js - most likely your project root
    const screens = {
        xs: "375px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
    };
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
    // @ts-ignore
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


export const landingPageCategories = [
    {
        icon: premierspas,
        title: "Premiers pas",
    },
    {
        icon: zeroWaste,
        title: "Zéro-déchet",
    },
    {
        icon: fridge,
        title: "Avec les ingrédients de la cuisine",
    },
    {
        icon: maison,
        title: "Maison",
    },
    {
        icon: visage,
        title: "Visage",
    },
    {
        icon: corps,
        title: "Corps",
    },
];

export const boxFullXpIngredients = [
    {
        id:1,
        icon: boxIngredient,
        title: "Savon solide pour le corps",
        quantity: 1,
    },
    {
        id:2,
        icon: boxIngredient,
        title: "Crème de jour",
        quantity: 1,
    },
    {
        id:3,
        icon: boxIngredient,
        title: "Lessives liquides",
        quantity: 2,
    }
]

export const filterData = [
    {
        title: "Catégories",
        name: "category",
        options: [
            {title: "Maison", value: "Maison"},
            {title: "Corps", value: "Corps"},
            {title: "Visage", value: "Visage"},
            {title: "Cheveux", value: "Cheveux"},
            {title: "Bien-être", value: "Bien-être"},
            {title: "Santé", value: "Santé"},
            {title: "Maquillage", value: "Maquillage"},
        ],
    },
    {
        title: "Filtres",
        name: "tags",
        options: [
            {title: "Premiers pas", value: "Premiers pas"},
            {title: "Zéro-déchet", value: "Zéro-déchet"},
            {title: "Sans cuisson", value: "Sans cuisson"},
            {
                title: "Avec les ingrédients de la cuisine", value: "Avec les ingrédients de la cuisine",
            },
        ],
    },
    {
        title: "Temps",
        name: "duration",
        options: [
            {title: "Moins de 5 min", value: 5},
            {title: "Moins de 15 min", value: 15},
            {title: "Moins de 30 min", value: 30},
            {title: "Moins de 1 heure", value: 60},
        ],
    },
    {
        title: "Difficulté",
        name: "difficulty",
        options: [
            {title: "Facile", value: "BEGINNER"},
            {title: "Moyen", value: "INTERMEDIATE"},
            {title: "Expert", value: "ADVANCED"},
        ],
    },
    {
        title: "Nombre d'ingrédients",
        name: "numberOfIngredients",
        options: [
            {title: "1 ingrédient", value: 1},
            {title: "2 ingrédients", value: 2},
            {title: "3 ingrédients", value: 3},
            {title: "4 ingrédients", value: 4},
            {title: "5 ingrédients", value: 5},
            {title: "6 ingrédients", value: 6},
            {title: "7 ingrédients", value: 7},
        ],
    },
];
