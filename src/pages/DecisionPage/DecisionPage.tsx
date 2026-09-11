import ActionButton from "../../components/ActionButton/ActionButton";
import NameTag from "../../components/NameTag/NameTag";
import styles from "./DecisionPage.module.css";
import DecisionDrawer from "../../components/DecisionDrawer/DecisionDrawer";
import { useEffect, useState } from "react";
import { useGamePolling } from "../../hooks/useGamePolling";
import HistoryDrawer from "../../components/HistoryDrawer/HistoryDrawer";

function DecisionPage() {
	const game = useGamePolling().game;
	const historyLength = game?.decisionHistory.length ?? 0;
	const [dismissedAt, setDismissedAt] = useState<number | null>(null);
	const lastDecision = game?.decisionHistory.at(-1);
	const [isOpen, setIsOpen] = useState(false);
	function onClose() {
		setIsOpen(false);
	}

	const showAnnounce = dismissedAt !== historyLength;

	const currentDecider =
		game?.currentDeciderPlayerId === game?.host.id
			? game?.host.firstName
			: game?.guest?.firstName;

	function handleClick() {
		setIsOpen(true);
	}

	useEffect(() => {
		const timeout = setTimeout(() => setDismissedAt(historyLength), 3000);

		return () => {
			clearTimeout(timeout);
		};
	}, [historyLength]);

	return (
		<main className={styles.decisionContainer}>
			<HistoryDrawer
				history={game?.decisionHistory ?? []}
				host={game?.host ?? null}
				guest={game?.guest ?? null}
			/>
			<NameTag firstName={currentDecider ?? ""} color="white" />
			<div className={styles.decisionTextContainer}>
				<h1 className={styles.decisionTitle}>C'est ton tour</h1>
				<p className={styles.decisionDescription}>
					À toi de trancher. Une fois décidé appuie ci-dessous
				</p>
			</div>
			<ActionButton text={"J'ai décidé!"} color="white" onClick={handleClick} />
			<DecisionDrawer
				firstName={currentDecider ?? ""}
				isOpen={isOpen}
				onClose={onClose}
			/>
			{showAnnounce && (
				<div className={styles.announce} role="status">
					<span className={styles.announceTitle}>À toi</span>
					{lastDecision && (
						<span className={styles.announceSub}>
							Dernier choix : {lastDecision.decision}
						</span>
					)}
				</div>
			)}
		</main>
	);
}

export default DecisionPage;
