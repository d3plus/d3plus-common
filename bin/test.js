#! /usr/bin/env node

const log = require("./log")("testing suite"),
      shell = require("shelljs");

log.timer("linting code");
const linter = shell.exec("eslint --color index.js bin/*.js src/*.js test/*.js", {silent: true});
if (linter.code) {
  log.fail();
  shell.echo(linter.stdout);
  shell.exit(linter.code);
}
else log.done();

log.timer("unit and browser tests");
const tests = shell.exec("browserify -t [ babelify --presets [ es2015 ] ] test/*.js | tape-run --render='faucet'", {silent: true});
log.done();

shell.echo(tests.stdout);
if (tests.code) shell.exit(tests.code);
