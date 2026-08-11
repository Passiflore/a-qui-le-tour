import { Outlet } from "react-router";
import "./CenteredPageLayout.css";

interface LayoutProps {
	tone?: "orange" | "dark";
}

function CenteredPageLayout({ tone = "dark" }: LayoutProps) {
	return (
		<div className="layoutContainer" data-tone={tone}>
			<div className="layoutContent">
				<Outlet />
			</div>
		</div>
	);
}

export default CenteredPageLayout;
