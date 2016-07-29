#! /usr/bin/env node

const shell = require("shelljs");

shell.echo("running eslint");
shell.exec("eslint --color index.js src/* test/*.js");

shell.echo("\nrunning tests");
shell.exec("browserify -t [ babelify --presets [ es2015 ] ] test/*.js | tape-run --render='faucet'");
