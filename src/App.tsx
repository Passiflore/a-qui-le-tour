import { useState } from "react";
import "./App.css";
import CenteredPageLayout from "./layouts/CenteredPageLayout/CenteredPageLayout";
import HomePage from "./pages/HomePage/HomePage";

import InvitePage from "./pages/InvitePage/InvitePage";
import { Navigate, Route, Routes } from "react-router";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

function App() {
	const [firstName, setFirstName] = useState("");
	return (
		<CenteredPageLayout>
			<Routes>
				<Route
					path="/"
					element={
						<HomePage firstName={firstName} setFirstName={setFirstName} />
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
			</Routes>
		</CenteredPageLayout>
	);
}

export default App;
