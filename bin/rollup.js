const banner = require("./banner"),
      buble = require("rollup-plugin-buble"),
      deps = require("rollup-plugin-node-resolve"),
      rollup = require("rollup"),
      shell = require("shelljs"),
      watch = require("rollup-watch"),
      {name} = JSON.parse(shell.cat("package.json"));

module.exports = function(opts = {}) {

  function output(e) {
    switch (e.code) {
      case "BUILD_START":
        return shell.echo("bundling...");
      case "BUILD_END":
        return shell.echo(`bundled in ${e.duration}ms.${opts.watch ? " Watching for changes..." : ""}`);
      case "ERROR":
        shell.echo(`bundle error in '${e.error.id}':`);
        return shell.echo(e.error);
      default:
        return undefined;
    }
  }

  const plugins = [];
  if (opts.deps) plugins.push(deps({jsnext: true}));
  plugins.push(buble({exclude: "node_modules/d3-*/**"}));

  const entry = {entry: "index.js", plugins, onwarn: () => {}};
  const config = {
    banner,
    dest: `build/${name}${opts.deps ? ".full" : ""}.js`,
    format: "umd",
    moduleId: name,
    moduleName: "d3plus"
  };

  shell.mkdir("-p", "build");
  if (opts.watch) return watch(rollup, Object.assign(entry, config)).on("event", output);
  else return rollup.rollup(entry).then(bundle => bundle.write(config));

};
