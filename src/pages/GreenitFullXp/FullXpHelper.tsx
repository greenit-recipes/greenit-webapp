import {
  boxIngredientCreme,
  boxIngredientLessive,
  boxIngredientSavon,
} from "icons";
import { RecipeDifficulty } from "../../graphql";

const userGreenit = {
  author: {
    id: "38b3dc6d-a3f5-4f65-85ea-a765d140584f",
    imageProfile: "user/Greenit/profil/newlogocolor.png",
    username: "Greenit",
    biographie:
      "Le Marmiton des produits d'hygiène 🍀 Répandre un mode de consommation artisanale et plus respectueux de l'environnement ! Découvrez toutes nos recettes sur Greenit Community et des astuces sur nos réseaux !",
    urlsSocialMedia: [
      { url: "https://www.instagram.com/greenitcommunity/" },
      { url: "https://www.tiktok.com/@greenitcommunity" },
      { url: "https://www.facebook.com/greenitcommunity" },
    ],
  },
};

export const recipesBegginerFullXp = [
  {
    id: "3b349672-a3b4-4eb5-a063-41eb79e5b542",
    urlId: "lessive-au-geranium",
    image: boxIngredientLessive,
    name: "Lessive maison",
    numberOfIngredients: 4,
    quantity: 2,
    difficulty: RecipeDifficulty.Beginner,
  },
  {
    id: "d9c8be17-1997-48de-adac-433121693b40",
    urlId: "savon-solide-tout-en-un",
    image: boxIngredientSavon,
    name: "Savon solide",
    numberOfIngredients: 3,
    quantity: 1,
    difficulty: RecipeDifficulty.Beginner,
  },
  {
    id: "57d20e4b-72e7-48ce-99e1-839c75cb1566",
    urlId: "creme-de-jour-debutant",
    image: boxIngredientCreme,
    name: "Crème de jour",
    numberOfIngredients: 5,
    quantity: 1,
    difficulty: RecipeDifficulty.Beginner,
  },
];

