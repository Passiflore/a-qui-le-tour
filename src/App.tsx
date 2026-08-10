import "./App.css";
import CenteredPageLayout from "./layouts/CenteredPageLayout/CenteredPageLayout";
import HomePage from "./pages/HomePages/HomePage";

function App() {
	return (
		<CenteredPageLayout>
			<HomePage />
		</CenteredPageLayout>
	);
}

export default App;
