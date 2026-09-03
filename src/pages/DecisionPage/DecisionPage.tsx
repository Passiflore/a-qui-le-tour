import ActionButton from "../../components/ActionButton/ActionButton";
import NameTag from "../../components/NameTag/NameTag";
import style from "./DecisionPage.module.css";
import DecisionDrawer from "../../components/DecisionDrawer/DecisionDrawer";
import { useEffect, useRef, useState } from "react";
import { getGame } from "../../api";

function DecisionPage() {
	const drawerRef = useRef<HTMLDialogElement>(null);
	const gameId = localStorage.getItem("gameId");
	const [currentDecider, setCurrentDecider] = useState<string>("");
	useEffect(() => {
		if (!gameId) {
			return;
		}
		getGame(gameId).then((data) => {
			if (!data.game || !data.game.guest) {
				return;
			}
			if (data.game.currentDeciderPlayerId === data.game.host.id) {
				setCurrentDecider(data.game.host.firstName);
			} else {
				setCurrentDecider(data.game.guest.firstName);
			}
		});
	}, [gameId]);

	function handleClick() {
		drawerRef.current?.showModal();
	}

	return (
		<main className={style.decisionContainer}>
			<NameTag firstName={currentDecider} color="white" />
			<div className={style.decisionTextContainer}>
				<h1 className={style.decisionTitle}>C'est ton tour</h1>
				<p className={style.decisionDescription}>
					À toi de trancher. Une fois décidé appuie ci-dessous
				</p>
			</div>
			<ActionButton text={"J'ai décidé!"} color="white" onClick={handleClick} />
			<DecisionDrawer drawerRef={drawerRef} />
		</main>
	);
}

export default DecisionPage;
