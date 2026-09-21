import HistoryDrawer from "../../components/Drawers/HistoryDrawer/HistoryDrawer";
import ReviewDrawer from "../../components/Drawers/ReviewDrawer/ReviewDrawer";
import Sphere from "../../components/Sphere/Sphere";
import { useGamePolling } from "../../hooks/useGamePolling";
import styles from "./ReviewPage.module.css";

function Review() {
	const { game, opponent, me, isHost } = useGamePolling();
	const lastDecision = game?.decisionHistory.at(-1);

	return (
		<main className={styles.container}>
			<HistoryDrawer game={game ?? null} />
			<Sphere color={isHost ? "orange" : "purple"} />
			<span className={styles.reviewIntro}>A toi de valider</span>
			<h1 className={styles.pageTitle}>
				<span>La décision de </span>

				<span className={isHost ? styles.host : styles.guest}>
					{opponent?.firstName}
				</span>
			</h1>
			{lastDecision && (
				<ReviewDrawer firstName={me?.firstName ?? ""} decision={lastDecision} />
			)}
		</main>
	);
}
export default Review;
