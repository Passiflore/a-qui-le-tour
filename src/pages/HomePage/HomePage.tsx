import ActionButton from "../../components/ActionButton/ActionButton";
import Logo from "../../components/Logo/Logo";
import "./HomePage.css";
import { useNavigate } from "react-router";

interface HomePageProps {
	firstName: string;
	setFirstName: React.Dispatch<React.SetStateAction<string>>;
}

function HomePage({ firstName, setFirstName }: HomePageProps) {
	const navigate = useNavigate();

	const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
		event.preventDefault();
		navigate("/invite", { viewTransition: true });
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
					disabled={!firstName.trim()}
				/>
			</form>
		</main>
	);
}

export default HomePage;
