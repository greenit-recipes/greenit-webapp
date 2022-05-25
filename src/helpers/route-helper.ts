import { history, RouteName } from 'App';
import { getObjectSession } from 'helpers/session-helper';

export const previousPath = (path = RouteName.accueil) => {
  if (getObjectSession('pathname'))
    history.goBack(); // need to have previous path
  else history.push(path);
};
