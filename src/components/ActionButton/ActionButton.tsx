import styles from "./ActionButton.module.css";

interface ButtonProps {
	text: string;
	onClick?: () => void;
	type?: "button" | "submit";
	disabled?: boolean;
	color?: "orange" | "purple" | "white";
	size?: "large" | "medium";
}

function ActionButton({
	text,
	onClick,
	type = "button",
	disabled,
	color = "orange",
	size = "large",
}: ButtonProps) {
	const colorClasses = {
		orange: styles.orange,
		purple: styles.purple,
		white: styles.white,
	};

	const sizeClasses = {
		medium: styles.medium,
		large: styles.large,
	};

	return (
		<button
			className={`${styles.actionButton} ${colorClasses[color]} ${sizeClasses[size]}`}
			onClick={onClick}
			type={type}
			disabled={disabled}
		>
			{text}
		</button>
	);
}
export default ActionButton;
