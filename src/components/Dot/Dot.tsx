import styles from "./Dot.module.css";

interface DotProps {
	color: "easy" | "medium" | "hard" | "guest" | "host";
	size: "small" | "medium";
}

const sizeClasses = {
	small: styles.sizeSmall,
	medium: styles.sizeMedium,
};

function Dot({ color, size }: DotProps) {
	return (
		<span
			className={`${styles.buttonBadge} ${styles[color]} ${sizeClasses[size]}`}
		/>
	);
}

export default Dot;
