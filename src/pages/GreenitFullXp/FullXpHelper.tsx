import {RecipeDifficulty} from "../../graphql";

const userGreenit = {
    author: {
        id: "38b3dc6d-a3f5-4f65-85ea-a765d140584f",
        imageProfile: "user/Greenit/profil/newlogocolor.png",
        username: "Greenit",
        biographie:
            "Le Marmiton des produits d'hygiène 🍀 Répandre un mode de consommation artisanale et plus respectueux de l'environnement ! Découvrez toutes nos recettes sur Greenit Community et des astuces sur nos réseaux !",
        urlsSocialMedia: [
            {url: "https://www.instagram.com/greenitcommunity/"},
            {url: "https://www.tiktok.com/@greenitcommunity"},
            {url: "https://www.facebook.com/greenitcommunity"},
        ],
    },
};

export const recipesBegginerFullXp = [
    {
        id: "0abe3c2c-1883-46db-a2c6-81ee46f7475d",
        urlId: "baume-a-levres",
        image: "user/Andrrbr/recipe/Baume_a_levres.jpeg",
        name: "Lessive maison",
        numberOfIngredients: 2,
        quantity: 2,
        difficulty: RecipeDifficulty.Beginner,
    },
    {
        id: "e322ed9a-5568-4261-84a2-f2f837361368",
        urlId: "baume-a-levres",
        image: "user/Andrrbr/recipe/Baume_a_levres.jpeg",
        name: "Savon solide",
        numberOfIngredients: 1,
        quantity: 1,
        difficulty: RecipeDifficulty.Beginner,
    },
    {
        id: "bf8c72c9-f642-488d-9e41-f1cab802a142",
        urlId: "baume-a-levres",
        image: "user/Andrrbr/recipe/Baume_a_levres.jpeg",
        name: "Crème de jour",
        numberOfIngredients: 4,
        quantity: 1,
        difficulty: RecipeDifficulty.Beginner,
    },
];

export const ustensilsAlreadyHaveBeginner = [
    {
        amount: "1",
        name: "Fouet",
        image: "user/Andrrbr/recipe/Baume_a_levres.jpeg",
    },
    {
        amount: "2",
        name: "Bols",
        subName: "qui vont au bain-marie",
        image: "user/Andrrbr/recipe/Baume_a_levres.jpeg",
    },
    {
        // amount: "2",
        amount: "2",
        name: "Bouteilles de 1,5 L",
        image: "user/Andrrbr/recipe/Baume_a_levres.jpeg",
    },
];

