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
