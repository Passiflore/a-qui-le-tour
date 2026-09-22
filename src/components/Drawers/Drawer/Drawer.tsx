import styles from "./Drawer.module.css";
import CrossIcon from "../../Icons/CrossIcon";
import { useEffect, useRef } from "react";

interface DrawerProps {
	isOpen: boolean;
	onClose: () => void;
	title?: string;
	children: React.ReactNode;
	hero?: React.ReactNode;
	isPopup?: boolean;
}

function Drawer({
	isOpen,
	onClose,
	title,
	children,
	hero,
	isPopup,
}: DrawerProps) {
	const drawerRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		if (isOpen) drawerRef.current?.showModal();
		else drawerRef.current?.close();
	}, [isOpen]);

	return (
		<dialog
			className={`${styles.drawerDialog} ${isPopup ? styles.popup : ""}`}
			ref={drawerRef}
			onClose={onClose}
			onClick={(e) => {
				if (e.target === drawerRef.current) onClose();
			}}
		>
			<div className={styles.drawerContainer}>
				<div className={styles.heroContainer}>
					{hero ? <>{hero}</> : <h2 className={styles.drawerTitle}>{title}</h2>}

					<button
						className={styles.closeButton}
						aria-label="Fermer"
						onClick={onClose}
					>
						<CrossIcon />
					</button>
				</div>

				{children}
			</div>
		</dialog>
	);
}

export default Drawer;
