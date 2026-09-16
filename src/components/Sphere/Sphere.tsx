import styles from "./Sphere.module.css";

interface SphereProps {
	color: "purple" | "orange";
}

function Sphere({ color }: SphereProps) {
	const colorClasses = {
		orange: styles.orange,
		purple: styles.purple,
	};
	return <div className={`${styles.sphere} ${colorClasses[color]}`} />;
}

export default Sphere;
