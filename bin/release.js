#! /usr/bin/env node
// export GITHUB_TOKEN=xxx
// git config --global credential.helper osxkeychain

const asset = require("putasset"),
      // release = require("grizzly"),
      shell = require("shelljs"),
      // token = shell.env.GITHUB_TOKEN,
      {name, version} = JSON.parse(shell.cat("package.json"));

shell.config.silent = true;
const log = require("./log")(`release v${version}`);
console.log(asset);
// let minor = version.split(".");
// const prerelease = parseFloat(minor[0]) === 0;
// minor = minor.slice(0, minor.length - 1).join(".");

const tests = shell.exec("d3plus-test", {silent: false});
if (tests.code) shell.exit(tests.code);

const rollup = require("./rollup");

rollup().then(() => {
  rollup({deps: true}).then(() => {

    log.timer("uglify builds");
    shell.exec(`uglifyjs build/${name}.js -m --comments -o build/${name}.min.js`);
    shell.exec(`uglifyjs build/${name}.full.js -m --comments -o build/${name}.full.min.js`);

    log.timer("create .zip distribution");
    shell.exec(`rm -f build/${name}.zip && zip -j -q build/${name}.zip -- LICENSE README.md build/${name}.js build/${name}.min.js build/${name}.full.js build/${name}.full.min.js`);

    log.timer("compiling examples");
    shell.exec("d3plus-examples");

    log.timer("compiling documentation");
    shell.exec("d3plus-docs");

    // log.timer("compiling release notes");
    // const body = shell.exec("git log --pretty=format:'* %s (%h)' `git describe --tags --abbrev=0`...HEAD").stdout;

    // log.timer("publishing npm package");
    // shell.exec("npm publish ./");

    log.timer("commiting package.json README.md and and updated examples");
    shell.exec("git add --all", {silent: false});
    shell.exec(`git commit -m \"compiles v${version}\"`, {silent: false});

    log.timer("pushing to repository");
    shell.exec("git push -q", {silent: false});

    // log.timer("tagging latest commit");
    // shell.exec(`git tag v${version}`);
    // shell.exec("git push -q --tags");
    //
    // log.timer("uploading builds to d3plus.org");
    // shell.cp(`build/${name}.js`, `../d3plus-website/js/${name}.v${minor}.js`);
    // shell.cp(`build/${name}.full.js`, `../d3plus-website/js/${name}.v${minor}.full.js`);
    // shell.cp(`build/${name}.min.js`, `../d3plus-website/js/${name}.v${minor}.min.js`);
    // shell.cp(`build/${name}.full.min.js`, `../d3plus-website/js/${name}.v${minor}.full.min.js`);
    // shell.cd("../d3plus-website");
    // shell.exec(`git add js/${name}.v${minor}.js js/${name}.v${minor}.min.js js/${name}.v${minor}.full.js js/${name}.v${minor}.full.min.js`);
    // shell.exec(`git commit -m \"${name} v${version}\"`);
    // shell.exec("git push -q");
    // shell.cd("-");
    //
    // log.timer("publishing release notes");
    // release(token, {
    //   repo: name,
    //   user: "d3plus",
    //   tag: `v${version}`,
    //   name: `v${version}`,
    //   body, prerelease
    // }, error => {
    //   if (error) {
    //     log.error();
    //     shell.echo(error.message);
    //     shell.exit(1);
    //   }
    //   else {
    //
    //     log.timer("attaching .zip distribution to release");
    //     asset(token, {
    //       repo: name,
    //       owner: "d3plus",
    //       tag: `v${version}`,
    //       filename: `build/${name}.zip`
    //     }, error => {
    //       if (error) {
    //         log.error();
    //         shell.echo(error.message);
    //         shell.exit(1);
    //       }
    //       else {
    //         log.done();
    //         shell.exit(0);
    //       }
    //     });
    //
    //   }
    // });

  });
});
