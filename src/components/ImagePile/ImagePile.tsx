import { useState, CSSProperties } from "react";
import styles from "./ImagePile.module.css";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import { Button } from "../Button/Button";

interface ImagePileProps {
  images: string[];
  className?: string;
}

const ImagePile: React.FC<ImagePileProps> = ({ images, className = "" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev" | "none">("none");
  const [isHovered, setIsHovered] = useState(false);

  if (!images || images.length === 0) {
    return (
      <div className={`${styles.gallery} ${className}`}>
        No images available
      </div>
    );
  }

  const animationDuration = 500;

  const handleNavigation = (navDirection: "next" | "prev") => {
    if (isAnimating) return;

    setIsAnimating(true);
    setDirection(navDirection);

    setTimeout(() => {
      if (navDirection === "next") {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      } else {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      }
      setTimeout(() => {
        setDirection("none");
        setIsAnimating(false);
      }, 0);
    }, animationDuration);
  };

  const getStyleForIndex = (index: number): CSSProperties => {
    const pos = (index - currentIndex + images.length) % images.length;

    let style: CSSProperties = {
      transform: "rotate(0deg) translateY(0px) translateX(0px) scale(0.8)",
      opacity: 0,
      zIndex: 0,
    };

    switch (pos) {
      case 0: // Front card
        style = {
          transform: "rotate(0deg) translateY(0px) translateX(0px) scale(1)",
          opacity: 1,
          zIndex: 3,
        };
        break;

      case 1: // Right card
        style = {
          transform: isHovered
            ? "rotate(10deg) translateY(6px) translateX(2px) scale(1)"
            : "rotate(12deg) translateY(6px) translateX(4px) scale(0.98)",
          opacity: 1,
          zIndex: 2,
        };
        break;

      case 2: // Left card
        style = {
          transform: isHovered
            ? "rotate(-6deg) translateY(2px) translateX(-4px) scale(1)"
            : "rotate(-8deg) translateY(4px) translateX(-2px) scale(0.99)",
          opacity: 1,
          zIndex: 1,
        };
        break;
    }

    if (isAnimating && index === currentIndex) {
      if (direction === "next") {
        style.transform =
          "rotate(25deg) translateY(-80px) translateX(120px) scale(0.9)";
        style.opacity = 0;
      } else {
        style.transform =
          "rotate(-8deg) translateY(4px) translateX(-2px) scale(0.9)";
        style.zIndex = 1;
      }
    }

    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    if (isAnimating && direction === "prev" && index === prevIndex) {
      style.transform = "rotate(0deg) translateY(0px) translateX(0px) scale(1)";
      style.opacity = 1;
      style.zIndex = 4;
    }

    return style;
  };

  const arrowStyle = (side: "left" | "right"): React.CSSProperties => ({
    position: "absolute",
    top: "50%",
    [side]: "20px",
    zIndex: 10,
    width: "2rem",
    height: "2rem",
    padding: "0.3rem",
    borderRadius: "50%",
    border: "none",
    opacity: 0.7,
  });

  return (
    <div
      className={`${styles.gallery} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.imageStack}>
        {images.map((src, index) => (
          <img
            key={src}
            src={src}
            alt={`ImagePile image ${index + 1}`}
            className={`${styles.stackedImage} ${
              (index - currentIndex + images.length) % images.length === 0
                ? styles.front
                : (index - currentIndex + images.length) % images.length === 1
                ? styles.backRight
                : (index - currentIndex + images.length) % images.length === 2
                ? styles.backLeft
                : ""
            }`}
            style={{
              ...getStyleForIndex(index),
              transitionDuration: `${animationDuration}ms`,
            }}
          />
        ))}
      </div>

      {images.length > 1 && (
        <>
          <Button
            variant="outlined"
            style={arrowStyle("left")}
            onClick={() => handleNavigation("prev")}
            disabled={isAnimating}
          >
            <LuArrowLeft size={40} />
          </Button>
          <Button
            variant="outlined"
            style={arrowStyle("right")}
            onClick={() => handleNavigation("next")}
            disabled={isAnimating}
          >
            <LuArrowRight size={40} />
          </Button>
        </>
      )}
    </div>
  );
};

export default ImagePile;
