import { table_to_csv } from "./table_csv.ts";

const html = await Deno.readTextFile("players.html");

const players: any = table_to_csv("player-contracts", html);

console.log(players);

const player_stats_html = await Deno.readTextFile("per_game_players.html");

const player_stats = table_to_csv("per_game_stats", player_stats_html, 0);

await Deno.writeTextFile("./data/per_game_stats.csv", player_stats);
await Deno.writeTextFile("./data/salaries.csv", players);
