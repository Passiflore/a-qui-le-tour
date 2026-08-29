import express, { Response, Request, NextFunction } from "express";
import { pinoHttp } from "pino-http";
import { randomUUID } from "node:crypto";

const app = express();
const port = Number(process.env.PORT) || 3000;

interface Player {
	id: string;
	firstName: string;
}

interface Decision {
	playerId: string;
	decision: string;
	comment?: string | null;
	difficulty?: "easy" | "medium" | "hard";
	createdAt: Date;
}

interface Game {
	id: string;
	hostPlayerId: string;
	guestPlayerId?: string;
	inviteToken: string;
	inviteUsed: boolean;

	currentDeciderPlayerId?: string;
	decisionHistory: Decision[];
}

interface GameResponse {
	host: Player;
	guest: Player | null;
	currentDeciderPlayerId: string | null;
	decisionHistory: Decision[];
}

const players: Player[] = [];
const games: Game[] = [];

function getValidText(text: unknown, type?: "firstName"): string | null {
	if (typeof text !== "string") {
		return null;
	}

	const trimmedText = text.trim();

	if (trimmedText === "") {
		return null;
	}

	if (type === "firstName" && trimmedText.length > 50) {
		return null;
	}

	return trimmedText;
}

function chooseNextPlayer(game: Game): string | undefined {
	if (!game.guestPlayerId) {
		return undefined;
	}

	const recentDecisions = game.decisionHistory.slice(-5);
	let hostCount = 0;
	let guestCount = 0;

	for (const decision of recentDecisions) {
		if (decision.playerId === game.hostPlayerId) {
			hostCount += 1;
		} else {
			guestCount += 1;
		}
	}

	const hostWeight = guestCount + 1;
	const guestWeight = hostCount + 1;

	const randomNumber = Math.floor(Math.random() * (hostWeight + guestWeight));

	if (randomNumber < hostWeight) {
		return game.hostPlayerId;
	} else {
		return game.guestPlayerId;
	}
}

function findPlayer(playerId: string | undefined) {
	return players.find((player) => {
		return player.id === playerId;
	});
}

function buildGameResponse(game: Game): GameResponse | null {
	const hostPlayer = findPlayer(game.hostPlayerId);

	if (!hostPlayer) {
		return null;
	}

	return {
		host: hostPlayer,
		guest: findPlayer(game.guestPlayerId) ?? null,
		currentDeciderPlayerId: game.currentDeciderPlayerId ?? null,
		decisionHistory: game.decisionHistory,
	};
}

//Middleware RequireGame
function requireGame(request: Request, response: Response, next: NextFunction) {
	const gameId = request.params.gameId;

	const currentGame = games.find((game) => {
		return game.id === gameId;
	});

	if (!currentGame) {
		return response.sendStatus(404);
	}

	response.locals.game = currentGame;

	next();
}

//Middleware RequireValidInvite
function requireValidInvite(
	request: Request,
	response: Response,
	next: NextFunction,
) {
	const token = request.params.token;

	const game = games.find((game) => {
		return game.inviteToken === token;
	});

	if (!game || game.inviteUsed) {
		return response.sendStatus(404);
	}

	response.locals.game = game;

	next();
}

app.use(pinoHttp());
app.use(express.json());

app.get("/healthz", (request, response) => {
	response.sendStatus(200);
});

//Create a game
app.post("/games", (request, response) => {
	const firstName = request.body?.firstName;
	const validFirstName = getValidText(firstName, "firstName");

	if (validFirstName === null) {
		return response.sendStatus(400);
	}

	const player: Player = {
		id: randomUUID(),
		firstName: validFirstName,
	};
	const game: Game = {
		id: randomUUID(),
		hostPlayerId: player.id,
		inviteToken: randomUUID(),
		inviteUsed: false,
		decisionHistory: [],
	};

	players.push(player);
	games.push(game);
	response.status(201).json({ player, game });
});

//Is invitaion valid
app.get("/invite/:token", requireValidInvite, (request, response) => {
	response.sendStatus(200);
});

//Use invitation to join
app.post("/invite/:token", requireValidInvite, (request, response) => {
	const firstName = request.body?.firstName;
	const validFirstName = getValidText(firstName, "firstName");
	const game = response.locals.game;

	if (validFirstName === null) {
		return response.sendStatus(400);
	}

	const player: Player = {
		id: randomUUID(),
		firstName: validFirstName,
	};

	game.guestPlayerId = player.id;
	players.push(player);
	game.currentDeciderPlayerId = chooseNextPlayer(game);
	game.inviteUsed = true;

	return response.status(201).json({ player, game });
});

//Next turn
app.post("/games/:gameId/decision", requireGame, (request, response) => {
	const currentGame = response.locals.game;
	const decisionInfo = request.body?.decision;
	const validDecision = getValidText(decisionInfo);
	const comment = request.body?.comment;
	const validComment = getValidText(comment);
	const difficulty = request.body?.difficulty;

	if (!currentGame.currentDeciderPlayerId) {
		return response.sendStatus(409);
	}

	if (!validDecision) {
		return response.sendStatus(400);
	}

	if (
		difficulty !== undefined &&
		difficulty !== "easy" &&
		difficulty !== "medium" &&
		difficulty !== "hard"
	) {
		return response.sendStatus(400);
	}

	const decision: Decision = {
		playerId: currentGame.currentDeciderPlayerId,
		decision: validDecision,
		comment: validComment,
		difficulty: difficulty,
		createdAt: new Date(),
	};

	currentGame.decisionHistory.push(decision);

	currentGame.currentDeciderPlayerId = chooseNextPlayer(currentGame);

	const game = buildGameResponse(response.locals.game);

	if (!game) {
		return response.sendStatus(500);
	}

	return response.status(200).json({ game });
});

app.get("/games/:gameId", requireGame, (_, response) => {
	const game = buildGameResponse(response.locals.game);

	if (!game) {
		return response.sendStatus(500);
	}

	return response.status(200).json({ game });
});

app.listen(port);
