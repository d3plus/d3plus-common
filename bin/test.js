#! /usr/bin/env node

const shell = require("shelljs");

console.log("linting");
shell.exec("eslint index.js src/* test/*.js");
console.log("testing");
shell.exec("browserify -t [ babelify --presets [ es2015 ] ] test/*.js | tape-run --render='tap-spec'");
