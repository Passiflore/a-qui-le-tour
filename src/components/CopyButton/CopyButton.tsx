import { useRef, useState } from "react";
import styles from "./CopyButton.module.css";

const ButtonStatus = {
	idle: { class: "idle", text: "Copier le lien" },
	success: { class: "activated", text: "Copié" },
	error: { class: "error", text: "Pas copié" },
};

function CopyButton({ invitationLink }: { invitationLink: string }) {
	const timerRef = useRef<number | null>(null);

	const [copyStatus, setCopyStatus] =
		useState<keyof typeof ButtonStatus>("idle");

	async function handleInvite(invitationLink: string) {
		try {
			await navigator.clipboard.writeText(invitationLink);
			setCopyStatus("success");
		} catch (error) {
			console.error(error);
			setCopyStatus("error");
		}

		if (timerRef.current) {
			clearTimeout(timerRef.current);
		}
		timerRef.current = setTimeout(() => setCopyStatus("idle"), 2000);
	}

	return (
		<button
			className={`${styles.copyButton} ${styles[ButtonStatus[copyStatus].class]}`}
			onClick={() => handleInvite(invitationLink)}
		>
			{ButtonStatus[copyStatus].text}
		</button>
	);
}

export default CopyButton;
