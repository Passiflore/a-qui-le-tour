import NameTag from "../../components/NameTag/NameTag";
import "./InvitePage.css";

interface InviteProps {
	firstName: string;
	inviationLink: string;
}

function InvitePage({ firstName }: InviteProps) {
	const invitationLink =
		"https://fa6dc00f-c1d0-49b2-87ab-dd249697f511-v3-figmaiframepreview.figma.site/?join=78SUS&p1=njfde";

	function handleInvite(invitationLink: string) {
		navigator.clipboard.writeText(invitationLink);
	}

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
				<button
					className="copyButton"
					onClick={() => handleInvite(invitationLink)}
				>
					Copier le lien
				</button>
			</div>
		</main>
	);
}

export default InvitePage;
