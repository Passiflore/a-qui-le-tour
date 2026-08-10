import type { ReactNode } from "react";
import "./CenteredPageLayout.css";

function CenteredPageLayout({ children }: { children: ReactNode }) {
	return (
		<main className="layoutContainer">
			<div className="layoutContent">{children}</div>
		</main>
	);
}

export default CenteredPageLayout;
