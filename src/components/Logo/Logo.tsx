import styles from "./Logo.module.css";

function Logo() {
	return (
		<div className={styles.logoContainer} aria-hidden="true">
			<span className={styles.logoOrange} />
			<span className={styles.logoPurple} />
		</div>
	);
}
export default Logo;
