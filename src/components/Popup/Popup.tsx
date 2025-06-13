import React, { useEffect, ReactNode } from "react";
import ReactDOM from "react-dom";
import styles from "./Popup.module.css";

type PopupProps = {
  onClose: () => void;
  title?: string;
  children: ReactNode;
};

const Popup: React.FC<PopupProps> = ({ onClose, title, children }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return ReactDOM.createPortal(
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.popup}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <div className={styles.scrollableContent}>
          {title && <h2 className={styles.title}>{title}</h2>}
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Popup;
