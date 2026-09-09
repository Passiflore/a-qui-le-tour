import { useEffect, useState } from "react";
import { getGame, type GameResponse } from "../api";
import { useLocation, useNavigate } from "react-router";

const bell = new Audio("/bell.mp3");
bell.volume = 0.4;
function playBell() {
	bell.currentTime = 0;
	bell.play().catch(() => {});
}

export function useGamePolling() {
	const [game, setGame] = useState<GameResponse | null>(null);
	const navigate = useNavigate();
	const playerId = localStorage.getItem("playerId");
	const gameId = localStorage.getItem("gameId");
	const currentPage = useLocation().pathname;
	const [lastCheck, setLastCheck] = useState<Date | null>(null);
	const isMyTurn = game?.currentDeciderPlayerId === playerId;
	const historyLength = game?.decisionHistory.length ?? 0;

	useEffect(() => {
		function loadGame() {
			if (!gameId) return;
			getGame(gameId).then((data) => {
				setGame(data.game);
				setLastCheck(new Date());
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

	useEffect(() => {
		document.title = isMyTurn ? "🔔 À toi de décider" : "À qui le tour ?";
		return () => {
			document.title = "À qui le tour ?";
		};
	}, [isMyTurn]);

	useEffect(() => {
		if (isMyTurn) {
			playBell();
		}
	}, [isMyTurn, historyLength]);

	return { game, lastCheck };
}
