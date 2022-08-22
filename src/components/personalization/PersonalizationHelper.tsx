import { cloneDeep } from "lodash";
import {
  MutationOperation,
  persistMutation,
} from "../../services/boxfullxp.service";

export const ICMingredients = [
  {
    image:
      "https://greenit-s3-bucket.s3.eu-west-3.amazonaws.com/media/ingredient/huile_vegetale_de_coco.jpeg",
    alt: "ingredient",
    name: "ingredients avec un nom long",
  },
  {
    image:
      "https://greenit-s3-bucket.s3.eu-west-3.amazonaws.com/media/ingredient/huile_vegetale_de_coco.jpeg",
    alt: "ingredient",
    name: "ingredients court",
  },
  {
    image:
      "https://greenit-s3-bucket.s3.eu-west-3.amazonaws.com/media/ingredient/huile_vegetale_de_coco.jpeg",
    alt: "ingredient",
    name: "ingredients avec un nom très long sa mère",
  },
  {
    image:
      "https://greenit-s3-bucket.s3.eu-west-3.amazonaws.com/media/ingredient/huile_vegetale_de_coco.jpeg",
    alt: "ingredient",
    name: "ingredients avec un nom long",
  },
  {
    image:
      "https://greenit-s3-bucket.s3.eu-west-3.amazonaws.com/media/ingredient/huile_vegetale_de_coco.jpeg",
    alt: "ingredient",
    name: "ingredients avec un nom très long sa mère",
  },
  {
    image:
      "https://greenit-s3-bucket.s3.eu-west-3.amazonaws.com/media/ingredient/huile_vegetale_de_coco.jpeg",
    alt: "ingredient",
    name: "ingredients avec un nom long",
  },
  {
    image:
      "https://greenit-s3-bucket.s3.eu-west-3.amazonaws.com/media/ingredient/huile_vegetale_de_coco.jpeg",
    alt: "ingredient",
    name: "ingredients avec un nom long",
  },
  {
    image:
      "https://greenit-s3-bucket.s3.eu-west-3.amazonaws.com/media/ingredient/huile_vegetale_de_coco.jpeg",
    alt: "ingredient",
    name: "ingredients avec un nom long",
  },
  {
    image:
      "https://greenit-s3-bucket.s3.eu-west-3.amazonaws.com/media/ingredient/huile_vegetale_de_coco.jpeg",
    alt: "ingredient",
    name: "ingredients avec un nom long",
  },
  {
    image:
      "https://greenit-s3-bucket.s3.eu-west-3.amazonaws.com/media/ingredient/huile_vegetale_de_coco.jpeg",
    alt: "ingredient",
    name: "ingredients avec un nom long",
  },
];

export const LDCIngredients = [
  {
    id: "f8fad675-0227-4d12-9392-0e66dd210e24",
    name: "Beurre de karité",
    amount: "5 g",
    description:
      "L’incontournable du DIY ! Le beurre de karité protège et cicatrise : il combat les agressions extérieures et réduit les sensibilités. Des études prouvent même que le beurre de karité protège de certains rayons UV. Il est nourrissant et hydratant : il renforce notre barrière cutanée et limite les pertes naturelles en eau. Il est beaucoup utilisé pour les lèvres gercées et les crevasses. Bourré en vitamines E, le beurre de karité est un excellent antioxydant ! Enfin, il pénètre rapidement dans l’épiderme pour action rapide et durable.",
    image: "ingredient/beurre_de_karite.jpeg",
    alternative:
      "De la même espèce, le beurre de karité nilotica offre une texture plus souple. On peut le substituer avec d’autres beurres végétaux : cacao, mangue…",
    isSupermarket: false,
    isOnline: true,
    isProductor: true,
    __typename: "IngredientAmountType",
  },
  {
    id: "0ed217b1-bb8a-4a8f-a7e8-8971e2e30710",
    name: "Huile végétale de sésame",
    amount: "5 g",
    description:
      "Une huile antioxydante qui protège des agressions extérieures (pollution, rayons UV, grand froid…). Elle régénère la peau et lutte contre les inflammations.",
    image: "ingredient/huile_vegetale_de_sesame.jpeg",
    alternative: "L’huile d’Olive est très protectrice.",
    isSupermarket: false,
    isOnline: true,
    isProductor: true,
    __typename: "IngredientAmountType",
  },
  {
    id: "a93ff68c-362e-46ad-b752-505dc82e2012",
    name: "Cire d'abeille",
    amount: "2 g",
    description:
      "La cire d’abeille est un support de préparation : tout droit sorti de la ruche, c’est un épaississant 100% naturel. Elle permet de durcir les préparations, idéal pour les baumes ou produits solides. Elle permet aussi de stabiliser la préparation.",
    image: "ingredient/cire_d_abeille.jpeg",
    alternative:
      "Il existe une cire d’abeille jaune et blanche. D’autres cires sont également appréciées comme celle de Candelilla (plus dure) ou Soja.",
    isSupermarket: true,
    isOnline: true,
    isProductor: true,
  },
  {
    id: "9f98a66e-539b-4a60-b88c-60b86e7a540e",
    name: "Fragrances",
    amount: "5 gouttes",
    description: "Elles sont utilisées uniquement pour leurs odeurs !",
    image: "ingredient/fragrances.jpeg",
    alternative:
      "On peut remplacer les fragrances par des huiles essentielles dans la mesure où elles peuvent être utilisées par voie cutanée avec un support ET que leurs posologies et effets aient été vérifiées au préalable).",
    isSupermarket: false,
    isOnline: true,
    isProductor: true,
  },
  {
    id: "314353da-c1ae-4054-84cd-822e6d3bd08d",
    name: "Vitamine E",
    amount: "2 gouttes",
    description:
      "La vitamine E est un antioxydant puissant. Elle permet de ralentir le vieillissement cutané de la peau et de combattre les signes de l’âge. Elle permet également de réparer la peau et accélère la cicatrisation. <br>La vitamine E est utilisée en tant que conservateur pour les phases huileuses ! Elle permet de ralentir l’oxydation des huiles végétales. ",
    image: "ingredient/vitamine_e.jpeg",
    alternative:
      "Difficile de trouver une alternative ! Pour l’oxydation des huiles végétales, la vitamine E est un indispensable.",
    isSupermarket: false,
    isOnline: true,
    isProductor: false,
  },
];

