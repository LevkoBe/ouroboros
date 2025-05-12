import { useState, useRef, useEffect, useMemo, MouseEvent } from "react";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import styles from "./Partners.module.css";
import { useTranslation } from "react-i18next";
import { usePartners } from "@/hooks/usePartners";

export default function Partners() {
  const { t } = useTranslation();
  const partners = usePartners();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStartLeft, setScrollStartLeft] = useState(0);

  const extendedPartners = useMemo(
    () => (partners.length > 0 ? [...partners, ...partners, ...partners] : []),
    [partners]
  );

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container && extendedPartners.length && partners.length > 0) {
      container.scrollLeft = Math.floor(container.scrollWidth / 3);
    }
  }, [extendedPartners.length, partners.length]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || partners.length === 0) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const { scrollLeft, scrollWidth, clientWidth } = container;
          const oneThird = scrollWidth / 3;

          if (scrollLeft >= oneThird * 2 - 10) {
            container.scrollLeft = scrollLeft - oneThird;
          } else if (
            scrollLeft <= oneThird - clientWidth + 10 &&
            scrollLeft > 0
          ) {
            container.scrollLeft = scrollLeft + oneThird;
          } else if (scrollLeft === 0 && oneThird > clientWidth) {
            if (container.scrollLeft < oneThird - clientWidth + 10) {
              container.scrollLeft = container.scrollLeft + oneThird;
            }
          }

          ticking = false;
        });

        ticking = true;
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [partners.length]);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollStartLeft(scrollContainerRef.current.scrollLeft);
    scrollContainerRef.current.classList.add(styles.grabbing);
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.classList.remove(styles.grabbing);
    }
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollContainerRef.current.scrollLeft = scrollStartLeft - walk;
  };

  const scrollByDirection = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const cardWidthPercentage = 0.35;
    const scrollAmount =
      scrollContainerRef.current.clientWidth * cardWidthPercentage;
    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (partners.length === 0) {
    return (
      <div className={styles.partnersContainer}>
        <p>{t("partners.loadingOrNoPartners")}</p>
      </div>
    );
  }

  return (
    <div className={styles.partnersSection}>
      <h2 className={styles.sectionTitle}>
        {t("partners.title", "Our Partners")}
      </h2>
      <div className={styles.partnersContainer}>
        <button
          className={`${styles.arrow} ${styles.leftArrow}`}
          onClick={() => scrollByDirection("left")}
          aria-label={t("partners.scrollLeft", "Scroll left")}
        >
          <LuArrowLeft size={30} />
        </button>

        <div
          ref={scrollContainerRef}
          className={styles.scrollContainer}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseUpOrLeave}
          onMouseUp={handleMouseUpOrLeave}
          onMouseMove={handleMouseMove}
        >
          {extendedPartners.map((partner, index) => (
            <div key={`${partner.id}-${index}`} className={styles.partnerCard}>
              <blockquote className={styles.description}>
                {partner.description}
              </blockquote>
              <div className={styles.cardBottomBar}>
                <img
                  src={partner.imageSrc}
                  alt={partner.name}
                  className={styles.partnerImage}
                  draggable="false"
                />
                <div className={styles.partnerInfo}>
                  <h5>{partner.name}</h5>
                  <p className={styles.partnerDescription}>{partner.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          className={`${styles.arrow} ${styles.rightArrow}`}
          onClick={() => scrollByDirection("right")}
          aria-label={t("partners.scrollRight", "Scroll right")}
        >
          <LuArrowRight size={30} />
        </button>
      </div>
    </div>
  );
}
