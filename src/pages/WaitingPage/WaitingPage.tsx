import { useEffect, useState } from "react";
import styles from "./WaitingPage.module.css";
import { getGame } from "../../api";

function Waiting() {
	const gameId = localStorage.getItem("gameId");
	const [currentDecider, setCurrentDecider] = useState<string>();
	const [otherPlayer, setOtherPlayer] = useState<string>();

	useEffect(() => {
		if (!gameId) {
			return;
		}
		getGame(gameId).then((data) => {
			if (!data.game || !data.game.guest) {
				return;
			}

			if (data.game.currentDeciderPlayerId === data.game.host.id) {
				setCurrentDecider(data.game.host.firstName);
				setOtherPlayer(data.game.guest.firstName);
			} else {
				setCurrentDecider(data.game.guest.firstName);
				setOtherPlayer(data.game.host.firstName);
			}
		});
	}, [gameId]);

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
