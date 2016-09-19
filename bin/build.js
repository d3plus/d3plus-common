#! /usr/bin/env node

const rollup = require("./rollup"),
      shell = require("shelljs"),
      {name} = JSON.parse(shell.cat("package.json"));

rollup().then(() => {
  rollup({deps: true}).then(() => {

    shell.exec(`uglifyjs build/${name}.js -c warnings=false -m --comments -o build/${name}.min.js`);
    shell.exec(`uglifyjs build/${name}.full.js -c warnings=false -m --comments -o build/${name}.full.min.js`);
    shell.exec(`rm -f build/${name}.zip && zip -j -q build/${name}.zip -- LICENSE README.md build/${name}.js build/${name}.min.js build/${name}.full.js build/${name}.full.min.js`);

  });
});
