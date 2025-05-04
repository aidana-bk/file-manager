import readline from "readline";
import path from "path";
import { cliFileManager } from "./fileManager/cli.js";

const usernameArg = process.argv.find((arg) => arg.startsWith("--username="));
const username = usernameArg ? usernameArg.split("=")[1] : "Username";

console.log(`Welcome to the File Manager, ${username}!`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const filePath = path.join(import.meta.dirname);

cliFileManager(rl, username, filePath);
