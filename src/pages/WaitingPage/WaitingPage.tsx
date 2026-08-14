import styles from "./WaitingPage.module.css";

function Waiting() {
	return (
		<div className={styles.container}>
			<div className={styles.sphere}></div>
			<h1 className={styles.pageTitle}>
				<span className={styles.turnIntro}>En ce moment</span>
				<span className={styles.playerName}>Joueur 2</span>
				<span className={styles.turnAction}>décide</span>
			</h1>
			<p className={styles.description}>
				Attends que Joueur 2 prenne sa décision
			</p>
			<div className={styles.scoreContainer}>
				<div className={styles.score}>
					<span className={`${styles.scoreNumber} ${styles.playerOne}`}>1</span>
					<span className={styles.scoreText}>test</span>
				</div>
				<div className={styles.score}>
					<span className={`${styles.scoreNumber} ${styles.playerTwo}`}>0</span>
					<span className={styles.scoreText}>Joueur 2</span>
				</div>
			</div>
		</div>
	);
}

export default Waiting;
