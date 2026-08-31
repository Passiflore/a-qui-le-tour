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

export interface GameResponse {
	host: Player;
	guest: Player | null;
	currentDeciderPlayerId: string | null;
	decisionHistory: Decision[];
}

export interface GameSessionResponse {
	player: Player;
	game: Game;
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
	const response = await fetch(`/api${path}`, {
		headers: { "Content-Type": "application/json" },
		...options,
	});

	if (!response.ok) {
		throw new Error(`Requête échouée (${response.status})`);
	}

	return response.json();
}

export async function createGame(
	firstName: string,
): Promise<GameSessionResponse> {
	return request<GameSessionResponse>("/games", {
		method: "POST",
		body: JSON.stringify({ firstName }),
	});
}

export async function getInvite(token: string) {
	return request<void>(`/invite/${token}`);
}

export async function joinGame(
	token: string,
	firstName: string,
): Promise<GameSessionResponse> {
	return request<GameSessionResponse>(`/invite/${token}`, {
		method: "POST",
		body: JSON.stringify({ firstName }),
	});
}

export async function getGame(gameId: string) {
	return request<{ game: GameResponse }>(`/games/${gameId}`);
}
