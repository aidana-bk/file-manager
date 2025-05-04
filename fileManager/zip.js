import { createReadStream, createWriteStream } from "fs";
import { createBrotliCompress, createBrotliDecompress } from "zlib";
import path from "path";

export const zipOperations = {
  async compress(srcPath, destPath, currentDir) {
    const source = path.resolve(currentDir, srcPath);
    const destination = path.resolve(currentDir, destPath);

    return new Promise((resolve, reject) => {
      const readStream = createReadStream(source);
      const writeStream = createWriteStream(destination);
      const brotli = createBrotliCompress();

      readStream.on("error", reject);
      writeStream.on("error", reject);
      writeStream.on("finish", resolve);

      readStream.pipe(brotli).pipe(writeStream);
    });
  },

  async decompress(srcPath, destPath, currentDir) {
    const source = path.resolve(currentDir, srcPath);
    const destination = path.resolve(currentDir, destPath);

    return new Promise((resolve, reject) => {
      const readStream = createReadStream(source);
      const writeStream = createWriteStream(destination);
      const brotli = createBrotliDecompress();

      readStream.on("error", reject);
      writeStream.on("error", reject);
      writeStream.on("finish", resolve);

      readStream.pipe(brotli).pipe(writeStream);
    });
  },
};
