import { useState } from "react";

import "./HomePage.css";

function HomePage() {
	const [firstName, setFirstName] = useState("");

	const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
		event.preventDefault();

		console.log("Création d'une partie pour :", firstName);
	};

	return (
		<main className="home">
			<div className="homeContent">
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
			</div>
		</main>
	);
}

export default HomePage;