export const ingredientBeginner = [
  {
    amount: "20 g",
    name: "Beurre de karité",
    description:
      "L’incontournable du DIY ! Le beurre de karité protège et cicatrise : il combat les agressions extérieures et réduit les sensibilités. Des études prouvent même que le beurre de karité protège de certains rayons UV. Il est nourrissant et hydratant : il renforce notre barrière cutanée et limite les pertes naturelles en eau. Il est beaucoup utilisé pour les lèvres gercées et les crevasses. Bourré en vitamines E, le beurre de karité est un excellent antioxydant ! Enfin, il pénètre rapidement dans l’épiderme pour action rapide et durable.",
    alternative:
      "De la même espèce, le beurre de karité nilotica offre une texture plus souple. On peut le substituer avec d’autres beurres végétaux : cacao, mangue…",
    image: "ingredient/beurre_de_karite.jpeg",
  },
  {
    amount: "50 g",
    name: "Tensioactif Coco Sulfate",
    description:
      "Le tensioactif permet de lier une phase aqueuse et une phase huileuse et de rendre la préparation solide. Il s'agit d'un dérivé d'huile de coco. Il est très apprécié pour ses propriétés moussantes et lavantes. Il reste moins polluant que beaucoup de tensioactifs utilisés pour les produits conventionnels.",
    alternative:
      "D'autres tensioactifs sont utilisés : SCI, SLMI (pour les savons et shampooings doux).",
    image: "ingredient/tensioactif_coco_sulfate.jpg",
  },
  {
    amount: "1 g",
    name: "Conservateur végétal",
    description:
      "À chaque émulsion (mélange eau et huile), il est vivement recommandé d’utiliser un conservateur ! Un conservateur d’origine végétale est préférable. Le conservateur Cosgard ou Geogard : il est composé d’acide benzylique, acide déhydroacétique et eau. C’est le conservateur de référence en DIY.",
    alternative:
      "Des autres conservateurs existent : on apprécie l’extrait de pépins de pamplemousse !",
    image: "ingredient/conservateur_vegetal.jpeg",
  },
  {
    amount: "5 g",
    name: "Cire émulsifiante végétale",
    description:
      "La cire émulsifiante permet de mélanger une phase aqueuse avec une phase huileuse. En d'autres termes, c'est l'œuf de la mayonnaise. C'est le support de la préparation ! La cire n°3 donne une texture assez légère et elle est très facile à utiliser pour ceux et celles qui débutent en émulsion.",
    alternative:
      "Les cires émulsifiantes peuvent se substituer entre elles : certaines sont plus épaisses, plus aérées ou plus pénétrantes. Les quantités d'eau et d'huile changent en fonction des cires !",
    image: "ingredient/cire_emulsifiante_n3.jpg",
  },
  {
    amount: "80 g",
    name: "Savon de Marseille (en copeaux)",
    description:
      "Il est multi-usage ! Aussi bien utilisée pour les lessives, les nettoyants pour une maison plus écologique. Il est dégraissant et nettoyant, il est très efficace poour tout type de lavage : vaisselle, linge et surface. Il est biodégrable et non-polluant. Et avec ça, on lui reconnaît de nombreuses propriétés pour le soin du corps. Hypoallergénique, le savon de Marseille est très doux pour se laver. Il est efficace en cas d’eczéma et irritations de la peau.",
    alternative:
      "Le savon noir est un bon substitut au savon de Marseille, pour ses qualités de détergent.",
    image: "ingredient/savon_de_marseille__en_copeaux_.jpeg",
  },
  {
    amount: "95 ml",
    name: "Hydrolat de ciste ladanifère",
    description:
      "L'hydrolat de ciste a une odeur boisée-ambrée assez particulière. Il est également apprécié pour ses qualités astringentes et purifiantes exceptionnelles. Il apaise les peaux sensibles et calme les rougeurs.",
    alternative:
      "D'autres alternatives : Hydrolat de Géranium, Hélichryse Italienne...",
    image: "ingredient/hydrolat_ciste.jpg",
  },
  {
    amount: "30 g",
    name: "Bicarbonate de soude",
    description:
      "Pour une maison écologique, rien de mieux que le bicarbonate de soude ! Il est multi-usage : il nettoie, dégraisse et entretient les machines/robinetterie. Il fait briller toutes les surfaces. Il est aussi apprécié en tant que désodorisant dans les lessives, il vient d’ailleurs booster son efficacité ! C’est un très bon détachant. Le plus, le bicarbonate de soude se conserve très longtemps. Il existe deux types de bicarbonate de soude : celui utilisé pour la maison (plus détergent) et l’alimentaire (plus doux pour un usage cosmétique ou soin buccal).",
    alternative:
      "Difficile de trouver une alternative ! D’autres actifs peuvent être utilisés : cristaux de soude, percabonate de soude, acide citrique.",
    image: "ingredient/bicarbonate_de_soude.jpeg",
  },
];

export const ustensilsBeginner = [
  {
    amount: "1",
    name: "Moule",
    image: "utensil/moule_s_.jpeg",
  },
  {
    amount: "1",
    name: "Pot 100 ml",
    image: "utensil/pot_100_ml.jpeg",
  },
];

export const ustensilsAlreadyHaveBeginner = [
  {
    amount: "1",
    name: "Fouet",
    image: "utensil/fouet.jpeg",
  },
  {
    amount: "2",
    name: "Bols",
    subName: "qui vont au bain-marie",
    image: "utensil/bols_en_inox_100_ml.jpeg",
  },
  {
    amount: "1",
    name: "Casserole",
    image: "utensil/casserole.jpeg",
  },
  {
    amount: "2",
    name: "Bouteilles de 1 L",
    image: "utensil/bouteille_1l.jpeg",
  },
];
