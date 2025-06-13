import { useState, useRef, useEffect, MouseEvent } from "react";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import styles from "./Gallery.module.css";
import { images } from "@/data/images";

export default function Gallery() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStartLeft, setScrollStartLeft] = useState(0);

  const [modalImage, setModalImage] = useState<string | null>(null);

  const extendedImages = [...images, ...images, ...images];

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollLeft = Math.floor(container.scrollWidth / 3);
    }
  }, []);

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
    if ((e.target as HTMLElement).tagName === "IMG") return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollStartLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseUpOrLeave = () => setIsDragging(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
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

  const openModal = (src: string) => setModalImage(src);
  const closeModal = () => setModalImage(null);

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
              src={image.src}
              alt={`Gallery image ${index + 1}`}
              className={styles.image}
              draggable="false"
              onClick={() => openModal(image.src)}
              style={{ pointerEvents: "auto" }}
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

      {modalImage && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <img
            src={modalImage}
            alt="Full screen"
            className={styles.modalImage}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className={styles.closeButton}
            onClick={closeModal}
            aria-label="Close"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
