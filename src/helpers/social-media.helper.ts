import { InstagramIcon, wwwlogo } from "icons";
import { includes, forEach } from "lodash";

const socialMedia = {
  "instagram.com": {
     name: "Instagram",
     icon: InstagramIcon
    },
};

export const getLogoAndNameByUrl = (url: string) => {
  let logo = { name: "", icon: ""};
  forEach(socialMedia, function (value, key) {
    if (includes(url, key)) {
      logo = value;
    }
  });
  if (logo?.name === "") return {
    name: "Autres",
    icon: wwwlogo
   }
  return logo;
};