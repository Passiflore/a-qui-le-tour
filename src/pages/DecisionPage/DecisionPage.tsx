import { useDrawer } from "../../hooks/useDrawer";
import ActionButton from "../../components/ActionButton/ActionButton";
import NameTag from "../../components/NameTag/NameTag";
import styles from "./DecisionPage.module.css";
import DecisionDrawer from "../../components/Drawers/DecisionDrawer/DecisionDrawer";
import { useEffect, useState } from "react";
import { useGamePolling } from "../../hooks/useGamePolling";
import HistoryDrawer from "../../components/Drawers/HistoryDrawer/HistoryDrawer";
import InfoCard from "../../components/InfoCard/InfoCard";

function DecisionPage() {
	const game = useGamePolling().game;
	const historyLength = game?.decisionHistory.length ?? 0;
	const [dismissedAt, setDismissedAt] = useState<number | null>(null);
	const lastDecision = game?.decisionHistory.at(-1);
	const { isOpen, open, close } = useDrawer();

	const showAnnounce = dismissedAt !== historyLength;

	const currentDecider =
		game?.currentDeciderPlayerId === game?.host.id
			? game?.host.firstName
			: game?.guest?.firstName;

	useEffect(() => {
		const timeout = setTimeout(() => setDismissedAt(historyLength), 3000);

		return () => {
			clearTimeout(timeout);
		};
	}, [historyLength]);

	return (
		<main className={styles.decisionContainer}>
			<HistoryDrawer game={game} />
			<NameTag firstName={currentDecider ?? ""} color="white" />
			{game?.currentSubject && (
				<InfoCard
					title={"Le sujet à trancher"}
					text={game?.currentSubject ?? ""}
					color={"white"}
				/>
			)}

			<div className={styles.decisionTextContainer}>
				<h1 className={styles.decisionTitle}>C'est ton tour</h1>
				<p className={styles.decisionDescription}>
					À toi de trancher. Une fois décidé appuie ci-dessous
				</p>
			</div>
			<ActionButton text={"J'ai décidé!"} color="white" onClick={open} />
			<DecisionDrawer
				firstName={currentDecider ?? ""}
				isOpen={isOpen}
				onClose={close}
				subject={game?.currentSubject}
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
