#! /usr/bin/env node

const shell = require("shelljs");

shell.echo("running eslint");
shell.exec("eslint --color index.js src/* test/*.js");

shell.echo("\nrunning tests");
shell.exec("browserify -t [ babelify --presets [ es2015 ] ] test/*.js | tape-run --render='faucet'");
// shell.exec("babel-node ./node_modules/istanbul/lib/cli.js cover test/*.js -v");
// shell.exec("browserify test/*.js -t bubleify -o build/test.js && cat build/test.js | tape-run");

// shell.exec("browserify test/*.js -d -t [ babelify --presets [ es2015 ] ] -p tape-istanbul/plugin | tape-run | tape-istanbul");
// shell.exec("istanbul help report");
// shell.exec("istanbul report text");
// shell.exec("browserify test/*.js -d -t [ babelify --sourceMapsAbsolute --presets [ es2015 ] ] -t browserify-istanbul | tape-run");
// shell.exec("browserify -t [ bubleify --transforms module ] test/*.js | tape-run");
// shell.exec("cat build/test-old.js | tape-run");
// shell.exec("rollup test/*.js | tape-run");

// const browserify = require("browserify");
// // const tapeIstanbul = require("tape-istanbul");
// const tapeRun = require("tape-run");
// const glob = require("glob");
//
// browserify({debug: true})
//   .add(glob("test/*.js"))
//   .transform("bubleify", {
//     sourceMap: false,
//     transforms: {
//       modules: true
//     }
//   })
//   // .plugin("tape-istanbul/plugin")
//   .bundle()
//   // .pipe(tapeRun());
//   // .pipe(tapeIstanbul());

// const buble = require("rollup-plugin-buble"),
//       commonjs = require("rollup-plugin-commonjs"),
//       deps = require("rollup-plugin-node-resolve"),
//       inject = require("rollup-plugin-inject"),
//       rollup = require("rollup");
//
// const entry = {
//   entry: "test/accessor.js",
//   plugins: [
//     // commonjs({ignoreGlobal: true, exclude: ["node_modules/buble/**"]}),
//     commonjs(),
//     deps({preferBuiltins: true, jsnext: true, main: true, browser: true}),
//     inject({require: "require"}),
//     buble()
//   ],
//   // onwarn: () => {},
//   onwarn: err => console.log(err),
//   sourceMap: true
// };
//
// const config = {
//   dest: "build/test.js",
//   format: "cjs",
//   moduleName: "test",
//   sourceMap: "inline"
// };
//
// shell.mkdir("-p", "build");
// rollup.rollup(entry).catch(err => console.log(err)).then(bundle => {
//   bundle.write(config).then(() => {
//     // shell.exec("browserify build/test.js -o build/test.browserify.js");
//     // shell.exec("browserify build/test.js -p tape-istanbul/plugin -o build/test.instanbul.js");
//     // shell.exec("cat build/test.browserify.js | tape-run");
//     // shell.exec("cat build/test.js | tape-run");
//     // shell.exec("browserify build/test.js -p tape-istanbul/plugin | tape-run | tape-istanbul");
//     // shell.exec("istanbul ---only report");
//   });
// });
