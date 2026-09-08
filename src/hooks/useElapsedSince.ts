import { useEffect, useState } from "react";

export function useElapsedSince(lastCheck: Date | null) {
	const [elapsedTime, setElapsedTime] = useState(0);

	useEffect(() => {
		function loadTime() {
			if (!lastCheck) return;
			const result = Date.now() - lastCheck.getTime();
			setElapsedTime(Math.floor(result / 1000));
		}
		loadTime();

		const interval = setInterval(loadTime, 1000);
		return () => {
			clearInterval(interval);
		};
	}, [lastCheck]);

	return elapsedTime;
}
