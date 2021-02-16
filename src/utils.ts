// SOURCE = https://ohdoylerules.com/snippets/tailwind-screens-in-js/

export const getBreakpoint = (screen = "") => {
  // "Theme" is an alias to where you keep your tailwind.config.js - most likely your project root
  const screens = require("./tailwind.config.js").theme.extend.screens;
  // create a keyed object of screens that match
  const matches = Object.entries(screens).reduce((results, [name, size]) => {
    const mediaQuery =
      typeof size === "string"
        ? `(min-width: ${size})`
        : /*@ts-ignore*/
          `(max-width: ${size.max})`;
    // @ts-ignore
    results[name] = window.matchMedia(mediaQuery).matches;
    return results;
  }, {});
  // show all matches when there is no screen choice
  if (screen === "") {
    return matches;
  }
  // invalid screen choice
  if (!screens[screen]) {
    console.error(`No match for "${screen}"`);
    return false;
  }
  // @ts-ignore
  const breakpoints = matches[screen];
  return breakpoints;
};
