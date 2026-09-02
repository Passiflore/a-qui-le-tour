import { useState } from "react";
import { createGame } from "../../api";
import ActionButton from "../../components/ActionButton/ActionButton";
import Logo from "../../components/Logo/Logo";
import "./HomePage.css";
import { useNavigate } from "react-router";

function HomePage() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [firstName, setFirstName] = useState("");

	const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
		event.preventDefault();
		setError(null);
		setIsLoading(true);
		try {
			const data = await createGame(firstName);
			localStorage.setItem("playerId", data.player.id);
			localStorage.setItem("gameId", data.game.id);
			localStorage.setItem("inviteToken", data.game.inviteToken);
			navigate("/invite", { viewTransition: true });
		} catch {
			setError("Impossible de créer la partie");
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<main className="homeContent">
			<Logo />
			<div>
				<h1 className="homeTitle">à qui le tour ?</h1>
				<p className="homeDescription">
					Toi et quelqu'un d'autre. L'appli tranche qui doit décider à chaque
					fois.
				</p>
			</div>
			<form className="homeForm" onSubmit={handleSubmit}>
				<div className="homeInputContainer">
					<label htmlFor="firstName">ton prénom</label>
					<input
						id="firstName"
						className="homeInput"
						type="text"
						placeholder="Prénom..."
						value={firstName}
						onChange={(event) => setFirstName(event.target.value)}
					/>
				</div>
				<ActionButton
					text="Créer la partie"
					type={"submit"}
					disabled={!firstName.trim() || isLoading}
				/>
			</form>
			{error && (
				<div className="errorContainer">
					<p className="errorText">{error}</p>
				</div>
			)}
		</main>
	);
}

export default HomePage;
