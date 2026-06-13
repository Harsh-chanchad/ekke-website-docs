// This file overrides the root postcss.config.js (which has Tailwind configured
// for the akke-website theme) so it does NOT leak into the Docusaurus build.
module.exports = {
  plugins: {
    autoprefixer: {},
  },
};
