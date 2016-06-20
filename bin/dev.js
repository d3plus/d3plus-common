#! /usr/bin/env node

const rollup = require("./rollup");
const shell = require("shelljs");
const server = require("node-static");

const file = new server.Server();

shell.echo("creating static fileserver at http://127.0.0.1:4000");
require("http").createServer((request, response) => {
  request.addListener("end", () => {
    const d = new Date();
    shell.echo(`${d.getHours()}:${d.getMinutes()}:${d.getSeconds()} serving ${request.url}`);
    file.serve(request, response);
  }).resume();
}).listen(4000);

rollup({"deps": true, "watch": true});
