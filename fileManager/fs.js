import fs from "fs/promises";
import { createReadStream, createWriteStream } from "fs";
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

  async add(filename, currentDir) {
    const filePath = path.resolve(currentDir, filename);
    await fs.writeFile(filePath, "");
  },

  async mkdir(dirName, currentDir) {
    const fullPath = path.resolve(currentDir, dirName);
    await fs.mkdir(fullPath, { recursive: false });
  },

  async rn(oldPath, newName, currentDir) {
    const oldFile = path.resolve(currentDir, oldPath);
    const newFile = path.join(path.dirname(oldFile), newName);
    await fs.rename(oldFile, newFile);
  },

  async rm(filePath, currentDir) {
    const fullPath = path.resolve(currentDir, filePath);
    try {
      await fs.unlink(fullPath);
    } catch (err) {
      console.log(err);
    }
  },

  async cp(srcPath, destDir, currentDir) {
    try {
      const source = path.resolve(currentDir, srcPath);
      const destFolder = path.resolve(currentDir, destDir);
      const dest = path.join(destFolder, path.basename(srcPath));
      return await new Promise((resolve, reject) => {
        const readStream = createReadStream(source);
        const writeStream = createWriteStream(dest);
        readStream.on("error", (err) => {
          reject(err);
        });
        writeStream.on("error", (err) => {
          reject(err);
        });
        writeStream.on("finish", resolve);
        readStream.pipe(writeStream);
      });
    } catch (err) {
      console.log(err.message);
    }
  },

  async mv(srcPath, destDir, currentDir) {
    const source = path.resolve(currentDir, srcPath);
    const dest = path.resolve(currentDir, destDir, path.basename(srcPath));

    try {
      await this.cp(srcPath, destDir, currentDir);
      await fs.unlink(source);
    } catch (err) {
      throw new Error("Operation failed");
    }
  },
};
