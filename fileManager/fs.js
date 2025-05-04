import fs from "fs/promises";
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
};
