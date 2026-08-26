import NameTag from "../../components/NameTag/NameTag";
import "./InvitePage.css";
import CopyButton from "../../components/CopyButton/CopyButton";
import type { Game } from "../../api";

interface InviteProps {
	firstName: string;
	game: Game;
}

function InvitePage({ firstName, game }: InviteProps) {
	const invitationLink = `${window.location.origin}/join/${game.inviteToken}`;
	return (
		<main className="inviteContent">
			<NameTag firstName={firstName} />
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
