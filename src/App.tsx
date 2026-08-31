import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import CenteredPageLayout from "./layouts/CenteredPageLayout/CenteredPageLayout";
import HomePage from "./pages/HomePage/HomePage";
import InvitePage from "./pages/InvitePage/InvitePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import DecisionPage from "./pages/DecisionPage/DecisionPage";
import WaitingPage from "./pages/WaitingPage/WaitingPage";
import JoinPage from "./pages/JoinPage/JoinPage";

function App() {
	return (
		<Routes>
			<Route element={<CenteredPageLayout />}>
				<Route path="/" element={<HomePage />} />
				<Route
					path="/invite"
					element={
						localStorage.getItem("gameId") ? (
							<InvitePage />
						) : (
							<Navigate to="/" replace />
						)
					}
				/>
				<Route path="/join/:token" element={<JoinPage />} />
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
