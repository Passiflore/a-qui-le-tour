import ActionButton from "../../components/ActionButton/ActionButton";
import NameTag from "../../components/NameTag/NameTag";
import style from "./DecisionPage.module.css";
import DecisionDrawer from "../../components/DecisionDrawer/DecisionDrawer";
import { useRef } from "react";
import { useGamePolling } from "../../hooks/useGamePolling";

function DecisionPage() {
	const drawerRef = useRef<HTMLDialogElement>(null);
	const game = useGamePolling().game;

	const currentDecider =
		game?.currentDeciderPlayerId === game?.host.id
			? game?.host.firstName
			: game?.guest?.firstName;

	function handleClick() {
		drawerRef.current?.showModal();
	}

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
		</main>
	);
}

export default DecisionPage;
