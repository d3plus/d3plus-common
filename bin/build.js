#! /usr/bin/env node

const shell = require("shelljs");

shell.echo(shell.pwd());
shell.exec("npm run serve & rollup -c .rollup.full.js -w");
