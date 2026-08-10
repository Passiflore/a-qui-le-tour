import ActionButton from "../../components/ActionButton/ActionButton";
import Logo from "../../components/Logo/Logo";
import "./NotFoundPage.css";
import { useNavigate } from "react-router";

function NotFoundPage() {
	const navigate = useNavigate();
	return (
		<main className="errorContent">
			<Logo />
			<div className="errorText">
				<h1 className="errorTitle">404</h1>
				<p className="errorDescription">
					Cette page n'existe pas. Peut-être un lien cassé ?
				</p>
			</div>
			<div className="divider" />
			<ActionButton
				text="Retour à l'acceuil"
				onClick={() => navigate("/", { viewTransition: true })}
			/>
		</main>
	);
}
export default NotFoundPage;
