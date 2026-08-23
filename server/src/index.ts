import express, { Response, Request, NextFunction } from "express";
import { pinoHttp } from "pino-http";
import { randomUUID } from "node:crypto";

const app = express();
const port = Number(process.env.PORT) || 3000;

interface Player {
	id: string;
	firstName: string;
}

interface Game {
	id: string;
	hostPlayerId: string;
	guestPlayerId?: string;
	inviteToken: string;
	inviteUsed: boolean;

	currentDeciderPlayerId?: string;
	decisionHistory: string[];
}

const players: Player[] = [];
const games: Game[] = [];

function getValidFirstName(firstName: unknown): string | null {
	if (typeof firstName !== "string") {
		return null;
	}

	const trimmedFirstName = firstName.trim();

	if (trimmedFirstName === "" || trimmedFirstName.length > 50) {
		return null;
	}

	return trimmedFirstName;
}

function chooseNextPlayer(game: Game): string | undefined {
	if (!game.guestPlayerId) {
		return undefined;
	}
	const recentDecisions = game.decisionHistory.slice(-5);
	let hostCount = 0;
	let guestCount = 0;

	for (const decision of recentDecisions) {
		if (decision === game.hostPlayerId) {
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

app.use(pinoHttp());
app.use(express.json());

app.get("/healthz", (request, response) => {
	response.sendStatus(200);
});

//Create a game
app.post("/games", (request, response) => {
	const firstName = request.body?.firstName;
	const validFirstName = getValidFirstName(firstName);

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
app.get("/invite/:token", (request, response) => {
	const token = request.params.token;

	const game = games.find((game) => {
		return game.inviteToken === token;
	});

	if (game && !game.inviteUsed) {
		response.sendStatus(200);
	} else {
		response.sendStatus(404);
	}
});

//Use invitation to join
app.post("/invite/:token", (request, response) => {
	const token = request.params.token;
	const firstName = request.body?.firstName;
	const validFirstName = getValidFirstName(firstName);

	const game = games.find((game) => {
		return game.inviteToken === token;
	});

	if (!game || game.inviteUsed) {
		return response.sendStatus(404);
	}

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

	if (!currentGame.currentDeciderPlayerId) {
		return response.sendStatus(409);
	}

	currentGame.decisionHistory.push(currentGame.currentDeciderPlayerId);

	currentGame.currentDeciderPlayerId = chooseNextPlayer(currentGame);

	return response.status(200).json({ game: currentGame });
});

app.get("/games/:gameId", requireGame, (request, response) => {
	const currentGame = response.locals.game;

	return response.status(200).json({ game: currentGame });
});

app.listen(port);
