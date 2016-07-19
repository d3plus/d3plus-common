#! /usr/bin/env node

const fs = require("fs"),
      port = 5000,
      screenshot = require("electron-screenshot-service"),
      server = require("live-server"),
      shell = require("shelljs");

const {name, version} = JSON.parse(shell.cat("package.json"));

let minor = version.split(".");
minor = minor.slice(0, minor.length - 1).join(".");

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

function ssPromise(file) {

  const url = `http://localhost:${port}/${file}`;
  return screenshot({url, width: 1, height: 1, page: true})
    .then(img => new Promise(resolve => {
      fs.writeFile(file.replace("html", "png"), img.data, () => {

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
---\n\n${mdc}`).to(newFile.replace(".html", "index.md"));
        shell.cp(file.replace("html", "png"), newFile.replace(".html", "thumb.png"));

        resolve(img);

      });
    }));

}

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
