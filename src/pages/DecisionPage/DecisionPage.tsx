import ActionButton from "../../components/ActionButton/ActionButton";
import NameTag from "../../components/NameTag/NameTag";
import style from "./DecisionPage.module.css";
import DecisionDrawer from "../../components/DecisionDrawer/DecisionDrawer";
import { useEffect, useRef, useState } from "react";
import { useGamePolling } from "../../hooks/useGamePolling";

function DecisionPage() {
	const drawerRef = useRef<HTMLDialogElement>(null);
	const game = useGamePolling().game;
	const historyLength = game?.decisionHistory.length ?? 0;
	const [dismissedAt, setDismissedAt] = useState<number | null>(null);
	const lastDecision = game?.decisionHistory.at(-1);

	const showAnnounce = dismissedAt !== historyLength;

	const currentDecider =
		game?.currentDeciderPlayerId === game?.host.id
			? game?.host.firstName
			: game?.guest?.firstName;

	function handleClick() {
		drawerRef.current?.showModal();
	}

	useEffect(() => {
		const timeout = setTimeout(() => setDismissedAt(historyLength), 3000);

		return () => {
			clearTimeout(timeout);
		};
	}, [historyLength]);

	return (
		<main className={style.decisionContainer}>
			<NameTag firstName={currentDecider ?? ""} color="white" />
			<div className={style.decisionTextContainer}>
				<h1 className={style.decisionTitle}>C'est ton tour</h1>
				<p className={style.decisionDescription}>
					À toi de trancher. Une fois décidé appuie ci-dessous
				</p>
			</div>
			<ActionButton text={"J'ai décidé!"} color="white" onClick={handleClick} />
			<DecisionDrawer drawerRef={drawerRef} firstName={currentDecider ?? ""} />
			{showAnnounce && (
				<div className={style.announce} role="status">
					<span className={style.announceTitle}>À toi</span>
					{lastDecision && (
						<span className={style.announceSub}>
							Dernier choix : {lastDecision.decision}
						</span>
					)}
				</div>
			)}
		</main>
	);
}

export default DecisionPage;
