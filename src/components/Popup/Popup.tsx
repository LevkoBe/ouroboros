import React, { useEffect, ReactNode } from "react";
import ReactDOM from "react-dom";
import styles from "./Popup.module.css";
import { Button } from "../Button/Button";

type PopupProps = {
  onClose: () => void;
  title?: string;
  children: ReactNode;
  fullScreenContent?: boolean;
  noScroll?: boolean;
};

const Popup: React.FC<PopupProps> = ({
  onClose,
  title,
  children,
  fullScreenContent,
  noScroll,
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
        <Button
          variant="outlined"
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            width: "2rem",
            height: "2rem",
            border: "none",
            fontSize: "2rem",
            zIndex: "10",
          }}
          onClick={onClose}
        >
          ×
        </Button>
        <div
          className={`${styles.scrollableContent} ${
            noScroll ? styles.noScroll : ""
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
