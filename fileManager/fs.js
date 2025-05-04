import fs from "fs/promises";
import { createReadStream } from "fs";
import path from "path";

export const fileOperations = {
  async ls(currentDir) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });
    const sorted = entries.sort((a, b) => {
      if (a.isDirectory() && !b.isDirectory()) return -1;
      if (!a.isDirectory() && b.isDirectory()) return 1;
      return a.name.localeCompare(b.name);
    });

    for (const entry of sorted) {
      const type = entry.isDirectory() ? "directory" : "file";
      console.log(`${entry.name}\t${type}`);
    }
  },

  async cd(dir, currentDir, setNewPath) {
    const newPath = path.resolve(currentDir, dir);
    try {
      const stat = await fs.stat(newPath);
      if (stat.isDirectory()) setNewPath(newPath);
    } catch {
      console.log("Operation failed");
    }
  },

  async cat(filePath, currentDir) {
    const fullPath = path.resolve(currentDir, filePath);
    return new Promise((resolve, reject) => {
      const stream = createReadStream(fullPath, { encoding: "utf-8" });
      stream.on("error", (err) => {
        reject(err);
      });
      stream.on("end", () => {
        resolve();
      });
      stream.pipe(process.stdout);
    });
  },
};
