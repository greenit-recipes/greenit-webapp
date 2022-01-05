import * as yup from "yup";
import {
  imageValidation,
  videoValidation,
} from "helpers/yup-validation.helper";
const requiredFieldText: string = "Ce champ est obligatoire.";

export const yupCreateRecipe = yup.object().shape({
  image: imageValidation(),
  video: videoValidation(),
  name: yup.string().required(requiredFieldText),
  duration: yup.string().required(requiredFieldText),
  description: yup.string().required(requiredFieldText),
  difficulty: yup.object().required(requiredFieldText),
  category: yup.object().required(requiredFieldText),
  expiry: yup.string().required(requiredFieldText),
  ingredients: yup // Ne marche pas
    .array(
      yup.object({
        quantity: yup.string().required(requiredFieldText),
        name: yup.object().required(requiredFieldText),
      })
    )
    .min(1, requiredFieldText),
  instructions: yup
    .array(
      yup.object({
        instruction: yup.string().required(requiredFieldText),
      })
    )
    .min(1, requiredFieldText),
  utensils: yup
    .array(
      yup.object({
        quantity: yup.string().required(requiredFieldText),
        name: yup.object().required(requiredFieldText),
      })
    )
    .min(1, requiredFieldText),

  tags: yup.array().required(requiredFieldText),
  notes_from_author: yup.string(),
});
