import { useState } from "react";
import Drawer from "../Drawer/Drawer";
import styles from "./HistoryDrawer.module.css";
import HistoryIcon from "../../Icons/HistoryIcon";
import type { GameResponse } from "../../../api";
import SparklesIcon from "../../Icons/SparklesIcon";

interface HistoryDrawerProps {
	game: GameResponse | null;
}

const rtf = new Intl.RelativeTimeFormat("fr-FR", {
	numeric: "auto",
	style: "short",
});

const difficultiesClasses = {
	easy: styles.easy,
	medium: styles.medium,
	hard: styles.hard,
};

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

function HistoryDrawer({ game }: HistoryDrawerProps) {
	const [isOpen, setIsOpen] = useState(false);
	const history = game?.decisionHistory ?? [];
	const historyTable = history.filter((d) => d.status !== "waiting");
	const host = game?.host;
	const guest = game?.guest;

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
				{historyTable.length === 0 ? (
					<div className={styles.noHistory}>
						<SparklesIcon />
						<p>Aucune décision encore prise</p>
					</div>
				) : (
					historyTable.map((decision) => {
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
											{decision.status === "refused" ? (
												<div className={styles.refusedContainer}>
													<span>&nbsp;a proposé&nbsp;:&nbsp;</span>
													<span className={styles.refusedText}>
														"{decision.decision}"
													</span>
												</div>
											) : (
												<>
													<span>&nbsp;a décidé&nbsp;:&nbsp;</span>
													<span>"{decision.decision}"</span>
												</>
											)}
										</div>
										{decision.difficulty && decision.status !== "refused" && (
											<div
												className={`${styles.circle} ${difficultiesClasses[decision.difficulty]} ${styles.difficulty}`}
											/>
										)}

										{decision.status === "refused" && (
											<div
												className={`${styles.difficulty} ${styles.refusedTag}`}
											>
												<p>Refusé</p>
											</div>
										)}

										<div className={styles.dateContainer}>
											<span className={styles.dateRelative}>
												{calcDate(decision.createdAt)}
											</span>
											<span className={styles.dateAbsolute}>
												{formatDate(decision.createdAt)}
											</span>
										</div>

										{decision.comment && (
											<p className={styles.decisionComment}>
												{decision.comment}
											</p>
										)}
									</div>
								</div>
								<hr />
							</div>
						);
					})
				)}
			</Drawer>
		</div>
	);
}
export default HistoryDrawer;
