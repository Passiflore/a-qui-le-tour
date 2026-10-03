import styles from "./WaitingPage.module.css";
import { useGamePolling } from "../../hooks/useGamePolling";
import { useElapsedSince } from "../../hooks/useElapsedSince";
import Sphere from "../../components/Sphere/Sphere";
import HistoryDrawer from "../../components/Drawers/HistoryDrawer/HistoryDrawer";
import InfoCard from "../../components/InfoCard/InfoCard";

function Waiting() {
	const { game, lastCheck, me, opponent, isHost, isOffline } = useGamePolling();

	const history = game?.decisionHistory ?? [];

	const acceptedHistory = history.filter((d) => d.status === "accepted");

	const myScore = acceptedHistory.filter((d) => d.playerId === me?.id).length;
	const opponentScore = acceptedHistory.length - myScore;
	const isWaitingSubject = game?.pendingSubjectBy === opponent?.id;
	const isWaitingReview = game?.pendingReviewBy === opponent?.id;
	const isWaitingDecision = !isWaitingSubject && !isWaitingReview;

	const elapsedTime = useElapsedSince(lastCheck);
	const lastDecision = game?.decisionHistory.at(-1);
	let waitingText = {
		intro: "En ce moment",
		title: "décide",
		subtitle: `Attends que ${opponent?.firstName} prenne sa décision`,
	};

	function getSyncLabel() {
		if (isOffline) return "connexion perdue";
		if (!lastCheck) return "connexion…";
		if (elapsedTime === 0) return "synchro à l'instant";
		return `synchro il y a ${elapsedTime} s`;
	}

	if (lastDecision?.status === "waiting") {
		waitingText = {
			intro: "en attente",
			title: "valide ta décision",
			subtitle: `${opponent?.firstName} peut accepter ou refuser ta décision`,
		};
	}

	if (isWaitingSubject) {
		waitingText = {
			intro: "en attente",
			title: "choisit le sujet",
			subtitle: `${opponent?.firstName} va choisir ce que tu dois trancher`,
		};
	}

	return (
		<div className={styles.container}>
			<HistoryDrawer game={game} />
			<div className={styles.synchro}>
				<div
					className={`${styles.circle} ${lastCheck && elapsedTime === 0 ? styles.lit : ""}`}
				/>

				<span>{getSyncLabel()}</span>
			</div>
			<Sphere color={isHost ? "orange" : "purple"} />
			<h1 className={styles.pageTitle}>
				<span className={styles.turnIntro}>{waitingText.intro}</span>
				<span className={styles.playerName}>{opponent?.firstName}</span>
				<span className={styles.turnAction}>{waitingText.title}</span>
			</h1>

			{game?.currentSubject && isWaitingDecision && (
				<InfoCard
					title={"Le sujet"}
					text={`"${game?.currentSubject}"`}
					color={"purple"}
				/>
			)}

			<p className={styles.description}>{waitingText.subtitle}</p>
			{isWaitingDecision && (
				<div className={styles.scoreContainer}>
					<div className={styles.score}>
						<span
							key={myScore}
							className={`${styles.scoreNumber} ${styles.myScore}`}
						>
							{myScore}
						</span>
						<span className={styles.scoreText}>{me?.firstName}</span>
					</div>
					<div className={styles.score}>
						<span
							key={opponentScore}
							className={`${styles.scoreNumber} ${styles.opponentScore}`}
						>
							{opponentScore}
						</span>
						<span className={styles.scoreText}>{opponent?.firstName}</span>
					</div>
				</div>
			)}

			{lastDecision && !isWaitingDecision && (
				<InfoCard
					title={"Dernière décision"}
					text={lastDecision?.decision}
					color={"purple"}
				/>
			)}
		</div>
	);
}

export default Waiting;
