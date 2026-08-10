import styles from "./ActionButton.module.css";

interface ButtonProps {
	text: string;
	onClick?: () => void;
	type?: "button" | "submit";
	disabled?: boolean;
}

function ActionButton({
	text,
	onClick,
	type = "button",
	disabled,
}: ButtonProps) {
	return (
		<button
			className={styles.actionButton}
			onClick={onClick}
			type={type}
			disabled={disabled}
		>
			{text}
		</button>
	);
}
export default ActionButton;
