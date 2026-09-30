const PLAYER_ID_KEY = "playerId";
const GAME_ID_KEY = "gameId";
const INVITE_TOKEN_KEY = "inviteToken";

export function getPlayerId() {
	return localStorage.getItem(PLAYER_ID_KEY);
}

export function getGameId() {
	return localStorage.getItem(GAME_ID_KEY);
}

export function getInviteToken() {
	return localStorage.getItem(INVITE_TOKEN_KEY);
}

export function saveSession(
	playerId: string,
	gameId: string,
	inviteToken?: string,
) {
	localStorage.setItem(PLAYER_ID_KEY, playerId);
	localStorage.setItem(GAME_ID_KEY, gameId);

	if (inviteToken) {
		localStorage.setItem(INVITE_TOKEN_KEY, inviteToken);
	}
}
