import { useState, useRef, useEffect, MouseEvent, useCallback } from "react";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import styles from "./Gallery.module.css";
import { images } from "@/data/images";
import Popup from "@/components/Popup/Popup";
import { Button } from "@/components/Button/Button";

export default function Gallery() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStartLeft, setScrollStartLeft] = useState(0);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const extendedImages = [...images, ...images, ...images];

  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container || isScrolling) return;

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const third = scrollWidth / 3;

      if (scrollLeft >= third * 2 - 50) {
        container.scrollLeft = scrollLeft - third;
      } else if (scrollLeft <= third - clientWidth + 50) {
        container.scrollLeft = scrollLeft + third;
      }
    }, 150);
  }, [isScrolling]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollLeft = Math.floor(container.scrollWidth / 3);
    }
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      container.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [handleScroll]);

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

  const scrollByDirection = useCallback((direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;

    setIsScrolling(true);

    const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;

    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });

    setTimeout(() => {
      setIsScrolling(false);
    }, 600);
  }, []);

  const openModal = (src: string) => setModalImage(src);
  const closeModal = () => setModalImage(null);

  return (
    <div className={styles.galleryContainer}>
      <Button onClick={() => scrollByDirection("left")}>
        <LuArrowLeft size={40} />
      </Button>

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
          <div key={`${image.src}-${index}`} className={styles.imageContainer}>
            <img
              src={image.src}
              alt={`Gallery image ${index + 1}`}
              className={styles.image}
              draggable="false"
              onClick={() => openModal(image.src)}
              style={{ pointerEvents: "auto" }}
              loading="lazy"
            />
          </div>
        ))}
      </div>

      <Button onClick={() => scrollByDirection("right")}>
        <LuArrowRight size={40} />
      </Button>

      {modalImage && (
        <Popup onClose={closeModal} fullScreenContent noScroll>
          <img
            src={modalImage}
            alt="Full screen"
            style={{
              height: "100%",
              objectFit: "contain",
              borderRadius: "10px",
            }}
          />
        </Popup>
      )}
    </div>
  );
}
