import styles from "./InfoCard.module.css";

interface InfoCardProps {
	title: string;
	text: string;
	color: "orange" | "purple" | "white";
}

const colorClasses = {
	orange: styles.orange,
	purple: styles.purple,
	white: styles.white,
};

function InfoCard({ title, text, color }: InfoCardProps) {
	return (
		<div className={`${styles.container} ${colorClasses[color]}`}>
			<p className={styles.title}>{title}</p>
			<p className={styles.text}>{text}</p>
		</div>
	);
}

export default InfoCard;
