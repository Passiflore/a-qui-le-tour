import { getGameId } from "../session";
import { Navigate, Outlet } from "react-router";

function ProtectedPage() {
	const gameId = getGameId();
	return gameId ? <Outlet /> : <Navigate to="/" replace />;
}

export default ProtectedPage;
