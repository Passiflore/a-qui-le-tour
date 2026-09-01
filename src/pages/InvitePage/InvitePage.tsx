import NameTag from "../../components/NameTag/NameTag";
import "./InvitePage.css";
import CopyButton from "../../components/CopyButton/CopyButton";
import { useEffect, useState } from "react";
import { getGame, type GameResponse } from "../../api";
import { useNavigate } from "react-router";

function InvitePage() {
	const navigate = useNavigate();
	const gameId = localStorage.getItem("gameId");
	const inviteToken = localStorage.getItem("inviteToken");
	const invitationLink = `${window.location.origin}/join/${inviteToken}`;
	const [game, setGame] = useState<GameResponse | null>(null);
	const playerId = localStorage.getItem("playerId");

	useEffect(() => {
		if (!gameId) return;

		const interval = setInterval(() => {
			getGame(gameId).then((data) => {
				setGame(data.game);
				if (data.game.guest) {
					if (data.game.currentDeciderPlayerId === playerId) {
						navigate("/decision", { viewTransition: true });
					} else {
						navigate("/waiting", { viewTransition: true });
					}
				}
			});
		}, 3000);

		return () => clearInterval(interval);
	}, [gameId, navigate, playerId]);

	useEffect(() => {
		if (!gameId) {
			return;
		}
		getGame(gameId).then((data) => {
			setGame(data.game);
		});
	}, [gameId]);

	return (
		<main className="inviteContent">
			{game?.host && <NameTag firstName={game.host?.firstName} />}

			<div>
				<h1 className="inviteTitle">Invite l'autre joueur</h1>
				<p className="inviteDescription">
					Envoie ce lien à ton partenaire. Il aura une page pour entrer son
					prénom.
				</p>
			</div>
			<div className="invitationLinkContainer">
				<h3 className="inviteLinkTitle">Lien d'invitaiton</h3>
				<p>{invitationLink}</p>
				<CopyButton invitationLink={invitationLink} />
			</div>
		</main>
	);
}

export default InvitePage;
