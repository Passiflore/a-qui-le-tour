import { useEffect, useState } from "react";
import { getGame, type GameResponse } from "../api";
import { useLocation, useNavigate } from "react-router";

export function useGamePolling() {
	const [game, setGame] = useState<GameResponse | null>(null);
	const navigate = useNavigate();
	const playerId = localStorage.getItem("playerId");
	const gameId = localStorage.getItem("gameId");
	const currentPage = useLocation().pathname;

	useEffect(() => {
		function loadGame() {
			if (!gameId) return;
			getGame(gameId).then((data) => {
				setGame(data.game);
				if (data.game.guest) {
					if (
						data.game.currentDeciderPlayerId === playerId &&
						currentPage !== "/decision"
					) {
						navigate("/decision", { viewTransition: true });
					} else if (
						data.game.currentDeciderPlayerId !== playerId &&
						currentPage !== "/waiting"
					) {
						navigate("/waiting", { viewTransition: true });
					}
				}
			});
		}

		loadGame();

		const interval = setInterval(loadGame, 3000);
		return () => {
			clearInterval(interval);
		};
	}, [gameId, currentPage, navigate, playerId]);

	return game;
}
