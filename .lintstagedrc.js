module.exports = {
  'src/**/*.{js,jsx,ts,tsx,html,css,scss}': async () => {
    return [`npx prettier --write 'src/**/*.{js,jsx,ts,tsx,html,css,scss}'`]
  },
}
