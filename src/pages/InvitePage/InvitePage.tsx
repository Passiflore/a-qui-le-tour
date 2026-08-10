import "./InvitePage.css";

interface InviteProps {
	firstName: string;
}

function InvitePage({ firstName }: InviteProps) {
	return (
		<main className="inviteContent">
			<div className="inviteBadge">
				<span className="orangeCircle" />
				<span className="userName">{firstName}</span>
			</div>
			<div className="inviteText">
				<h1 className="inviteTitle">Invite l'autre joueur</h1>
				<p className="inviteDescription">
					Envoie ce lien à ton partenaire. Il aura une page pour entrer son
					prénom.
				</p>
			</div>
			<div className="invitationLinkContainer">
				<h3 className="inviteLinkTitle">Lien d'invitaiton</h3>
				<p>
					https://fa6dc00f-c1d0-49b2-87ab-dd249697f511-v3-figmaiframepreview.figma.site/?join=78SUS&p1=njfde
				</p>
				<button className="copyButton">Copier le lien</button>
			</div>
		</main>
	);
}

export default InvitePage;
