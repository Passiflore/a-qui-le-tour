import { useDrawer } from "../../../hooks/useDrawer";
import { getGameId, getPlayerId } from "../../../session";
import ActionButton from "../../ActionButton/ActionButton";
import Drawer from "../Drawer/Drawer";
import styles from "./ReviewDrawer.module.css";
import NameTag from "../../NameTag/NameTag";
import { reviewDecision, type Decision } from "../../../api";
import SubjectCard from "../../SubjectCard/SubjectCard";
import Dot from "../../Dot/Dot";

interface ReviewDrawerProps {
	firstName: string;
	decision: Decision;
}

const difficultyText = {
	easy: "Évident à décider",
	medium: "Hésitant à décider",
	hard: "Dur à décider",
};

function ReviewDrawer({ firstName, decision }: ReviewDrawerProps) {
	const { isOpen, open, close } = useDrawer();
	const gameId = getGameId();
	const playerId = getPlayerId();

	function handleReview(review: boolean) {
		if (!playerId || !gameId) {
			return;
		}
		const reviewBody = { playerId: playerId, accepted: review };

		reviewDecision(reviewBody, gameId);
		close();
	}

	return (
		<div>
			<ActionButton
				text="Voir la décision"
				color="purple"
				size="medium"
				onClick={open}
			/>
			<Drawer
				onClose={close}
				isOpen={isOpen}
				hero={<NameTag firstName={firstName} />}
			>
				<h2 className={styles.drawerTitle}>
					Sa décision <br /> est prise
				</h2>
				<p className={styles.drawerSubtitle}>Acceptes-tu cette décision ?</p>
				<div className={styles.drawerContentContainer}>
					{decision.subject && (
						<SubjectCard title={"Le sujet"} text={decision.subject} />
					)}

					<div className={styles.decisionContainer}>
						<p className={styles.decisionIntro}>Décision</p>
						<p className={styles.title}>{decision.decision}</p>
						<hr />
						{decision.comment ? (
							<p className={styles.subtitle}>{decision.comment}</p>
						) : (
							<p className={styles.subtitle}>Aucun commentaire.</p>
						)}

						{decision.difficulty && (
							<div className={styles.difficultyContainer}>
								<Dot color={decision.difficulty} size="small" />
								<p className={styles.difficulty}>
									{difficultyText[decision.difficulty]}
								</p>
							</div>
						)}
					</div>
				</div>

				<div className={styles.buttonsContainer}>
					<ActionButton
						text="Refuser"
						color="red"
						size="medium"
						onClick={() => handleReview(false)}
					/>
					<ActionButton
						text="Accepter"
						color="green"
						size="medium"
						onClick={() => handleReview(true)}
					/>
				</div>
			</Drawer>
		</div>
	);
}

export default ReviewDrawer;
