const chalk = require("chalk"),
      shell = require("shelljs");

module.exports = function(name = "") {

  const pad = 25;
  name = `${Array(pad).fill(" ").join("")}${name.toUpperCase()}`.slice(-pad);

  shell.echo(`
   ${chalk.gray("█▀▀▀▀▀▀▀▄▄      ▄▄▀▀▀▀▀▀▄▄ ")}
   ${chalk.gray("█         ▀▄   █          █")}
   ${chalk.gray("█           █  █          █")}  ${chalk.green("         ▄▄")}
   ${chalk.gray("█           █       ▄▄▄▄▄▀ ")}  ${chalk.green("         ██")}
   ${chalk.gray("█           █            ▀▄")}  ${chalk.green("██▀▀▀█▄  ██ ██   ██ ▄█▀▀▀▀▄")}
   ${chalk.gray("█           █  █          █")}  ${chalk.green("██    ██ ██ ██   ██ ▀█▄▄▄")}
   ${chalk.gray("█        ▄▄▀   █          █")}  ${chalk.green("██    ██ ██ ██   ██    ▀▀█▄")}
   ${chalk.gray("█▄▄▄▄▄▄▀▀       ▀▀▄▄▄▄▄▄▀▀ ")}  ${chalk.green("██▄▄▄█▀  ██ ▀█▄▄▀██ ▀▄▄▄▄█▀")}
                                ${chalk.green("██")}
                                ${chalk.green("██")}${chalk.black(name)}

  `);

};
