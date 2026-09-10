import { Link, useNavigate } from "react-router";
import ActionButton from "../ActionButton/ActionButton";
import NameTag from "../NameTag/NameTag";
import styles from "./DecisionDrawer.module.css";
import { useRef } from "react";
import { nextTurn } from "../../api";
import Drawer from "../Drawer/Drawer";

interface DecisionDrawerProps {
	firstName: string;
	isOpen: boolean;
	onClose: () => void;
}

const Difficulties = [
	{ value: "easy", label: "Évident" },
	{ value: "medium", label: "Hésitant" },
	{ value: "hard", label: "Difficile" },
];

function DecisionDrawer({ firstName, isOpen, onClose }: DecisionDrawerProps) {
	const navigate = useNavigate();
	const formRef = useRef<HTMLFormElement>(null);
	const gameId = localStorage.getItem("gameId");

	async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
		e.preventDefault();
		const playerId = localStorage.getItem("playerId");
		const formData = new FormData(e.currentTarget);
		const decision = String(formData.get("decision") ?? "");
		const comment = String(formData.get("comment") ?? "");
		const rawDifficulty = String(formData.get("difficulty") ?? "");
		const validDifficulties = ["easy", "medium", "hard"] as const;

		const difficulty = validDifficulties.find((d) => d === rawDifficulty);

		if (!decision || !gameId) return;

		const decisionInfo = {
			decision: decision,
			comment: comment,
			difficulty: difficulty,
		};

		const result = await nextTurn(decisionInfo, gameId);
		handleClose();

		if (playerId !== result.game.currentDeciderPlayerId) {
			navigate("/waiting", { viewTransition: true });
		} else {
			navigate("/decision", { viewTransition: true });
		}
	}

	function handleClose() {
		formRef.current?.reset();
		onClose();
	}

	return (
		<Drawer
			isOpen={isOpen}
			onClose={handleClose}
			hero={<NameTag firstName={firstName} />}
		>
			<h2 className={styles.drawerTitle}>
				Qu'est-ce que <br /> tu as décidé ?
			</h2>
			<form
				className={styles.formContainer}
				onSubmit={handleSubmit}
				ref={formRef}
			>
				<div className={styles.inputContainer}>
					<label htmlFor={"decision"} className={styles.primaryInputTitle}>
						La décision *
					</label>
					<input
						id="decision"
						name="decision"
						placeholder="ex. On va chez Luigi ce soir"
						required
					/>
				</div>
				<div className={styles.inputContainer}>
					<label htmlFor={"comment"}>
						Commentaire <span className={styles.optionalText}>(optionnel)</span>
					</label>
					<input
						id="comment"
						name="comment"
						placeholder="Pourquoi ce choix ? Une précision"
					/>
				</div>
				<div className={styles.inputContainer}>
					<span id="difficultyLabel" className={styles.groupLabel}>
						C'était facile ?{" "}
						<span className={styles.optionalText}>(optionnel)</span>
					</span>
					<div
						className={styles.difficultyGroup}
						role="radiogroup"
						aria-labelledby="difficultyLabel"
					>
						{Difficulties.map((difficulty) => (
							<div key={difficulty.value} className={styles.difficultyOption}>
								<input
									type="radio"
									id={`difficulty-${difficulty.value}`}
									name="difficulty"
									value={difficulty.value}
									className={styles.difficultyInput}
								/>
								<label
									htmlFor={`difficulty-${difficulty.value}`}
									className={styles.difficultyLabel}
								>
									<span
										className={`${styles.buttonBadge} ${styles[difficulty.value]}`}
									/>
									{difficulty.label}
								</label>
							</div>
						))}
					</div>
				</div>
				<ActionButton text="Confirmer" type="submit" size="medium" />
				<Link to="/waiting" className={styles.link}>
					Passer sans renseigner
				</Link>
			</form>
		</Drawer>
	);
}

export default DecisionDrawer;
