const buble = require("rollup-plugin-buble"),
      deps = require("rollup-plugin-node-resolve"),
      json = require("rollup-plugin-json"),
      manifest = JSON.parse(require("shelljs").cat("package.json")),
      rollup = require("rollup"),
      shell = require("shelljs"),
      watch = require("rollup-watch");

module.exports = function(opts = {}) {

  function output(e) {
    switch (e.code) {
      case "BUILD_START":
        return shell.echo("bundling...");
      case "BUILD_END":
        return shell.echo(`bundled in ${e.duration}ms.${opts.watch ? " Watching for changes..." : ""}`);
      default:
        return undefined;
    }
  }

  const plugins = [json()];
  if (opts.deps) plugins.push(deps({jsnext: true}));
  plugins.push(buble({exclude: "node_modules/d3-*/**"}));

  const entry = {entry: "index.js", plugins, onwarn: () => {}};
  const config = {
    dest: `build/${manifest.name}${opts.deps ? ".full" : ""}.js`,
    format: "umd",
    globals: (id) => id.replace(/-/g, "_"),
    moduleId: manifest.name,
    moduleName: manifest.name.replace(/-/g, "_")
  };

  shell.mkdir("-p", "build");
  if (opts.watch) return watch(rollup, Object.assign(entry, config)).on("event", output);
  else return rollup.rollup(entry).then((bundle) => bundle.write(config));

};
