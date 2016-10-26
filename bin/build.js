#! /usr/bin/env node

const log = require("./log")("build compile"),
      rollup = require("./rollup"),
      shell = require("shelljs"),
      {name} = JSON.parse(shell.cat("package.json"));

log.timer("compile builds");
rollup().then(() => {
  log.timer("compile full builds");
  rollup({deps: true}).then(() => {

    log.timer("uglify builds");
    shell.exec(`uglifyjs build/${name}.js -c warnings=false -m --comments -o build/${name}.min.js`);
    shell.exec(`uglifyjs build/${name}.full.js -c warnings=false -m --comments -o build/${name}.full.min.js`);
    log.timer("create .zip distribution");
    shell.exec(`rm -f build/${name}.zip && zip -j -q build/${name}.zip -- LICENSE README.md build/${name}.js build/${name}.min.js build/${name}.full.js build/${name}.full.min.js`);
    log.exit();
    shell.exit(0);

  });
});
