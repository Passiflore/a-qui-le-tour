import { Link, useNavigate } from "react-router";
import ActionButton from "../ActionButton/ActionButton";
import NameTag from "../NameTag/NameTag";
import styles from "./DecisionDrawer.module.css";
import CrossIcon from "../CrossIcon/CrossIcon";
import { useRef } from "react";

interface DrawerProps {
	drawerRef: React.RefObject<HTMLDialogElement | null>;
}

const Difficulties = [
	{ value: "easy", label: "Évident" },
	{ value: "hesitant", label: "Hésitant" },
	{ value: "hard", label: "Difficile" },
];

function DecisionDrawer({ drawerRef }: DrawerProps) {
	const navigate = useNavigate();
	const formRef = useRef<HTMLFormElement>(null);

	function closeDrawer() {
		drawerRef.current?.close();
	}

	function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
		e.preventDefault();
		closeDrawer();
		navigate("/waiting", { viewTransition: true });
	}

	return (
		<dialog
			className={styles.drawerDialog}
			ref={drawerRef}
			onClose={() => formRef.current?.reset()}
			onClick={(e) => {
				if (e.target === drawerRef.current) closeDrawer();
			}}
		>
			<div className={styles.drawerContainer}>
				<div className={styles.heroContainer}>
					<NameTag firstName="test" />
					<button
						className={styles.closeButton}
						aria-label="Fermer"
						onClick={closeDrawer}
					>
						<CrossIcon />
					</button>
				</div>
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
						<label htmlFor={"commentary"}>
							Commentaire{" "}
							<span className={styles.optionalText}>(optionnel)</span>
						</label>
						<input
							id="commentary"
							name="commentary"
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
						Passer sans rensigner
					</Link>
				</form>
			</div>
		</dialog>
	);
}

export default DecisionDrawer;
