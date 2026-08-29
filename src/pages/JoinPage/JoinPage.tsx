import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getInvite } from "../../api";
import ActionButton from "../../components/ActionButton/ActionButton";
import Logo from "../../components/Logo/Logo";
import "./JoinPage.css";

function JoinPage() {
	const { token } = useParams();
	const [error, setError] = useState<string | null>(null);

	const [firstName, setFirstName] = useState("");
	useEffect(() => {
		if (!token) return;

		getInvite(token).catch(() => {
			setError("Cette invitation est invalide ou a déjà été utilisée");
		});
	}, [token]);

	return (
		<main className="joinContent">
			<Logo />
			<div>
				<h1 className="joinTitle">Rejoindre la partie</h1>
				<p className="joinDescription">
					Entre ton prénom. L'appli désignera ensuite qui décide, à chaque fois.
				</p>
			</div>
			<form className="joinForm">
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
					disabled={!firstName.trim()}
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
