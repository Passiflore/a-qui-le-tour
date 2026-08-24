export interface Player {
	id: string;
	firstName: string;
}

export interface Decision {
	playerId: string;
	decision: string;
	comment?: string | null;
	difficulty?: "easy" | "medium" | "hard";
	createdAt: Date;
}

export interface Game {
	id: string;
	hostPlayerId: string;
	guestPlayerId?: string;
	inviteToken: string;
	inviteUsed: boolean;

	currentDeciderPlayerId?: string;
	decisionHistory: Decision[];
}

interface CreateGameResponse {
	player: Player;
	game: Game;
}

export async function createGame(
	firstName: string,
): Promise<CreateGameResponse> {
	const response = await fetch("/api/games", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			firstName,
		}),
	});

	if (!response.ok) {
		throw new Error("Impossible de créer la partie");
	}

	const data = await response.json();

	return data;
}
