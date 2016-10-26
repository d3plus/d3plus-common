#! /usr/bin/env node

const log = require("./log")("documentation"),
      shell = require("shelljs");
const {description, name, version} = JSON.parse(shell.cat("package.json"));

let minor = version.split(".");
minor = minor.slice(0, minor.length - 1).join(".");


let examples = "";

function getVar(contents, key, def = 0, num = true) {
  const r = new RegExp(`\\[${key}\\]: ([0-9]+)`, "g").exec(contents);
  return r ? num ? parseFloat(r[1], 10) : r[1] : def;
}

if (shell.test("-d", "example")) {

  log.timer("analyzing example directory");

  let header = false;

  if (shell.test("-f", "example/getting-started.md")) {

    const contents = shell.cat("example/getting-started.md"),
          width = getVar(contents, "width", 990);

    const link = `https://d3plus.org/examples/${name}/getting-started/`;
    header = `${contents}

[<kbd><img src="/example/getting-started.png" width="${width}px" /></kbd>](${link})

[Click here](${link}) to view this example live on the web.


`;
    header = header.replace(/\n# |^# /g, "\n## ");

  }

  const now = new Date().getTime(), week = 1000 * 60 * 60 * 24 * 7;
  const addl = shell.ls("-l", "example/*.md")
    .filter(f => !f.name.includes("getting-started.md"))
    .sort((a, b) => b.birthtime - a.birthtime)
    .map(file => {
      const re = new RegExp("# (.*?)\\n", "g");
      const h1 = re.exec(shell.cat(file.name));
      const title = h1 ? h1[1] : file.name.replace("example/", "").replace(".md", "");
      const url = `http://d3plus.org/${file.name.replace("example", `examples/${name}`).replace(".md", "/")}`;
      const suffix = now - file.ctime < week ? "<sup> ***New***</sup>"
                   : now - file.mtime < week ? "<sup> ***Updated***</sup>" : "";
      return ` * [${title}](${url})${suffix}`;
    });

  if (!header && addl.length) header = "## Examples\n";
  else if (addl.length) header = `${header}### More Examples\n`;

  if (header) examples = `${header}\n${addl.join("\n")}\n`;

}

log.timer("writing JSDOC comments to README.md");
const template = `${shell.tempdir()}/README.hbs`;
const contents = `# ${name}

[![NPM Release](http://img.shields.io/npm/v/${name}.svg?style=flat)](https://www.npmjs.org/package/${name})
[![Build Status](https://travis-ci.org/d3plus/${name}.svg?branch=master)](https://travis-ci.org/d3plus/${name})
[![Dependency Status](http://img.shields.io/david/d3plus/${name}.svg?style=flat)](https://david-dm.org/d3plus/${name})
[![Slack](https://img.shields.io/badge/Slack-Click%20to%20Join!-green.svg?style=social)](https://goo.gl/forms/ynrKdvusekAwRMPf2)

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
log.exit();
shell.exit(0);