export const particularities = {
  skinType: "Peaux grasses",
  hairType: " Cheveux normaux",
  moreDetails: ["Acné", "Cuir chevelu irrité"],
};

export const questionnaireMenu = [
  {
    label: "Quel est ton type de peau ?",
    name: "tagsSkin",
    singleOptions: [
      {
        option: "Sèche",
        isSelected: false,
        tagId: "aa0c4714-970f-4ca6-9e42-8d311f88728d",
        id: "modal-particularites-peau-seche",
      },
      {
        option: "Mixte",
        isSelected: false,
        tagId: "f1942980-7bb3-4f1b-8804-1791c1bc7a73",
        id: "modal-particularites-peau-mixte",
      },
      {
        option: "Grasse",
        isSelected: false,
        tagId: "457aaf99-d832-4fcd-a247-45237e42caa8",
        id: "modal-particularites-peau-grasse",
      },
      {
        option: "Normale",
        isSelected: false,
        tagId: "17ed2783-a9af-4e48-93f7-ed422b1bb7f6",
        id: "modal-particularites-peau-mixte",
      },
    ],
  },
  {
    label: "Quel est ton type de cheveux ?",
    name: "tagsHair",
    singleOptions: [
      {
        option: "Sec",
        isSelected: false,
        tagId: "d85a188f-40f8-48b2-824d-54d4ec72f56c",
        id: "modal-particularites-cheveux-sec",
      },
      {
        option: "Gras",
        isSelected: false,
        tagId: "c2665f0a-7fdf-4dbc-a436-4a6faaf98e33",
        id: "modal-particularites-cheveux-gras",
      },
      {
        option: "Normal",
        isSelected: false,
        tagId: "redacted",
        id: "modal-particularites-cheveux-normal",
      },
    ],
  },
  {
    label: "As-tu des particularités précises ?",
    name: "tagsParticularity",
    multipleOPtions: [
      {
        name: "Visage",
        singleOptions: [
          {
            option: "Acné",
            isSelected: false,
            tagId: "4e46474c-d593-4aa2-a0de-17b3781468fd",
            id: "modal-particularites-acne",
          },
          {
            option: "Rides",
            isSelected: false,
            tagId: "redacted",
            id: "modal-particularites-rides",
          },
          {
            option: "Rougeurs",
            isSelected: false,
            tagId: "208cb22c-8332-44b9-a436-64829dcebd2c",
            id: "modal-particularites-rougeurs",
          },
        ],
      },
      {
        name: "Cheveux",
        singleOptions: [
          {
            option: "Pellicule",
            isSelected: false,
            tagId: "a61cb4b3-46ea-453d-9ba2-4328bdc028a2",
            id: "modal-particularites-pellicule",
          },
          {
            option: "Cuir chevelu irrité",
            isSelected: false,
            tagId: "30da1acf-a505-4b8e-b067-dd775e4a67c6",
            id: "modal-particularites-cuir",
          },
          {
            option: "Perte de cheveux",
            isSelected: false,
            tagId: "3b29c90c-6e8b-4cd6-8b8d-4f4f079a338b",
            id: "modal-particularites-perte",
          },
        ],
      },
    ],
  },
  {
    label: "Des recettes pour la maison, ça te dit ?",
    name: "engagement",
    singleOptions: [
      {
        option: "Pourquoi pas !",
        isSelected: false,
        tagId: "redacted",
        id: "modal-particularites-recettes-maison-oui",
      },
      {
        option: "Non, pas pour le moment",
        isSelected: false,
        tagId: "redacted",
        id: "modal-particularites-recettes-maison-non",
      },
    ],
  },
];

