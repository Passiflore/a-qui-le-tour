import styles from "./NameTag.module.css";

interface NameTagProps {
	firstName: string;
	color?: "orange" | "white";
}

function NameTag({ firstName, color = "orange" }: NameTagProps) {
	const colorClasses = {
		orange: styles.orange,
		white: styles.white,
	};

	return (
		<div className={`${styles.inviteBadge} ${colorClasses[color]}`}>
			<span className={styles.orangeCircle} />
			<span className={styles.userName}>{firstName}</span>
		</div>
	);
}
export default NameTag;
