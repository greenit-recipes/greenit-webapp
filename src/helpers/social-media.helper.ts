import { wwwlogo } from "icons";
import { forEach, includes } from "lodash";

const socialMedia = {
  instagram: {
    name: "Instagram",
    icon: "bxl-instagram text-darkBlue hover:text-yellow",
  },
  facebook: {
    name: "Facebook",
    icon: "bxl-facebook text-darkBlue hover:text-yellow",
  },
  tiktok: {
    name: "tiktok",
    icon: "bxl-tiktok text-darkBlue hover:text-yellow",
  },
  pinterest: {
    name: "Pinterest",
    icon: "bxl-pinterest text-darkBlue hover:text-yellow",
  },
  twitter: {
    name: "Twitter",
    icon: "bxl-twitter text-darkBlue hover:text-yellow",
  },
  youtube: {
    name: "Youtube",
    icon: "bxl-youtube text-darkBlue hover:text-yellow",
  },
};
export const getLogoAndNameByUrl = (url: string) => {
  let logo = { name: "", icon: "" };
  forEach(socialMedia, function (value, key) {
    if (includes(url, key)) {
      logo = value;
    }
  });
  if (logo?.name === "")
    return {
      name: "Autres",
      icon: "bx-world text-darkBlue hover:text-yellow",
    };
  return logo;
};
