#!/usr/bin/env node

const child_process = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

if (process.argv.length <= 2) {
  console.error(`Usage: naive-nodemon <file>`);
  process.exit(1);
}

const filepath = process.argv[2];
let cp;

startChild();

fs.watch(path.dirname(filepath), () => {
  console.log(`Restarting due to file changes ...`);
  restartChild();
});

function startChild() {
  cp = child_process.spawn("node", [filepath], {
    stdio: "inherit",
  });

  cp.on("close", (code, signal) => {
    if (signal) return;

    console.log(
      `Child process exited with code ${code}. Waiting for file changes before restarting ...`
    );
  });
}

function stopChild() {
  cp.kill();
}

function restartChild() {
  stopChild();
  startChild();
}

process.on("SIGINT", handleSignal);
process.on("SIGTERM", handleSignal);
function handleSignal(signal) {
  console.log(`Received signal: ${signal}. Exiting ...`);
  stopChild();
  process.exit();
}
