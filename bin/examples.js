#! /usr/bin/env node

const fs = require("fs"),
      port = 5000,
      screenshot = require("electron-screenshot-service"),
      server = require("live-server"),
      shell = require("shelljs");

const {name, version} = JSON.parse(shell.cat("package.json"));

let minor = version.split(".");
minor = minor.slice(0, minor.length - 1).join(".");

function getVar(contents, key, def = 0, num = true) {
  const r = new RegExp(`\\[${key}\\]: ([0-9]+)`, "g").exec(contents);
  return r ? num ? parseFloat(r[1], 10) : r[1] : def;
}

function ssPromise(file) {

  const contents = shell.cat(file.replace("html", "md")),
        url = `http://localhost:${port}/${file}`;

  const delay = getVar(contents, "delay", 1000),
        height = getVar(contents, "height", 400),
        width = getVar(contents, "width", 990);

  return screenshot({url, width, height, delay, transparent: true})
    .then(img => new Promise(resolve => {
      fs.writeFile(file.replace("html", "png"), img.data, err => {
        if (err) throw err;

        const slug = file.split("/")[1].replace(".html", "");
        const dir = `../d3plus-website/_examples/${name}/${slug}`;
        shell.mkdir("-p", dir);
        const newFile = file.replace(slug, "").replace("example", dir);
        shell.cp(file, newFile.replace(".html", "embed.html"));

        const mdc = shell.cat(file.replace("html", "md"));
        const re = new RegExp("# (.*?)\\n", "g");
        let title = re.exec(mdc);
        title = title ? title[1] : "Example";
        new shell.ShellString(`---
title: ${title}
width: ${width}
height: ${height}
---\n\n${mdc}`).to(newFile.replace(".html", "index.md"));
        shell.cp(file.replace("html", "png"), newFile.replace(".html", "thumb.png"));

        shell.echo(`compiled "${file.replace("html", "md")}"`);

        resolve(img);

      });

    }));

}

function addSection(syntax, contents, space = "") {
  const re = new RegExp(`\`\`\`${syntax}\\n((.|\\n)*?)\\n\`\`\``, "g");
  const matches = [];
  let match;
  while ((match = re.exec(contents)) !== null) {
    matches.push(match[1].replace(/\n/g, `\n${space}  `));
  }
  if (syntax === "css") {
    matches.unshift(`body {
${space}    margin: 0;
${space}  }`);
  }
  if (matches.length) {
    const body = matches.join(`\n\n${space}  `);
    return `

${space}  ${body}

${space}`;
  }
  else return "";
}

if (shell.test("-d", "example")) {

  const examples = [];
  shell.ls("example/*.md").forEach(file => {

    const contents = shell.cat(file),
          filename = file.replace("md", "html");

    new shell.ShellString(`<!doctype html>
<html>

<head>

  <meta charset="utf-8">
  <script src="https://d3plus.org/js/${name}.v${minor}.full.min.js"></script>

  <style>${addSection("css", contents, "  ")}</style>

</head>

<body>${addSection("html", contents)}</body>

<script>${addSection("js", contents)}</script>

</html>
`).to(filename);

    examples.push(filename);

  });

  server.start({noBrowser: true, port}).on("listening", () => {

    shell.rm("-rf", `../d3plus-website/_examples/${name}`);

    Promise.all(examples.map(ssPromise)).then(() => {

      screenshot.close();

      shell.cd("../d3plus-website");
      shell.exec(`git add _examples/${name}/*`);
      shell.exec(`git commit -m \"${name} examples\"`);
      shell.exec("git push -q");

      shell.echo("successfully compiled and published examples");
      server.shutdown();

    });

  });

}
else {

  shell.rm("-rf", `../d3plus-website/_examples/${name}`);

  shell.cd("../d3plus-website");
  shell.exec(`git add _examples/${name}/*`);
  shell.exec(`git commit -m \"${name} examples\"`);
  shell.exec("git push -q");

  shell.echo("no examples found matching 'example/*.md' in root");
}
