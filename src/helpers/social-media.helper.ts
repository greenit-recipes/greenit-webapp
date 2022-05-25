import {
  InstagramIcon,
  wwwlogo,
  FBIcon,
  tiktokIcon,
  pinterestIcon,
  twitterIcon,
  youtubeIcon,
} from 'icons';
import { includes, forEach } from 'lodash';

const socialMedia = {
  instagram: {
    name: 'Instagram',
    icon: InstagramIcon,
  },
  facebook: {
    name: 'Facebook',
    icon: FBIcon,
  },
  tiktok: {
    name: 'tiktok',
    icon: tiktokIcon,
  },
  pinterest: {
    name: 'Pinterest',
    icon: pinterestIcon,
  },
  twitter: {
    name: 'Twitter',
    icon: twitterIcon,
  },
  youtube: {
    name: 'Youtube',
    icon: youtubeIcon,
  },
};

export const getLogoAndNameByUrl = (url: string) => {
  let logo = { name: '', icon: '' };
  forEach(socialMedia, function (value, key) {
    if (includes(url, key)) {
      logo = value;
    }
  });
  if (logo?.name === '')
    return {
      name: 'Autres',
      icon: wwwlogo,
    };
  return logo;
};
