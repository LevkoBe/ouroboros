import { useState, useRef, useEffect, useCallback, MouseEvent } from "react";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import styles from "./Gallery.module.css";
import { imageSrcs as images } from "@/data/images";
import Popup from "@/components/Popup/Popup";
import { Button } from "@/components/Button/Button";

export default function Gallery() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [isDragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, scroll: 0 });
  const [isInitialized, setIsInitialized] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  const extended = [...images, ...images, ...images];
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el || !isInitialized) return;

    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

    scrollTimeout.current = setTimeout(() => {
      const third = el.scrollWidth / 3;
      const { scrollLeft, clientWidth } = el;

      if (scrollLeft >= third * 2 - clientWidth / 2) {
        el.scrollTo({ left: scrollLeft - third, behavior: "auto" });
      } else if (scrollLeft <= third - clientWidth / 2) {
        el.scrollTo({ left: scrollLeft + third, behavior: "auto" });
      }
    }, 100);
  }, [isInitialized]);

  const totalImages = extended.length;

  const disableSmoothScroll = () => {
    if (scrollRef.current) {
      scrollRef.current.style.scrollBehavior = "auto";
    }
  };

  const enableSmoothScroll = () => {
    if (scrollRef.current) {
      scrollRef.current.style.scrollBehavior = "smooth";
    }
  };

  const initializeScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    disableSmoothScroll();

    requestAnimationFrame(() => {
      const third = el.scrollWidth / 3;
      if (third > 0) {
        el.scrollLeft = third;
        requestAnimationFrame(() => {
          enableSmoothScroll();
          setIsInitialized(true);
        });
      }
    });
  }, []);

  const handleImageLoad = () => {
    setImagesLoaded((prev) => prev + 1);
  };

  useEffect(() => {
    if (imagesLoaded === totalImages) {
      initializeScroll();
    }
  }, [imagesLoaded, totalImages, initializeScroll]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      el.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [handleScroll]);

  const onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current || (e.target as HTMLElement).tagName === "IMG")
      return;

    setDragging(true);
    setDragStart({
      x: e.pageX - scrollRef.current.offsetLeft,
      scroll: scrollRef.current.scrollLeft,
    });
  };

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();

    const delta = (e.pageX - scrollRef.current.offsetLeft - dragStart.x) * 2;
    scrollRef.current.scrollLeft = dragStart.scroll - delta;
  };

  const scrollBy = useCallback((dir: "left" | "right") => {
    if (!scrollRef.current) return;

    const container = scrollRef.current;
    const imageContainers = container.querySelectorAll(
      `.${styles.imageContainer}`
    );
    if (imageContainers.length === 0) return;

    const currentScroll = container.scrollLeft;
    const containerCenter = currentScroll + container.clientWidth / 2;

    let targetImageIndex = -1;
    for (let i = 0; i < imageContainers.length; i++) {
      const img = imageContainers[i] as HTMLElement;
      const imgLeft = img.offsetLeft;
      const imgRight = imgLeft + img.offsetWidth;

      if (containerCenter >= imgLeft && containerCenter <= imgRight) {
        targetImageIndex = i;
        break;
      }
    }

    if (targetImageIndex === -1) {
      let minDistance = Infinity;
      for (let i = 0; i < imageContainers.length; i++) {
        const img = imageContainers[i] as HTMLElement;
        const imgCenter = img.offsetLeft + img.offsetWidth / 2;
        const distance = Math.abs(containerCenter - imgCenter);
        if (distance < minDistance) {
          minDistance = distance;
          targetImageIndex = i;
        }
      }
    }

    const nextIndex =
      dir === "right"
        ? Math.min(targetImageIndex + 1, imageContainers.length - 1)
        : Math.max(targetImageIndex - 1, 0);

    const nextImage = imageContainers[nextIndex] as HTMLElement;
    const nextImageCenter = nextImage.offsetLeft + nextImage.offsetWidth / 2;
    const scrollToPosition = nextImageCenter - container.clientWidth / 2;

    container.scrollTo({
      left: scrollToPosition,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className={styles.galleryContainer}>
      <Button
        variant="outlined"
        style={arrowStyle("left")}
        onClick={() => scrollBy("left")}
      >
        <LuArrowLeft size={40} />
      </Button>

      <div
        ref={scrollRef}
        className={`${styles.scrollContainer} ${
          isDragging ? styles.grabbing : ""
        }`}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={() => setDragging(false)}
        onMouseLeave={() => setDragging(false)}
      >
        {extended.map((img, i) => (
          <div key={`${img}-${i}`} className={styles.imageContainer}>
            <img
              src={img}
              alt={`Gallery image ${i + 1}`}
              className={styles.image}
              draggable={false}
              onClick={() => setModalImage(img)}
              onLoad={handleImageLoad}
              loading="lazy"
              style={{ pointerEvents: "auto" }}
            />
          </div>
        ))}
      </div>

      <Button
        variant="outlined"
        style={arrowStyle("right")}
        onClick={() => scrollBy("right")}
      >
        <LuArrowRight size={40} />
      </Button>

      {modalImage && (
        <Popup onClose={() => setModalImage(null)} fullScreenContent noScroll>
          <img
            src={modalImage}
            alt="Full screen"
            className={styles.popupImage}
          />
        </Popup>
      )}
    </div>
  );
}

const arrowStyle = (side: "left" | "right"): React.CSSProperties => ({
  position: "absolute",
  top: "50%",
  [side]: "20px",
  zIndex: 1,
  width: "2rem",
  height: "2rem",
  padding: "0.3rem",
  borderRadius: "50%",
  border: "none",
  opacity: 0.7,
});
