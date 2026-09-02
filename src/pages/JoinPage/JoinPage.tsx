import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { getInvite, joinGame } from "../../api";
import ActionButton from "../../components/ActionButton/ActionButton";
import Logo from "../../components/Logo/Logo";
import "./JoinPage.css";

function JoinPage() {
	const { token } = useParams();
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const [firstName, setFirstName] = useState("");
	useEffect(() => {
		if (!token) return;

		getInvite(token).catch(() => {
			setError("Cette invitation est invalide ou a déjà été utilisée");
		});
	}, [token]);

	async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
		e.preventDefault();
		setError(null);
		setIsLoading(true);
		if (!token) {
			setIsLoading(false);
			return setError("Cette invitation est invalide ou a déjà été utilisée");
		}
		try {
			const data = await joinGame(token, firstName);

			localStorage.setItem("playerId", data.player.id);
			localStorage.setItem("gameId", data.game.id);

			if (data.game.currentDeciderPlayerId === data.player.id) {
				navigate("/decision", { viewTransition: true });
			} else {
				navigate("/waiting", { viewTransition: true });
			}
		} catch {
			setError(
				"Impossible de rejoindre la partie. Vérifie ta connexion et réessaie.",
			);
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<main className="joinContent">
			<Logo />
			<div>
				<h1 className="joinTitle">Rejoindre la partie</h1>
				<p className="joinDescription">
					Entre ton prénom. L'appli désignera ensuite qui décide, à chaque fois.
				</p>
			</div>
			<form className="joinForm" onSubmit={handleSubmit}>
				<div className="joinInputContainer">
					<label htmlFor="firstName">ton prénom</label>
					<input
						id="firstName"
						className="joinInput"
						type="text"
						placeholder="Prénom..."
						value={firstName}
						onChange={(event) => setFirstName(event.target.value)}
					/>
				</div>
				<ActionButton
					text="Rejoindre"
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

export default JoinPage;
