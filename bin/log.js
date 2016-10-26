const chalk = require("chalk"),
      logo = require("./logo.js"),
      shell = require("shelljs");

module.exports = function(name) {

  if (!process.env.D3PLUS_SCRIPT_LOGO) logo(name);
  process.env.D3PLUS_SCRIPT_LOGO = true;

  let interval, message = "";

  this.done = msg => {
    if (msg) message = msg;
    interval = clearInterval(interval);
    shell.echo(`\r[ ${chalk.green("done")} ] ${message}`);
  };

  this.fail = msg => {
    if (msg) message = msg;
    interval = clearInterval(interval);
    shell.echo(`\r[ ${chalk.red("fail")} ] ${message}`);
  };

  this.exit = msg => {
    if (interval) this.done(msg);
    shell.echo(`\n`);
  };

  this.timer = (msg = chalk.gray("please pass a process name to .start()")) => {

    if (interval) this.done();

    message = msg;

    process.stdout.write(`[      ] ${message}`);

    let tick = 0;

    interval = setInterval(() => {
      const arr = Array(4).fill(" ");
      arr[tick % 4] = "*";
      process.stdout.write(`\r[ ${chalk.yellow(arr.join(""))} ] ${message}`);
      tick++;
    }, 200);

  };

  this.update = msg => {
    if (msg) message = msg;
    process.stdout.write(`\r[      ] ${message}`);
  };

  this.warn = msg => {
    if (msg) message = msg;
    interval = clearInterval(interval);
    shell.echo(`\r[ ${chalk.yellow("warn")} ] ${message}`);
  };

  return this;

};
