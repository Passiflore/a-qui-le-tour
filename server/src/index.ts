import express from "express";
import { pinoHttp } from "pino-http";

const app = express();
const port = 3000;

function isValidFirstName(firstName: unknown): boolean {
	if (typeof firstName === "string") {
		const trimmedFirstName = firstName.trim();

		if (trimmedFirstName !== "" && trimmedFirstName.length <= 50) {
			return true;
		}
	}

	return false;
}

app.use(pinoHttp());
app.use(express.json());

app.get("/healthz", (request, response) => {
	response.sendStatus(200);
});

app.post("/games", (request, response) => {
	const firstName = request.body.firstName;
	if (isValidFirstName(firstName)) {
		response.send(firstName);
	} else {
		response.sendStatus(400);
	}
});

app.listen(port);
