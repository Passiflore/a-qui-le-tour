import { existsSync, readFileSync, writeFileSync } from "node:fs";
import type { Game, Player } from "./index.js";

const FILE_PATH = "data.json";

export function saveData(players: Player[], games: Game[]) {
	const data = { players, games };
	writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
}

export function loadData(players: Player[], games: Game[]) {
	if (!existsSync(FILE_PATH)) return;

	try {
		const fileContent = readFileSync(FILE_PATH, "utf-8");
		const data = JSON.parse(fileContent);

		players.push(...data.players);
		games.push(...data.games);
	} catch {
		console.error("data.json illisible, on repart de zéro");
	}
}
