import "./App.css";
import CenteredPageLayout from "./layouts/CenteredPageLayout/CenteredPageLayout";
import HomePage from "./pages/HomePages/HomePage";

import InvitePage from "./pages/InvitePage/InvitePage";
import { Route, Routes } from "react-router";

function App() {
	return (
		<CenteredPageLayout>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/invite" element={<InvitePage />} />
			</Routes>
		</CenteredPageLayout>
	);
}

export default App;
