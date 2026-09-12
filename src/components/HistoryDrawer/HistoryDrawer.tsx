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

const rtf = new Intl.RelativeTimeFormat("fr-FR", {
	numeric: "auto",
	style: "short",
});

const UNITS = [
	["year", 31536000],
	["month", 2592000],
	["day", 86400],
	["hour", 3600],
	["minute", 60],
	["second", 1],
] as const;

function calcDate(isoDate: string) {
	const diffInSeconds = (new Date(isoDate).getTime() - Date.now()) / 1000;
	const abs = Math.abs(diffInSeconds);
	const [unit, secondsInUnit] = UNITS.find(([, s]) => abs >= s) ?? UNITS[5];
	return rtf.format(Math.round(diffInSeconds / secondsInUnit), unit);
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

		const weekday = date.toLocaleDateString("fr-FR", { weekday: "short" });
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
									<div className={styles.dateContainer}>
										<span className={styles.dateRelative}>
											{calcDate(decision.createdAt)}
										</span>
										<span className={styles.dateAbsolute}>
											{formatDate(decision.createdAt)}
										</span>
									</div>

									{decision.comment && (
										<p className={styles.decisionComment}>{decision.comment}</p>
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
