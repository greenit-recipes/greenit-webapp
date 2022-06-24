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
