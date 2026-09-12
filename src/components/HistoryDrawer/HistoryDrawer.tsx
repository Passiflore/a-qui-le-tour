import { useState } from "react";
import Drawer from "../Drawer/Drawer";
import styles from "./HistoryDrawer.module.css";
import HistoryIcon from "../Icons/HistoryIcon";
import type { Decision, Player } from "../../api";

interface HistoryDrawerProps {
	history: Decision[];
	host: Player | null;
	guest: Player | null;
}

function HistoryDrawer({ history, host, guest }: HistoryDrawerProps) {
	const [isOpen, setIsOpen] = useState(false);

	function handleClick() {
		setIsOpen(true);
	}

	function onClose() {
		setIsOpen(false);
	}

	function formatDate(isoDate: string) {
		const date = new Date(isoDate);

		const weekday = date.toLocaleDateString("fr-Fr", { weekday: "short" });
		const time = date.toLocaleTimeString("fr-FR", {
			hour: "2-digit",
			minute: "2-digit",
		});
		return `${weekday} ${time}`;
	}

	return (
		<div>
			<div onClick={handleClick} className={styles.iconHistory}>
				<HistoryIcon />
			</div>
			<Drawer isOpen={isOpen} onClose={onClose} title={"Historique"}>
				<hr />
				{history.map((decision) => {
					const isGuest = decision.playerId === guest?.id;
					const player = isGuest ? guest : host;
					return (
						<div key={decision.createdAt}>
							<div className={styles.decisionsContainer}>
								<div className={styles.decisionText}>
									<div
										className={`${styles.circle} ${isGuest ? styles.guest : styles.host}`}
									/>
									<div className={styles.decision}>
										<span className={isGuest ? styles.guest : styles.host}>
											{player?.firstName}
										</span>
										<span>&nbsp;a décidé&nbsp;:&nbsp;</span>
										<span>{decision.decision}</span>
									</div>
									<span className={styles.decisionDate}>
										{formatDate(decision.createdAt)}
									</span>

									{decision.comment && (
										<div>
											<p className={styles.decisionComment}>
												{decision.comment}
											</p>
										</div>
									)}
								</div>
							</div>
							<hr />
						</div>
					);
				})}
			</Drawer>
		</div>
	);
}
export default HistoryDrawer;
