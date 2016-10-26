#! /usr/bin/env node

const log = require("./log")("development environment"),
      port = 4000,
      rollup = require("./rollup");

log.timer(`starting live-server on port ${port}`);
require("live-server").start({
  logLevel: 0,
  noBrowser: true,
  port,
  watch: ["build", "test"]
}).on("listening", () => {
  log.done();
  rollup({deps: true, watch: true});
});
