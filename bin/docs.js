#! /usr/bin/env node

const shell = require("shelljs");
const {description, name, version} = JSON.parse(shell.cat("package.json"));

let minor = version.split(".");
minor = minor.slice(0, minor.length - 1).join(".");


let addl = [], examples = "", header = false;

if (shell.test("-d", "example")) {

  shell.ls("example/*.md").forEach(file => {
    if (file.includes("getting-started.md")) {
      header = `${shell.cat(file)}\n\n### More Examples\n\n`;
    }
    else {
      const re = new RegExp("# (.*?)\\n", "g");
      const title = re.exec(shell.cat(file));
      const newFile = file.replace("example", `examples/${name}`).replace(".md", "/");
      if (title) addl.push(` * [${title[1]}](http://d3plus.org/${newFile})`);
    }
  });

  if (!header && addl.length) header = "# Examples\n\n";
  if (header) {

    if (addl.length) {
      addl.push("");
      addl = addl.join("\n");
    }
    else addl = "";
    examples = `${header}\n${addl}\n`;

  }

}

const template = `${shell.tempdir()}/README.hbs`;
new shell.ShellString(`# ${name}

[![NPM Release](http://img.shields.io/npm/v/${name}.svg?style=flat-square)](https://www.npmjs.org/package/${name})
[![Build Status](https://travis-ci.org/d3plus/${name}.svg?branch=master)](https://travis-ci.org/d3plus/${name})
[![Dependency Status](http://img.shields.io/david/d3plus/${name}.svg?style=flat-square)](https://david-dm.org/d3plus/${name})

${description}

# Installation Options

* [NPM](#install.npm)
* [Browser](#install.browser)
* [AMD and CommonJS](#install.amd)
* [Custom Builds](#install.custom)

<a name="install.npm"></a>
### NPM
\`\`\`sh
npm install ${name}
\`\`\`

<a name="install.browser"></a>
### Browser
In a vanilla environment, a \`d3plus\` global is exported. To use a compiled version hosted on [d3plus.org](https://d3plus.org) that includes all dependencies:

\`\`\`html
<script src="https://d3plus.org/js/${name}.v${minor}.full.min.js"></script>
\`\`\`

Otherwise, [click here](https://github.com/d3plus/${name}/releases/latest) to download the latest release.

<a name="install.amd"></a>
### AMD and CommonJS
The released bundle natively supports both AMD and CommonJS, in addition to vanilla environments.

<a name="install.custom"></a>
### Custom Builds
The source code is written using standard \`import\` and \`export\` statements. Create a custom build using [Rollup](https://github.com/rollup/rollup) or your preferred bundler. Take a look at the [index.js](https://github.com/d3plus/${name}/blob/master/index.js) file to see the modules exported.

${examples}
# API Reference
{{>main}}
`).to(template);

shell.exec(`jsdoc2md '+(bin|src)/**/*.js' -t ${template} > README.md`);
shell.echo("compiled README.md from JSDoc comments and examples");
