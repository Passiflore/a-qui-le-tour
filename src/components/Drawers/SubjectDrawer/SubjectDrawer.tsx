import { useDrawer } from "../../../hooks/useDrawer";
import { getGameId, getPlayerId } from "../../../session";
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
	const { isOpen, open, close } = useDrawer();
	const formRef = useRef<HTMLFormElement>(null);
	const gameId = getGameId();
	const playerId = getPlayerId();
	const [error, setError] = useState<string | null>(null);
	const [isSending, setIsSending] = useState(false);

	async function sendSubject(subject?: string) {
		if (!gameId || !playerId) return;

		setError(null);
		setIsSending(true);
		try {
			await chooseSubject(gameId, { subject, playerId });
			handleClose();
		} catch {
			setError("Impossible d'envoyer le sujet.");
		} finally {
			setIsSending(false);
		}
	}

	async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const subject = String(formData.get("subject") ?? "");

		await sendSubject(subject);
	}

	function handleClose() {
		formRef.current?.reset();
		close();
	}

	return (
		<div>
			<ActionButton
				text="Choisir le sujet"
				color="orange"
				size="large"
				onClick={open}
			/>
			<Drawer
				onClose={handleClose}
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
						disabled={isSending}
					/>
					<button
						onClick={() => sendSubject()}
						className={styles.pass}
						type="button"
						disabled={isSending}
					>
						Passer sans sujet
					</button>

					{error && (
						<div className="errorContainer">
							<p className="errorText">{error}</p>
						</div>
					)}
				</form>
			</Drawer>
		</div>
	);
}

export default SubjectDrawer;
