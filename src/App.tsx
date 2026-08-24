import { useState } from "react";
import "./App.css";
import type { Game, Player } from "./api";
import CenteredPageLayout from "./layouts/CenteredPageLayout/CenteredPageLayout";
import HomePage from "./pages/HomePage/HomePage";

import InvitePage from "./pages/InvitePage/InvitePage";
import { Navigate, Route, Routes } from "react-router";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import DecisionPage from "./pages/DecisionPage/DecisionPage";
import WaitingPage from "./pages/WaitingPage/WaitingPage";

function App() {
	const [firstName, setFirstName] = useState("");
	const [player, setPlayer] = useState<Player | null>(null);
	const [game, setGame] = useState<Game | null>(null);
	return (
		<Routes>
			<Route element={<CenteredPageLayout />}>
				<Route
					path="/"
					element={
						<HomePage
							firstName={firstName}
							setFirstName={setFirstName}
							setPlayer={setPlayer}
							setGame={setGame}
						/>
					}
				/>
				<Route
					path="/invite"
					element={
						firstName.trim() ? (
							<InvitePage firstName={firstName} />
						) : (
							<Navigate to="/" replace />
						)
					}
				/>
				<Route path="*" element={<NotFoundPage />} />
			</Route>

			<Route element={<CenteredPageLayout tone="purple" />}>
				<Route path="/waiting" element={<WaitingPage />}></Route>
			</Route>

			<Route element={<CenteredPageLayout tone="orange" />}>
				<Route path="/decision" element={<DecisionPage />} />
			</Route>
		</Routes>
	);
}

export default App;