export const optionIcons = ["square", "square-rounded", "circle", "polygon"];

export const selectOption = (
  options: any,
  selected: string,
  unselect = false,
) => {
  let selectedOptions = [];
  let isSelected;
  for (const element of options) {
    isSelected =
      element.option === selected &&
      (unselect ? element.isSelected : !element.isSelected);
    selectedOptions.push({ ...element, isSelected: isSelected });
    element.isSelected = isSelected;
  }
  return selectedOptions;
};

export const getSelectedOptions = (options: any) => {
  let ops = [];
  for (const option of options) {
    if (option.isSelected) {
      ops.push(option.option);
    }
  }
  return ops;
};

export const getTagIdsByName = (particularities: any) => {
  const p = {
    tagsSkin: [],
    tagsHair: [],
    tagsParticularity: [],
  };
  for (const [key, values] of Object.entries(particularities)) {
    const step = questionnaireMenu.find((element: any) => element.name === key);
    if (step) {
      if (key !== "tagsParticularity") {
        // @ts-ignore
        p[key] = values.map(
          (v: any) =>
            // @ts-ignore
            step.singleOptions.find((el: any) => el.option === v)["tagId"],
        );
      } else {
        // @ts-ignore
        p[key] = [
          // @ts-ignore
          step.multipleOPtions[0].singleOptions.find(
            // @ts-ignore
            (el: any) => el.option === values[0],
          )["tagId"],
        ].concat([
          // @ts-ignore
          step.multipleOPtions[1].singleOptions.find(
            // @ts-ignore
            (el: any) => el.option === values[1],
          )["tagId"],
        ]);
      }
    }
  }
  return p;
};

export const getIngredientAtHomeCount = (
  ingredientAtHome: any,
  recipe: any,
) => {
  let count = 0;
  recipe.ingredients.forEach((ingredient: any) => {
    if (ingredientAtHome.find((el: any) => el.id === ingredient.id)) {
      count++;
    }
  });
  return count;
};

export const annotateRecipeResult = (recipes: any, ingredientAtHome: any) => {
  const newRecipes = cloneDeep(recipes);
  for (let i = 0; i < recipes.length; i++) {
    newRecipes[i].node["ingredientAtHomeCount"] = getIngredientAtHomeCount(
      ingredientAtHome,
      recipes[i]?.node,
    );
    newRecipes[i].node["ingredientAtHomeRatio"] =
      newRecipes[i].node["ingredientAtHomeCount"] /
      recipes[i]?.node.numberOfIngredients;
  }
  return newRecipes.sort((a: any, b: any) => {
    return b.node.ingredientAtHomeRatio - a.node.ingredientAtHomeRatio;
  });
};

//Investigate for bugs
export const persistParticularityOnFirstLogin = (
  mutation: MutationOperation,
) => {
  const particularity = localStorage.getItem("particularity");
  if (particularity) {
    persistMutation(mutation, {
      variables: {
        particularities: JSON.stringify(
          particularityConverter(JSON.parse(particularity)),
        ),
      },
    });
    localStorage.removeItem("particularity");
  }
};

export const persistIngredientAtHomeOnFirstLogin = (
  mutation: MutationOperation,
) => {
  const ingredientAtHome = localStorage.getItem("ingredientAtHome");
  if (ingredientAtHome) {
    persistMutation(mutation, {
      variables: {
        ingredientAtHome: ingredientAtHomeConverter(
          JSON.parse(ingredientAtHome),
        ),
      },
    });
    localStorage.removeItem("ingredientAtHome");
  }
};

export const ingredientAtHomeConverter = (ingredientAtHome: any) => {
  const data: any = {
    additions: [],
    deletions: [],
  };
  ingredientAtHome.forEach((element: any) => {
    data.additions.push(element.id);
  });
  return data;
};

export const particularityConverter = (particularities: any) => {
  const tags = ["tagsSkin", "tagsHair", "tagsParticularity"];
  const data: any = {
    tagsSkin: [],
    tagsHair: [],
    tagsParticularity: [],
  };
  particularities.forEach((element: any) => {
    for (const [key, _] of Object.entries(element)) {
      if (tags.includes(key)) {
        data[key] = element[key];
      }
    }
  });
  return data;
};

export const getRandomKey = (componentName: string) => {
  return componentName + "-" + Math.random() * 100000;
};

export interface Step {
  nextStep?: any;
}

//ICM & LDC
export const hasIngredientOnList = (list: any, ingredient: string) => {
  return list.map((el: any) => el.id).some((el: any) => el === ingredient);
};
