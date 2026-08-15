import { Link } from "react-router";
import ActionButton from "../ActionButton/ActionButton";
import NameTag from "../NameTag/NameTag";
import styles from "./DecisionDrawer.module.css";

const Difficulties = [
	{ value: "easy", label: "Évident" },
	{ value: "hesitant", label: "Hésitant" },
	{ value: "hard", label: "Difficile" },
];

function DecisionDrawer() {
	return (
		<div className={styles.DrawerContainer}>
			<NameTag firstName="test" />
			<h2 className={styles.drawerTitle}>
				Qu'est-ce que <br /> tu as décidé ?
			</h2>
			<form className={styles.formContainer}>
				<div className={styles.inputContainer}>
					<label htmlFor={"decision"} className={styles.primaryInputTitle}>
						La décision *
					</label>
					<input
						id="decision"
						placeholder="ex. On va chez Luigi ce soir"
					></input>
				</div>
				<div className={styles.inputContainer}>
					<label htmlFor={"commentary"}>
						Commentaire <span className={styles.optionalText}>(optionnel)</span>
					</label>
					<input
						id="commentary"
						placeholder="Pourquoi ce choix ? Une précision"
					></input>
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
				<ActionButton text={"Confirmer"} size={"medium"} />
				<Link to="/waiting" className={styles.link}>
					Passer sans rensigner
				</Link>
			</form>
		</div>
	);
}

export default DecisionDrawer;
