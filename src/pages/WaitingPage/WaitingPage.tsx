import styles from "./WaitingPage.module.css";
import { useGamePolling } from "../../hooks/useGamePolling";

function Waiting() {
	const game = useGamePolling();
	const history = game?.decisionHistory ?? [];
	const playerId = localStorage.getItem("playerId");

	const isHost = game?.host.id === playerId;
	const me = isHost ? game?.host : game?.guest;
	const opponent = isHost ? game?.guest : game?.host;

	const myScore = history.filter((d) => d.playerId === playerId).length;
	const opponentScore = history.length - myScore;

	return (
		<div className={styles.container}>
			<div className={styles.sphere}></div>
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
					<span className={`${styles.scoreNumber} ${styles.playerOne}`}>
						{myScore}
					</span>
					<span className={styles.scoreText}>{me?.firstName}</span>
				</div>
				<div className={styles.score}>
					<span className={`${styles.scoreNumber} ${styles.playerTwo}`}>
						{opponentScore}
					</span>
					<span className={styles.scoreText}>{opponent?.firstName}</span>
				</div>
			</div>
		</div>
	);
}

export default Waiting;
