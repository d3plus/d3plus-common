#! /usr/bin/env node

const shell = require("shelljs");
shell.exec("i18next .. -r -l en_US,es_ES -f 'locale.t' --fileFilter '*.js' --directoryFilter 'd3plus-*,src' -o src/locales");
shell.echo("Compiled translations.");
