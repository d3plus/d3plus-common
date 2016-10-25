const shell = require("shelljs"),
      {description, homepage, license, name, version} = JSON.parse(shell.cat("package.json"));

module.exports = `/*
  ${name} v${version}
  ${description}
  Copyright (c) ${new Date().getFullYear()} D3plus - ${homepage}
  @license ${license}
*/`;
