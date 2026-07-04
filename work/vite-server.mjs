import { createServer } from "vite";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const logFile = path.join(root, "work", "vite.out.log");

const server = await createServer({
  root,
  server: {
    host: "127.0.0.1",
    port: 5174,
    strictPort: true,
  },
});

await server.listen();
fs.appendFileSync(logFile, `Vite ready at http://127.0.0.1:5174/\n`);

process.on("SIGTERM", async () => {
  await server.close();
  process.exit(0);
});

setInterval(() => {}, 60_000);
