import fs from "fs";
import crypto from "crypto";
import path from "path";

export const calculateHash = async (filePath, currentDir) => {
  const fullPath = path.resolve(currentDir, filePath);
  const hash = crypto.createHash("sha256");
  const fileStream = fs.createReadStream(fullPath);
  return new Promise((resolve, reject) => {
    const fileStream = fs.createReadStream(fullPath);
    fileStream.on("data", (chunk) => {
      hash.update(chunk);
    });
    fileStream.on("end", () => {
      const fileHash = hash.digest("hex");
      console.log(fileHash);
      resolve();
    });
    fileStream.on("error", (err) => {
      reject(err);
    });
  });
};
