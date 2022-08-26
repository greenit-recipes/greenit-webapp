import { map, mapValues } from "lodash";

export const setObjectFilterSession = (
  sessionFilter: any,
  currentSearchValue: any,
) => {
  window.sessionStorage.setItem(
    "filterListPage",
    JSON.stringify(
      sessionFilter
        ? currentSearchValue
        : { sessionFilter, ...currentSearchValue },
    ),
  );
};

export const getObjectSession = (sessionName: any) => {
  const session = window.sessionStorage.getItem(sessionName) || "";
  const sessionParse = session ? JSON.parse(session) : null;
  return sessionParse;
};

export const cleanDataPlayload = (filter: any) =>
  mapValues(filter, function (value, key) {
    if (key === "search") return value;
    if (key === "particularity") return;
    if (key === "ingredientsAtHome") return;
    return map(value, x => x.value);
  });
