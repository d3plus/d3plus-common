#! /usr/bin/env node

const shell = require("shelljs");
const {description, name, version} = JSON.parse(shell.cat("package.json"));

let minor = version.split(".");
minor = minor.slice(0, minor.length - 1).join(".");


let addl = [], examples = "", header = false;

if (shell.test("-d", "example")) {

  shell.ls("example/*.md").forEach(file => {
    if (file.includes("getting-started.md")) {
      const link = `https://d3plus.org/examples/${name}/getting-started/`;
      header = `${shell.cat(file)}

[Click here](${link}) to view this example live on the web.

[![Getting Started](/example/getting-started.png)](${link})


`;
      header = header.replace(/\n# |^# /g, "\n## ");
    }
    else {
      const re = new RegExp("# (.*?)\\n", "g");
      const title = re.exec(shell.cat(file));
      const newFile = file.replace("example", `examples/${name}`).replace(".md", "/");
      if (title) addl.push(` * [${title[1]}](http://d3plus.org/${newFile})`);
    }
  });

  if (!header && addl.length) header = "## Examples\n\n";
  else if (addl.length) header = `${header}### More Examples\n\n`;

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
const contents = `# ${name}

[![NPM Release](http://img.shields.io/npm/v/${name}.svg?style=flat-square)](https://www.npmjs.org/package/${name})
[![Build Status](https://travis-ci.org/d3plus/${name}.svg?branch=master)](https://travis-ci.org/d3plus/${name})
[![Dependency Status](http://img.shields.io/david/d3plus/${name}.svg?style=flat-square)](https://david-dm.org/d3plus/${name})

${description}

## Installing

If you use NPM, \`npm install ${name}\`. Otherwise, download the [latest release](https://github.com/d3plus/${name}/releases/latest). The released bundle supports AMD, CommonJS, and vanilla environments. Create a [custom bundle using Rollup](https://github.com/rollup/rollup) or your preferred bundler. You can also load directly from [d3plus.org](https://d3plus.org):

\`\`\`html
<script src="https://d3plus.org/js/${name}.v${minor}.full.min.js"></script>
\`\`\`

${examples}
## API Reference
{{>main}}


###### <sub>Documentation generated on ${new Date().toUTCString()}</sub>
`;
new shell.ShellString(contents).to(template);

shell.exec(`jsdoc2md '+(bin|src)/**/*.js' --heading-depth 3 -t ${template} > README.md`);
shell.echo("compiled README.md from JSDoc comments and examples");
