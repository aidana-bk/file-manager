import { fileOperations } from "./fs.js";
import path from "path";
import os from "os";

function printDir(currentDir) {
  console.log(`\nYou are currently in ${currentDir}`);
}

export function cliFileManager(rl, username, filePath) {
  let currentDir = filePath;
  printDir(currentDir);

  rl.setPrompt("> ");
  rl.prompt();

  rl.on("line", async (line) => {
    const [cmd, ...args] = line.trim().split(" ");
    try {
      switch (cmd) {
        case "up":
          const parent = path.dirname(currentDir);
          if (parent.length >= os.homedir().length) currentDir = parent;
          break;

        case "cd":
          await fileOperations.cd(args[0], currentDir, (newPath) => {
            currentDir = newPath;
          });
          break;

        case "ls":
          await fileOperations.ls(currentDir);
          break;

        case "cat":
          break;

        case "add":
          console.log("add");
          break;

        case "mkdir":
          console.log("mkdir");
          break;

        case "rn":
          console.log("rn");
          break;

        case "cp":
          console.log("cp");
          break;

        case "mv":
          console.log("mv");
          break;

        case "rm":
          console.log("rm");
          break;

        case "os":
          console.log("os");
          break;

        case "hash":
          console.log("hash");
          break;

        case "compress":
          console.log("compress");
          break;

        case "decompress":
          console.log("decompress");
          break;

        case ".exit":
          console.log(
            `\nThank you for using File Manager, ${username}, goodbye!`
          );
          process.exit(0);

        default:
          console.log("Invalid input");
      }
    } catch (e) {
      console.log("Operation failed");
    }

    printDir(currentDir);
    rl.prompt();
  });

  rl.on("SIGINT", () => {
    console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
    process.exit(0);
  });
}
