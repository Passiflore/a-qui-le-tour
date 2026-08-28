export interface Player {
	id: string;
	firstName: string;
}

export interface Decision {
	playerId: string;
	decision: string;
	comment?: string | null;
	difficulty?: "easy" | "medium" | "hard";
	createdAt: string;
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

interface GameSessionResponse {
	player: Player;
	game: Game;
}

export async function createGame(
	firstName: string,
): Promise<GameSessionResponse> {
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

export async function getInvite(token: string) {
	const response = await fetch(`/api/invite/${token}`);

	if (!response.ok) {
		throw new Error("Invitation invalide ou déjà utilisée");
	}
}

export async function joinGame(
	token: string,
	firstName: string,
): Promise<GameSessionResponse> {
	const response = await fetch(`/api/invite/${token}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			firstName,
		}),
	});

	if (!response.ok) {
		throw new Error("Impossible de rejoindre la partie");
	}

	const data = await response.json();

	return data;
}
