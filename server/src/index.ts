import express from "express";

const app = express();
const port = 3000;

app.get("/healthz", (request, response) => {
	response.sendStatus(200);
});

app.listen(port);
