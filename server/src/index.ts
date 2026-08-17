import express from "express";
import { pinoHttp } from "pino-http";

const app = express();
const port = 3000;

app.use(pinoHttp());

app.get("/healthz", (request, response) => {
	response.sendStatus(200);
});

app.listen(port);
