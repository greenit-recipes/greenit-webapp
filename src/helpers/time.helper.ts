import dayjs from "dayjs";
const localizedFormat = require("dayjs/plugin/localizedFormat");
import "dayjs/locale/fr";

dayjs.extend(localizedFormat);

export const momentGreenit = (date: string) => {
  return dayjs(date).locale("fr").format("l").toString();
};

export const momentGreenitUs = (date: string) => {
  return dayjs(date).locale("fr").format("YYYY-MM-DD").toString();
};

export const momentGreenitNow = () => {
  return dayjs(new Date()).locale("fr").format("l").toString();
};
