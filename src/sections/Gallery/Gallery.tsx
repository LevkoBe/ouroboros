import { useState, useRef, useEffect, useMemo, MouseEvent } from "react";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import styles from "./Gallery.module.css";
import { images } from "@/data/images";
import { useTranslation } from "react-i18next";

export default function Gallery() {
  const { t } = useTranslation();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStartLeft, setScrollStartLeft] = useState(0);

  const imagesSet = useMemo(
    () =>
      images.map((image) => ({
        url: image.src,
        alt: t(image.altKey),
      })),
    [t]
  );

  const extendedImages = useMemo(
    () => [...imagesSet, ...imagesSet, ...imagesSet],
    [imagesSet]
  );

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container && extendedImages.length) {
      container.scrollLeft = Math.floor(container.scrollWidth / 3);
    }
  }, [extendedImages.length]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const { scrollLeft, scrollWidth, clientWidth } = container;
          const third = scrollWidth / 3;

          if (scrollLeft >= third * 2) {
            container.scrollLeft = scrollLeft - third;
          } else if (scrollLeft <= third - clientWidth) {
            container.scrollLeft = scrollLeft + third;
          }

          ticking = false;
        });

        ticking = true;
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollStartLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseUpOrLeave = () => setIsDragging(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // speed factor
    scrollContainerRef.current.scrollLeft = scrollStartLeft - walk;
  };

  const scrollByDirection = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className={styles.galleryContainer}>
      <button
        className={`${styles.arrow} ${styles.leftArrow}`}
        onClick={() => scrollByDirection("left")}
      >
        <LuArrowLeft size={40} />
      </button>

      <div
        ref={scrollContainerRef}
        className={`${styles.scrollContainer} ${
          isDragging ? styles.grabbing : ""
        }`}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseUpOrLeave}
        onMouseUp={handleMouseUpOrLeave}
        onMouseMove={handleMouseMove}
      >
        {extendedImages.map((image, index) => (
          <div key={index} className={styles.imageContainer}>
            <img
              src={image.url}
              alt={image.alt}
              className={styles.image}
              draggable="false"
            />
          </div>
        ))}
      </div>

      <button
        className={`${styles.arrow} ${styles.rightArrow}`}
        onClick={() => scrollByDirection("right")}
      >
        <LuArrowRight size={40} />
      </button>
    </div>
  );
}