export const ingredientBeginner = [
    {
        amount: "3 ml",
        name: "Bicarbonate de soude",
        description:
            "Pour une maison écologique, rien de mieux que le bicarbonate de soude ! Il est multi-usage : il nettoie, dégraisse et entretient les machines/robinetterie. Il fait briller toutes les surfaces. Il est aussi apprécié en tant que désodorisant dans les lessives, il vient d’ailleurs booster son efficacité ! C’est un très bon détachant. Le plus, le bicarbonate de soude se conserve très longtemps. Il existe deux types de bicarbonate de soude : celui utilisé pour la maison (plus détergent) et l’alimentaire (plus doux pour un usage cosmétique ou soin buccal).",
        alternative:
            "Difficile de trouver une alternative ! D’autres actifs peuvent être utilisés : cristaux de soude, percabonate de soude, acide citrique.",
        image: "ingredient/bicarbonate_de_soude.jpeg",
    },
    {
        amount: "3 ml",
        name: "Savon de Marseille",
        description:
            "Il est multi-usage ! Aussi bien utilisée pour les lessives, les nettoyants pour une maison plus écologique. Il est dégraissant et nettoyant, il est très efficace poour tout type de lavage : vaisselle, linge et surface. Il est biodégrable et non-polluant. Et avec ça, on lui reconnaît de nombreuses propriétés pour le soin du corps. Hypoallergénique, le savon de Marseille est très doux pour se laver. Il est efficace en cas d’eczéma et irritations de la peau.",
        alternative:
            "Le savon noir est un bon substitut au savon de Marseille, pour ses qualités de détergent.",
        image: "ingredient/savon_de_marseille__en_copeaux_.jpeg",
    },
    {
        amount: "3 ml",
        name: "Hydrolat de Lavande de fine",
        description:
            "L’hydrolat de Lavande Aspic calme et apaise. Il permet de rafraîchir les peaux irritées suite à un coup de soleil ou piqûres d’insectes. Il est également utilisé pour les soins de peaux acnéiques.",
        alternative:
            "L’hydrolat de Géranium Bourbon est tout aussi purifiante et apaisante. Elle agit également sur l’acné.",
        image: "ingredient/hydrolat_de_lavande.jpeg",
    },
    {
        amount: "3 ml",
        name: "Tensioactifs Coco Sulfate -- pas bon",
        description: "c'est de la coco",
        alternative: "wsh alors",
        image: "user/Andrrbr/recipe/Baume_a_levres.jpeg",
    },
    {
        amount: "3 ml",
        name: "Beurre de karité",
        description:
            "L’incontournable du DIY ! Le beurre de karité protège et cicatrise : il combat les agressions extérieures et réduit les sensibilités. Des études prouvent même que le beurre de karité protège de certains rayons UV. Il est nourrissant et hydratant : il renforce notre barrière cutanée et limite les pertes naturelles en eau. Il est beaucoup utilisé pour les lèvres gercées et les crevasses. Bourré en vitamines E, le beurre de karité est un excellent antioxydant ! Enfin, il pénètre rapidement dans l’épiderme pour action rapide et durable.",
        alternative:
            "De la même espèce, le beurre de karité nilotica offre une texture plus souple. On peut le substituer avec d’autres beurres végétaux : cacao, mangue…",
        image: "ingredient/beurre_de_karite.jpeg",
    },
    {
        amount: "3 ml",
        name: "Argile Blanche",
        description:
            "L’argile blanche est multi-tâche ! Elle est utilisée pour tous les types de peau. D’un côté, elle est absorbante, apaisante et nettoyante, de l’autre, elle régule le sébum et réduit les imperfections. On l’utilise aussi pour en cas de gencives enflammées. Elle fait également un bon anti-transpirant.",
        alternative:
            "Contre l’acné, on utilisera plutôt l’argile verte. Pour ses autres propriétés nettoyantes et apaisantes : toutes les argiles sont possibles.",
        image: "ingredient/argile_blanche.jpeg",
    },
    {
        amount: "3 ml",
        name: "Cire émulsifiante végétale",
        description:
            "Les cires émulsifiantes permettent de mélanger les phases aqueuses et huileuses. On privilégiera les cires d’origines végétales.",
        alternative: "De nombreux émulsifiants sont disponibles en magasin DIY !",
        image: "ingredient/cire_emulsifiante_vegetale.jpeg",
    },
    {
        amount: "3 ml",
        name: "Conservateur végétal",
        description:
            "À chaque émulsion (mélange eau et huile), il est vivement recommandé d’utiliser un conservateur ! Un conservateur d’origine végétale est préférable. Le conservateur Cosgard ou Geogard : il est composé d’acide benzylique, acide déhydroacétique et eau. C’est le conservateur de référence en DIY.",
        alternative:
            "Des autres conservateurs existent : on apprécie l’extrait de pépins de pamplemousse !",
        image: "ingredient/conservateur_vegetal.jpeg",
    },
    {
        amount: "3 ml",
        name: "coco",
        description: "c'est de la coco",
        alternative: "wsh alors",
        image: "user/Andrrbr/recipe/Baume_a_levres.jpeg",
    },
    {
        amount: "3 ml",
        name: "coco",
        description: "c'est de la coco",
        alternative: "wsh alors",
        image: "user/Andrrbr/recipe/Baume_a_levres.jpeg",
    },
    {
        amount: "3 ml",
        name: "coco",
        description: "c'est de la coco",
        alternative: "wsh alors",
        image: "user/Andrrbr/recipe/Baume_a_levres.jpeg",
    },
    {
        amount: "3 ml",
        name: "coco",
        description: "c'est de la coco",
        alternative: "wsh alors",
        image: "user/Andrrbr/recipe/Baume_a_levres.jpeg",
    },
];

export const ustensilsBeginner = [
    {
        amount: "2",
        name: "Moules",
        image: "user/Andrrbr/recipe/Baume_a_levres.jpeg",
    },
    {
        amount: "2",
        name: "Contenants en verre 30 g",
        image: "user/Andrrbr/recipe/Baume_a_levres.jpeg",
    },
];
