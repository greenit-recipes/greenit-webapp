const {override, addBabelPlugin, disableEsLint} = require("customize-cra");

module.exports = override(
    disableEsLint(),

    //Babel Plugins
    addBabelPlugin(["transform-imports", {
        "lodash": {
            "transform": "lodash/${member}",
            "preventFullImport": true
        }
    }])
)