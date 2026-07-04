const { spawn } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const out = fs.openSync(path.join(__dirname, "vite.out.log"), "a");
const err = fs.openSync(path.join(__dirname, "vite.err.log"), "a");

const child = spawn(
  process.execPath,
  [
    path.join(__dirname, "vite-server.mjs"),
  ],
  {
    cwd: root,
    detached: true,
    stdio: ["ignore", out, err],
    windowsHide: true,
  },
);

child.unref();
console.log(child.pid);
