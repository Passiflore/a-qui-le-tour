import { useState } from "react";
import ActionButton from "../../ActionButton/ActionButton";
import NameTag from "../../NameTag/NameTag";
import Drawer from "../Drawer/Drawer";
import styles from "./SubjectDrawer.module.css";
import { Link } from "react-router";

interface SubjectDrawerProps {
	firstName: string;
	opponentName: string;
}

function SubjectDrawer({ firstName, opponentName }: SubjectDrawerProps) {
	const [isOpen, setIsOpen] = useState(false);
	const gameId = localStorage.getItem("gameId");
	const playerId = localStorage.getItem("playerId");

	function handleClick() {
		setIsOpen(true);
	}

	function onClose() {
		setIsOpen(false);
	}
	return (
		<div>
			<ActionButton
				text="Choisir le sujet"
				color="orange"
				size="large"
				onClick={handleClick}
			/>
			<Drawer
				onClose={onClose}
				isOpen={isOpen}
				hero={<NameTag firstName={firstName} />}
			>
				<h2 className={styles.drawerTitle}>
					Quel sujet <br /> a trancher ?
				</h2>
				<p className={styles.drawerSubtitle}>
					Choisis ce que {opponentName} doit décider
				</p>
				<div className={styles.decisionContainer}>
					<form
						className={styles.formContainer}
						// onSubmit={handleSubmit}
						// ref={formRef}
					>
						<div className={styles.inputContainer}>
							<label htmlFor={"decision"} className={styles.primaryInputTitle}>
								Le sujet *
							</label>
							<input
								id="subject"
								name="subject"
								placeholder="ex. Où on mange ce soir ?"
								required
							/>
						</div>
					</form>
					<ActionButton text="Confirmer" type="submit" size="medium" />
					<Link to="/waiting" className={styles.link}>
						Passer sans renseigner
					</Link>
				</div>
			</Drawer>
		</div>
	);
}

export default SubjectDrawer;
