#! /usr/bin/env node

const shell = require("shelljs");

shell.echo("linting");
shell.exec("eslint index.js src/* test/*.js");
shell.echo("testing");
shell.exec("browserify -t [ babelify --presets [ es2015 ] ] test/*.js | tape-run --render='tap-spec'");
