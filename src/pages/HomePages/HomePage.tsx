import { useState } from "react";

import "./HomePage.css";
import { useNavigate } from "react-router";

function HomePage() {
	const [firstName, setFirstName] = useState("");
	const navigate = useNavigate();

	const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
		event.preventDefault();
		navigate("/invite");

		console.log("Création d'une partie pour :", firstName);
	};

	return (
		<main className="homeContent">
			<div className="homeLogo" aria-hidden="true">
				<span className="logoOrange" />
				<span className="logoPurple" />
			</div>
			<div className="homeText">
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
				<button
					className="homeButton"
					type="submit"
					disabled={!firstName.trim()}
				>
					Créer la partie
				</button>
			</form>
		</main>
	);
}

export default HomePage;
