import NameTag from "../../components/NameTag/NameTag";
import "./InvitePage.css";
import CopyButton from "../../components/CopyButton/CopyButton";
import { useGamePolling } from "../../hooks/useGamePolling";

function InvitePage() {
	const inviteToken = localStorage.getItem("inviteToken");
	const invitationLink = `${window.location.origin}/join/${inviteToken}`;

	const game = useGamePolling().game;

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
				<h3 className="inviteLinkTitle">Lien d'invitation</h3>
				<p>{invitationLink}</p>
				<CopyButton invitationLink={invitationLink} />
			</div>
		</main>
	);
}

export default InvitePage;
