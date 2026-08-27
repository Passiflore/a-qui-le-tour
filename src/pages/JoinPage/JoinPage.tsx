import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getInvite } from "../../api";

function JoinPage() {
	const { token } = useParams();
	const [error, setError] = useState<string | null>(null);
	useEffect(() => {
		if (!token) return;

		getInvite(token).catch(() => {
			setError("Cette invitation est invalide ou a déjà été utilisée");
		});
	}, [token]);
	return (
		<main>
			<h1>Rejoindre la partie</h1>
			<p>{token}</p>
			{error && <p>{error}</p>}
		</main>
	);
}

export default JoinPage;
