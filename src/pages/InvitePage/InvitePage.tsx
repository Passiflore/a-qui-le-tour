import { useState, useRef } from "react";
import NameTag from "../../components/NameTag/NameTag";
import "./InvitePage.css";

interface InviteProps {
	firstName: string;
	inviationLink: string;
}

const ButtonStatus = {
	idle: { class: "", text: "Copier le lien" },
	success: { class: "activated", text: "Copié" },
	error: { class: "error", text: "Pas copié" },
};

function InvitePage({ firstName }: InviteProps) {
	const timerRef = useRef<number | null>(null);

	const invitationLink =
		"https://fa6dc00f-c1d0-49b2-87ab-dd249697f511-v3-figmaiframepreview.figma.site/?join=78SUS&p1=njfde";

	const [copyStatus, setCopyStatus] =
		useState<keyof typeof ButtonStatus>("idle");

	async function handleInvite(invitationLink: string) {
		try {
			await navigator.clipboard.writeText(invitationLink);
			setCopyStatus("success");
		} catch (error) {
			console.error(error, "test");
			setCopyStatus("error");
		}

		if (timerRef.current) {
			clearTimeout(timerRef.current);
		}
		timerRef.current = setTimeout(() => setCopyStatus("idle"), 2000);
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
					className={`copyButton ${ButtonStatus[copyStatus].class}`}
					onClick={() => handleInvite(invitationLink)}
				>
					{ButtonStatus[copyStatus].text}
				</button>
			</div>
		</main>
	);
}

export default InvitePage;
