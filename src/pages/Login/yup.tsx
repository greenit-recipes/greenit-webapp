import * as yup from "yup";

export const yupLogin = yup.object().shape({
    email: yup.string().email().required("L'email est obligatoire."),
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
  }); // _ - .