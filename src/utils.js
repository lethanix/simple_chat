import path from "node:path";

// For NodeJS version 10.12 and higher:
import { dirname } from "path";
import { fileURLToPath } from "url";
export const __dirname = dirname(fileURLToPath(import.meta.url));

// Starting with NodeJS 20.11 / 21.2, we can use:
//export const __dirname = import.meta.dirname;
//
//export const __filespath = path.join(__dirname, "files");
