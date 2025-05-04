import os from "os";

let currentDir = os.homedir();

function printDir() {
  console.log(`\nYou are currently in ${currentDir}`);
}

export function cliFileManager(rl, username) {
  printDir();

  rl.setPrompt("> ");
  rl.prompt();

  rl.on("line", async (line) => {
    const [cmd, ...args] = line.trim().split(" ");
    try {
      switch (cmd) {
        case "up":
          console.log("up");
          break;

        case "cd":
          console.log("cd");
          break;

        case "ls":
          console.log("ls");
          break;

        case "cat":
        case "add":
        case "rn":
        case "cp":
        case "mv":
        case "rm":
        case "mkdir":
          console.log("fs");
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

    printDir();
    rl.prompt();
  });

  rl.on("SIGINT", () => {
    console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
    process.exit(0);
  });
}
