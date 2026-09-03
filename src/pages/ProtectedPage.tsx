import { Navigate, Outlet } from "react-router";

function ProtectedPage() {
	const gameId = localStorage.getItem("gameId");
	return gameId ? <Outlet /> : <Navigate to="/" replace />;
}

export default ProtectedPage;
