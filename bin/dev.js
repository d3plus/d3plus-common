#! /usr/bin/env node

require("live-server").start({
  noBrowser: true,
  port: 4000,
  watch: ["build", "test"]
});

require("./rollup")({deps: true, watch: true});
