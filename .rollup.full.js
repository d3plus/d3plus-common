import buble from "rollup-plugin-buble";
import json from "rollup-plugin-json";
import deps from "rollup-plugin-node-resolve";

export default {
  dest: "build/d3plus-common.full.js",
  entry: "index.js",
  format: "umd",
  globals: function(id) { return id.replace(/-/g, "_"); },
  moduleId: "d3plus-common",
  moduleName: "d3plus_common",
  plugins: [json(), deps({"jsnext": true}), buble()]
};
