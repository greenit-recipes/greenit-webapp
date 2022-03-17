import { InstagramIcon, wwwlogo } from "icons";
import { includes, forEach } from "lodash";

const socialMedia = {
  "instagram": {
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
<<<<<<< HEAD
};
=======
};
>>>>>>> 3cb71dc (create profil, type need to be optional for update and create account)
