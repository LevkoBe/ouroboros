import React, { useEffect, ReactNode } from "react";
import ReactDOM from "react-dom";
import styles from "./Popup.module.css";

type PopupProps = {
  onClose: () => void;
  title?: string;
  children: ReactNode;
  fullScreenContent?: boolean;
};

const Popup: React.FC<PopupProps> = ({
  onClose,
  title,
  children,
  fullScreenContent,
}) => {
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
      <div
        className={`${styles.popup} ${
          fullScreenContent ? styles.fullscreen : ""
        }`}
      >
        {!fullScreenContent && (
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        )}
        <div
          className={`${styles.scrollableContent} ${
            fullScreenContent ? styles.noScroll : ""
          }`}
        >
          {title && !fullScreenContent && (
            <h2 className={styles.title}>{title}</h2>
          )}
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Popup;
