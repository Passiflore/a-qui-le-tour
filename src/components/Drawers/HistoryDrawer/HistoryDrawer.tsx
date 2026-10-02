import { useDrawer } from "../../../hooks/useDrawer";
import { getGameId, getPlayerId } from "../../../session";
import Drawer from "../Drawer/Drawer";
import styles from "./HistoryDrawer.module.css";
import HistoryIcon from "../../Icons/HistoryIcon";
import { resetHistory, type GameResponse } from "../../../api";
import SparklesIcon from "../../Icons/SparklesIcon";
import DeleteIcon from "../../Icons/DeleteIcon";
import ActionButton from "../../ActionButton/ActionButton";
import Dot from "../../Dot/Dot";
interface HistoryDrawerProps {
	game: GameResponse | null;
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

function HistoryDrawer({ game }: HistoryDrawerProps) {
	const { isOpen, open, close } = useDrawer();
	const {
		isOpen: isPopupOpen,
		open: openPopup,
		close: closePopup,
	} = useDrawer();
	const history = game?.decisionHistory ?? [];
	const lastDecision = history.at(-1);
	const historyTable = history.filter((d) => d.status !== "waiting");
	const host = game?.host;
	const guest = game?.guest;
	const gameId = getGameId();
	const playerId = getPlayerId();
	const canDelete =
		lastDecision?.status !== "waiting" && historyTable.length !== 0;

	async function handleDelete() {
		if (!playerId || !gameId) {
			return;
		}

		const result = await resetHistory(gameId, { playerId });
		closePopup();

		return result;
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
			<div onClick={open} className={styles.iconHistory}>
				<HistoryIcon />
			</div>
			{canDelete && (
				<Drawer
					isOpen={isPopupOpen}
					onClose={closePopup}
					title={"Effacer l'historique ?"}
					isPopup={true}
				>
					<div className={styles.popupContent}>
						<p className={styles.popupText}>
							Les {historyTable.length} décisions seront supprimées pour{" "}
							{host?.firstName} comme pour {guest?.firstName}. C'est définitif.
						</p>
						<div className={styles.popupActions}>
							<ActionButton
								text="Annuler"
								color="orange"
								size="small"
								onClick={closePopup}
							/>
							<ActionButton
								text="Effacer"
								color="red"
								size="small"
								onClick={() => handleDelete()}
							/>
						</div>
					</div>
				</Drawer>
			)}
			<Drawer
				isOpen={isOpen}
				onClose={close}
				hero={
					<div className={styles.drawerHeroContainer}>
						<p className={styles.drawerTitle}>historique</p>
						{canDelete && (
							<button
								className={styles.deleteButton}
								onClick={openPopup}
							>
								<DeleteIcon />
								<p>Effacer l'historique</p>
							</button>
						)}
					</div>
				}
			>
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
									{decision.subject && (
										<p className={styles.subject}>Sujet : {decision.subject}</p>
									)}
									<div className={styles.decisionText}>
										<Dot color={isGuest ? "guest" : "host"} size="small" />

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
											<Dot color={decision.difficulty} size="small" />
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
