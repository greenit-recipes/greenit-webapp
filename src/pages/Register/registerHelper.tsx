import * as yup from "yup";

export const schemaRegister = yup.object().shape({
  email: yup.string().email().required("L'email est obligatoire."),
  utilisateur: yup
    .string()
    .min(4, "Le nom d'utilisateur doit contenir au moins 4 caractères.")
    .max(
      16,
      "Le nom d'utilisateur est trop long, il doit être moins de 16 caractères maximum."
    )
    .required("Le nom d'utilisateur est obligatoire.")
    .matches(
      /^[^$&+,:;=?@#¨|'<>^()%!¿§«»ω⊙¤°℃℉€¥£¢¡®©]*$/,
      "Le nom d'utilisateur ne doit pas contenir de caractères spéciaux sauf('.', '_', '-')"
    ),
  password: yup
    .string()
    .max(
      32,
      "Mot de passe trop long, il doit être moins de 32 caractères maximum."
    )
    .required("Le mot de passe est obligatoire.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.{8,})/,
      "Le mot de passe doit contenir 8 caractères, une majuscule, une minuscule."
    ),
  passwordConfirmation: yup
    .string()
    .oneOf(
      [yup.ref("password"), null],
      "Les mots de passe ne correspondent pas."
    ),
  urlSocialMedia: yup
    .array(
      yup.object({
        url: yup.string().required("Ce champ est obligatoire."),
      })
    )
    .min(1, "Ce champ est obligatoire"),
  userCategoryLvl: yup.object().required("Ce champ est obligatoire."),
  userCategoryAge: yup.object().required("Ce champ est obligatoire."),
}); // _ - .



export const schemaRegisterCreatorProfil = yup.object().shape({
  email: yup.string().email().required("L'email est obligatoire."),
  utilisateur: yup
    .string()
    .min(4, "Le nom d'utilisateur doit contenir au moins 4 caractères.")
    .max(
      16,
      "Le nom d'utilisateur est trop long, il doit être moins de 16 caractères maximum."
    )
    .required("Le nom d'utilisateur est obligatoire.")
    .matches(
      /^[^$&+,:;=?@#¨|'<>^()%!¿§«»ω⊙¤°℃℉€¥£¢¡®©]*$/,
      "Le nom d'utilisateur ne doit pas contenir de caractères spéciaux sauf('.', '_', '-')"
    ),
  password: yup
    .string()
    .max(
      32,
      "Mot de passe trop long, il doit être moins de 32 caractères maximum."
    )
    .required("Le mot de passe est obligatoire.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.{8,})/,
      "Le mot de passe doit contenir 8 caractères, une majuscule, une minuscule."
    ),
  passwordConfirmation: yup
    .string()
    .oneOf(
      [yup.ref("password"), null],
      "Les mots de passe ne correspondent pas."
    ),
  urlSocialMedia: yup
    .array(
      yup.object({
        url: yup.string().required("Ce champ est obligatoire."),
      })
    )
    .min(1, "Ce champ est obligatoire"),
  biographie: yup.string().required("Ce champ est obligatoire."),
}); // _ - .


export const optionsUserCategoryLvl = [
  { value: "beginner", label: "Petit.e curieux.se, je débute dans le DIY." },
  {
    value: "intermediate",
    label: "Explorateur.ice avisé.e, j'ai déjà des notions en DIY.",
  },
  {
    value: "advanced",
    label: "Adepte convaincu.e, je suis passioné.e de DIY !",
  },
];

export const optionsUserCategoryAge = [
  { value: "young", label: "Moins de 20 ans, jeune mais pas trop." },
  {
    value: "young_adult",
    label: "Entre 20 et 35 ans, adulte mais pas trop non plus.",
  },
  { value: "adult", label: "Entre 35 et 50 ans, adulte mais pas que." },
  { value: "senior", label: "Plus de 50 ans, interdit de m'appeler senior !" },
];
