import type { ReactNode } from "react";
import "./CenteredPageLayout.css";

function CenteredPageLayout({ children }: { children: ReactNode }) {
	return (
		<div className="layoutContainer">
			<div className="layoutContent">{children}</div>
		</div>
	);
}

export default CenteredPageLayout;
