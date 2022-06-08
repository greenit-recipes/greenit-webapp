import {
  InstagramIcon,
  wwwlogo,
  FBIcon,
  tiktokIcon,
  pinterestIcon,
  twitterIcon,
  youtubeIcon,
} from "icons";
import { includes, forEach } from "lodash";

const socialMedia = {
  instagram: {
    name: "Instagram",
    icon: "bxl-instagram text-darkBlue",
  },
  facebook: {
    name: "Facebook",
    icon: "bxl-facebook text-darkBlue",
  },
  tiktok: {
    name: "tiktok",
    icon: "bxl-tiktok text-darkBlue",
  },
  pinterest: {
    name: "Pinterest",
    icon: "bxl-pinterest text-darkBlue",
  },
  twitter: {
    name: "Twitter",
    icon: "bxl-twitter text-darkBlue",
  },
  youtube: {
    name: "Youtube",
    icon: "bxl-youtube text-darkBlue",
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
      icon: wwwlogo,
    };
  return logo;
};
