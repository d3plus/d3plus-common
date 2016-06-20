#! /usr/bin/env node
// export GITHUB_TOKEN=xxx
// git config --global credential.helper osxkeychain

const release = require("grizzly"),
      rollup = require("./rollup"),
      shell = require("shelljs"),
      token = shell.env.GITHUB_TOKEN,
      {name, version} = JSON.parse(shell.cat("package.json"));

let minor = version.split(".");
minor = minor.slice(0, minor.length - 1).join(".");

shell.exec("d3plus-test");
shell.exec("d3plus-docs");

const changelog = shell.exec("git log --pretty=format:'* %s (%h)' `git describe --tags --abbrev=0`...HEAD", {"silent": true}).stdout;

rollup().then(() => {
  rollup({"deps": true}).then(() => {
    shell.exec(`uglifyjs build/${name}.js -c -m -o build/${name}.min.js`);
    shell.exec(`uglifyjs build/${name}.full.js -c -m -o build/${name}.full.min.js`);
    shell.exec(`rm -f build/${name}.zip && zip -j -q build/${name}.zip -- LICENSE README.md build/${name}.js build/${name}.min.js build/${name}.full.js build/${name}.full.min.js`);
    shell.exec("git add *");
    shell.exec(`git commit -m \"compiles v${version}\"`);
    shell.exec("git push -q");
    shell.exec("npm publish ./");
    shell.exec(`git tag v${version}`);
    shell.exec("git push -q --tags");
    release(token, {
      "repo": name,
      "owner": "d3plus",
      "tag_name": `v${version}`,
      "name": `v${version}`,
      "body": changelog
    }, (error) => {
      if (error) console.error(error.message);
    });
    shell.cp(`build/${name}.js`, `../d3plus-website/js/${name}.v${minor}.js`);
    shell.cp(`build/${name}.full.js`, `../d3plus-website/js/${name}.v${minor}.full.js`);
    shell.cp(`build/${name}.min.js`, `../d3plus-website/js/${name}.v${minor}.min.js`);
    shell.cp(`build/${name}.full.min.js`, `../d3plus-website/js/${name}.v${minor}.full.min.js`);
    shell.cd("../d3plus-website");
    shell.exec("git add *");
    shell.exec(`git commit -m \"${name} v${version}\"`);
    shell.exec("git push -q");
    shell.cd("-");
  });
});
