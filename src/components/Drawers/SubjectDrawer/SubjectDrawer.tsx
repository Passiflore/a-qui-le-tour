import { useRef, useState } from "react";
import ActionButton from "../../ActionButton/ActionButton";
import NameTag from "../../NameTag/NameTag";
import Drawer from "../Drawer/Drawer";
import styles from "./SubjectDrawer.module.css";
import { chooseSubject } from "../../../api";

interface SubjectDrawerProps {
	firstName: string;
	opponentName: string;
}

function SubjectDrawer({ firstName, opponentName }: SubjectDrawerProps) {
	const [isOpen, setIsOpen] = useState(false);
	const formRef = useRef<HTMLFormElement>(null);
	const gameId = localStorage.getItem("gameId");
	const playerId = localStorage.getItem("playerId");

	async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const subject = String(formData.get("subject") ?? "");

		if (!gameId || !playerId) return;

		const subjectBody = {
			subject,
			playerId,
		};

		await chooseSubject(gameId, subjectBody);
		onClose();
	}

	async function handlePass() {
		if (!gameId || !playerId) return;

		await chooseSubject(gameId, { playerId });
		onClose();
	}

	function handleClick() {
		setIsOpen(true);
	}

	function onClose() {
		formRef.current?.reset();
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
					Quel sujet <br /> à trancher ?
				</h2>
				<p className={styles.drawerSubtitle}>
					Choisis ce que {opponentName} doit décider
				</p>

				<form
					className={styles.formContainer}
					onSubmit={handleSubmit}
					ref={formRef}
				>
					<div className={styles.inputContainer}>
						<label htmlFor={"subject"} className={styles.primaryInputTitle}>
							Le sujet *
						</label>
						<input
							id="subject"
							name="subject"
							placeholder="ex. Où on mange ce soir ?"
							required
						/>
					</div>
					<ActionButton
						text="Soumettre le sujet"
						type="submit"
						size="medium"
						color={"purple"}
					/>
					<button onClick={handlePass} className={styles.pass} type="button">
						Passer sans sujet
					</button>
				</form>
			</Drawer>
		</div>
	);
}

export default SubjectDrawer;
