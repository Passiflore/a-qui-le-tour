import styles from "./SubjectCard.module.css";

interface SubjectCardProps {
	title: string;
	text: string;
}

function SubjectCard({ title, text }: SubjectCardProps) {
	return (
		<div className={styles.subjectContainer}>
			<p className={styles.subjectIntro}>{title}</p>
			<p className={styles.subjectText}>{text}</p>
		</div>
	);
}

export default SubjectCard;
