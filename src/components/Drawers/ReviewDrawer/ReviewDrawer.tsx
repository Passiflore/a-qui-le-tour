import { useState } from "react";
import ActionButton from "../../ActionButton/ActionButton";
import Drawer from "../Drawer/Drawer";
import styles from "./ReviewDrawer.module.css";
import NameTag from "../../NameTag/NameTag";
import type { Decision } from "../../../api";

interface ReviewDrawerProps {
	firstName: string;
	decision: Decision;
}

function ReviewDrawer({ firstName, decision }: ReviewDrawerProps) {
	const [isOpen, setIsOpen] = useState(false);

	function handleClick() {
		setIsOpen(true);
	}

	function onClose() {
		setIsOpen(false);
	}

	const difficultyText = {
		easy: "Evident à décider",
		medium: "Hésitant à décider",
		hard: "Dur à décider",
	};

	const difficultyClasses = {
		easy: styles.easy,
		medium: styles.medium,
		hard: styles.hard,
	};

	return (
		<div>
			<ActionButton
				text="Voir la décision"
				color="purple"
				size="medium"
				onClick={handleClick}
			/>
			<Drawer
				onClose={onClose}
				isOpen={isOpen}
				hero={<NameTag firstName={firstName} />}
			>
				<h2 className={styles.drawerTitle}>
					Sa décision <br /> est prise
				</h2>
				<p className={styles.drawerSubtitle}>Acceptes-tu cette décision ?</p>
				<div className={styles.decisionContainer}>
					<p className={styles.decisionIntro}>Decision</p>
					<p className={styles.title}>{decision.decision}</p>
					<hr />
					{decision.comment && (
						<p className={styles.subtitle}>{decision.comment}</p>
					)}
					{decision.difficulty && (
						<div className={styles.difficultyContainer}>
							<div
								className={`${styles.circle} ${difficultyClasses[decision.difficulty]}`}
							></div>
							<p className={styles.difficulty}>
								{difficultyText[decision.difficulty]}
							</p>
						</div>
					)}
				</div>
				<div className={styles.buttonsContainer}>
					<ActionButton
						text="Refuser"
						color="red"
						size="medium"
						onClick={handleClick}
					/>
					<ActionButton
						text="Accepter"
						color="green"
						size="medium"
						onClick={handleClick}
					/>
				</div>
			</Drawer>
		</div>
	);
}

export default ReviewDrawer;
