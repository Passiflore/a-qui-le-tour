import HistoryDrawer from "../../components/Drawers/HistoryDrawer/HistoryDrawer";
import SubjectDrawer from "../../components/Drawers/SubjectDrawer/SubjectDrawer";
import Sphere from "../../components/Sphere/Sphere";
import { useGamePolling } from "../../hooks/useGamePolling";
import styles from "./SubjectPage.module.css";

function SubjectPage() {
	const { game, me, opponent, isHost } = useGamePolling();

	return (
		<main className={styles.container}>
			<HistoryDrawer game={game} />
			<Sphere color={isHost ? "orange" : "purple"} />
			<span className={styles.intro}>À toi de choisir</span>
			<h1 className={styles.title}>Quel sujet ? </h1>

			<p className={styles.subtitle}>a soumettre à {opponent?.firstName}</p>

			<p className={styles.text}>
				Choisis ce que {opponent?.firstName} doit trancher
			</p>
			<SubjectDrawer
				firstName={me?.firstName ?? ""}
				opponentName={opponent?.firstName ?? ""}
			/>
		</main>
	);
}

export default SubjectPage;
