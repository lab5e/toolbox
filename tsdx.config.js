const replace = require("@rollup/plugin-replace");
const vue = require("rollup-plugin-vue");
const scss = require("rollup-plugin-scss");

module.exports = {
  // This function will run for each entry/format/env combination
  rollup(config, opts) {
    config.plugins = config.plugins.map((p) =>
      p.name === "replace"
        ? replace({
            "process.env.NODE_ENV": JSON.stringify(opts.env),
            preventAssignment: true,
          })
        : p,
    );

    config.external = ["vuetify", "vue"];
    config.plugins.push(vue());
    config.plugins.push(scss());

    return config; // always return a config.
  },
};
