import styles from "./WaitingPage.module.css";
import { useGamePolling } from "../../hooks/useGamePolling";

function Waiting() {
	const game = useGamePolling();

	const isHostDeciding = game?.currentDeciderPlayerId === game?.host.id;
	const currentDecider = isHostDeciding
		? game?.host.firstName
		: game?.guest?.firstName;
	const otherPlayer = isHostDeciding
		? game?.guest?.firstName
		: game?.host.firstName;

	return (
		<div className={styles.container}>
			<div className={styles.sphere}></div>
			<h1 className={styles.pageTitle}>
				<span className={styles.turnIntro}>En ce moment</span>
				<span className={styles.playerName}>{currentDecider}</span>
				<span className={styles.turnAction}>décide</span>
			</h1>
			<p className={styles.description}>
				Attends que {currentDecider} prenne sa décision
			</p>
			<div className={styles.scoreContainer}>
				<div className={styles.score}>
					<span className={`${styles.scoreNumber} ${styles.playerOne}`}>1</span>
					<span className={styles.scoreText}>{otherPlayer}</span>
				</div>
				<div className={styles.score}>
					<span className={`${styles.scoreNumber} ${styles.playerTwo}`}>0</span>
					<span className={styles.scoreText}>{currentDecider}</span>
				</div>
			</div>
		</div>
	);
}

export default Waiting;
