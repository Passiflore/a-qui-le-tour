import styles from "./WaitingPage.module.css";
import { useGamePolling } from "../../hooks/useGamePolling";
import { useElapsedSince } from "../../hooks/useElapsedSince";
import Sphere from "../../components/Sphere/Sphere";

function Waiting() {
	const { game, lastCheck, me, opponent } = useGamePolling();

	const history = game?.decisionHistory ?? [];
	const playerId = localStorage.getItem("playerId");

	const isHost = game?.host.id === playerId;

	const acceptedHistory = history.filter((d) => d.status === "accepted");

	const myScore = acceptedHistory.filter((d) => d.playerId === playerId).length;
	const opponentScore = acceptedHistory.length - myScore;

	const elapsedTime = useElapsedSince(lastCheck);
	const lastDecision = game?.decisionHistory.at(-1);

	function getSyncLabel() {
		if (!lastCheck) return "connexion…";
		if (elapsedTime === 0) return "synchro à l'instant";
		return `synchro il y a ${elapsedTime} s`;
	}

	return (
		<div className={styles.container}>
			<div className={styles.synchro}>
				<div
					className={`${styles.circle} ${lastCheck && elapsedTime === 0 ? styles.lit : ""}`}
				/>

				<span>{getSyncLabel()}</span>
			</div>
			<Sphere color={isHost ? "orange" : "purple"} />
			<h1 className={styles.pageTitle}>
				<span className={styles.turnIntro}>En ce moment</span>
				<span className={styles.playerName}>{opponent?.firstName}</span>
				<span className={styles.turnAction}>décide</span>
			</h1>
			<p className={styles.description}>
				Attends que {opponent?.firstName} prenne sa décision
			</p>
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
			{lastDecision && (
				<div className={styles.lastDecisionContainer}>
					<p className={styles.lastDecisionTitle}>Dernière décision</p>
					<p key={lastDecision?.createdAt} className={styles.lastDecisionText}>
						{lastDecision?.decision}
					</p>
				</div>
			)}
		</div>
	);
}

export default Waiting;
