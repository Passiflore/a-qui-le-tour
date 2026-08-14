import ActionButton from "../../components/ActionButton/ActionButton";
import NameTag from "../../components/NameTag/NameTag";
import style from "./DecisionPage.module.css";

function DecisionPage() {
	return (
		<main className={style.decisionContainer}>
			<NameTag firstName="test" color="white" />
			<div className={style.decisionTextContainer}>
				<h1 className={style.decisionTitle}>C'est ton tour</h1>
				<p className={style.decisionDescription}>
					À toi de trancher. Une fois décidé appuie ci-dessous
				</p>
			</div>
			<ActionButton text={"J'ai décidé!"} color="white" />
		</main>
	);
}

export default DecisionPage;
