import { removeFile } from "https://deno.land/x/flat@0.0.11/mod.ts";

import { table_to_csv } from "./table_csv.ts";

const filename = Deno.args[0];
const html = await Deno.readTextFile(filename);

const players: any = table_to_csv("player-contracts", html);

console.log(players);

await Deno.writeTextFile("salaries.csv", players);
await removeFile(filename);
