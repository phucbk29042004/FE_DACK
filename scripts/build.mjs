import { cp, mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const src = path.join(root, "src");

await mkdir(dist, { recursive: true });

for (const dir of ["css", "js", "images"]) {
  await cp(path.join(root, dir), path.join(dist, dir), {
    recursive: true,
    force: false,
    errorOnExist: false,
  });
}

for (const file of await readdir(src)) {
  if (file.endsWith(".html")) {
    await cp(path.join(src, file), path.join(dist, file), {
      force: false,
      errorOnExist: false,
    });
  }
}

console.log("Static site built to dist/");
