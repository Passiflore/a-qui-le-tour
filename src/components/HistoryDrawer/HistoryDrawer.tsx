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
						<>
							<div
								key={decision.createdAt}
								className={styles.decisionsContainer}
							>
								<div className={styles.decisionText}>
									<div
										className={`${styles.circle} ${isGuest ? styles.guest : styles.host}`}
									/>
									<div className={styles.decision}>
										<p className={isGuest ? styles.guest : styles.host}>
											{player?.firstName}
										</p>
										<p>&nbsp;a décidé&nbsp;:&nbsp;</p>
										<p>{decision.decision}</p>
									</div>
									{decision.comment && (
										<p className={styles.decisionComment}>{decision.comment}</p>
									)}
								</div>
							</div>
							<hr />
						</>
					);
				})}

				<p>hello</p>
			</Drawer>
		</div>
	);
}
export default HistoryDrawer;
