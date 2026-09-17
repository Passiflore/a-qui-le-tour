import ReviewDrawer from "../../components/Drawers/ReviewDrawer/ReviewDrawer";
import Sphere from "../../components/Sphere/Sphere";
import { useGamePolling } from "../../hooks/useGamePolling";
import styles from "./ReviewPage.module.css";

function Review() {
	const { game, opponent, me } = useGamePolling();
	const playerId = localStorage.getItem("playerId");
	const lastDecison = game?.decisionHistory.at(-1);

	const isHost = game?.host.id === playerId;

	return (
		<main className={styles.container}>
			<Sphere color={isHost ? "orange" : "purple"} />
			<span className={styles.reviewIntro}>A toi de valider</span>
			<h1 className={styles.pageTitle}>
				<span>La décision de </span>

				<span className={isHost ? styles.host : styles.guest}>
					{opponent?.firstName}
				</span>
			</h1>
			{lastDecison && (
				<ReviewDrawer firstName={me?.firstName ?? ""} decision={lastDecison} />
			)}
		</main>
	);
}
export default Review;
