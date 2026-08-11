import styles from "./ActionButton.module.css";

interface ButtonProps {
	text: string;
	onClick?: () => void;
	type?: "button" | "submit";
	disabled?: boolean;
	color?: "orange" | "purple" | "white";
}

function ActionButton({
	text,
	onClick,
	type = "button",
	disabled,
	color = "orange",
}: ButtonProps) {
	const colorClasses = {
		orange: styles.orange,
		purple: styles.purple,
		white: styles.white,
	};

	return (
		<button
			className={`${styles.actionButton} ${colorClasses[color]}`}
			onClick={onClick}
			type={type}
			disabled={disabled}
		>
			{text}
		</button>
	);
}
export default ActionButton;
