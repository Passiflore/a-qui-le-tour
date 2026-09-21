import { useEffect, useState } from "react";
import { getGame, type GameResponse } from "../api";
import { useLocation, useNavigate } from "react-router";

const bell = new Audio("/bell.mp3");
bell.volume = 0.4;
function playBell() {
	bell.currentTime = 0;
	bell.play().catch(() => {});
}

function getTargetPage(game: GameResponse, playerId: string | null) {
	if (game.pendingReviewBy === playerId) return "/review";
	if (game.pendingReviewBy !== null) return "/waiting";
	if (game.currentDeciderPlayerId === playerId) return "/decision";
	return "/waiting";
}

export function useGamePolling() {
	const [game, setGame] = useState<GameResponse | null>(null);
	const navigate = useNavigate();
	const playerId = localStorage.getItem("playerId");
	const gameId = localStorage.getItem("gameId");
	const currentPage = useLocation().pathname;
	const [lastCheck, setLastCheck] = useState<Date | null>(null);
	const pendingReviewBy = game?.pendingReviewBy;
	const isMyTurn =
		game?.currentDeciderPlayerId === playerId && pendingReviewBy === null;
	const historyLength = game?.decisionHistory.length ?? 0;
	const isHost = game?.host.id === playerId;
	const me = isHost ? game?.host : game?.guest;
	const opponent = isHost ? game?.guest : game?.host;

	useEffect(() => {
		function loadGame() {
			if (!gameId) return;
			getGame(gameId).then((data) => {
				setGame(data.game);
				setLastCheck(new Date());
				const targetPage = getTargetPage(data.game, playerId);
				if (data.game.guest) {
					if (targetPage !== currentPage) {
						navigate(targetPage, { viewTransition: true });
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

	return { game, lastCheck, me, opponent, isHost };
}
