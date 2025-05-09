import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styles from "./Projects.module.css";
import { useProjects } from "@/hooks/useProjects";

const MIN_CARD_WIDTH = 250;
const GAP = 16;

const Projects: React.FC = () => {
  const { t } = useTranslation();
  const projects = useProjects();

  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );
  const [expandedStyle, setExpandedStyle] =
    useState<React.CSSProperties | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({});
  const [, setAllImagesLoaded] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleImageLoad = (projectId: string) => {
    setImagesLoaded((prev) => ({
      ...prev,
      [projectId]: true,
    }));
  };

  useEffect(() => {
    if (
      projects.length > 0 &&
      Object.keys(imagesLoaded).length === projects.length
    ) {
      const allLoaded = Object.values(imagesLoaded).every((loaded) => loaded);
      if (allLoaded) {
        setAllImagesLoaded(true);
      }
    }
  }, [imagesLoaded, projects]);

  const calculateGridColumns = () => {
    if (!containerRef.current) return 1;
    const containerWidth = containerRef.current.offsetWidth;
    return Math.max(1, Math.floor(containerWidth / (MIN_CARD_WIDTH + GAP)));
  };

  const toggleProject = (projectId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    const card = cardRefs.current[projectId];

    if (selectedProjectId === projectId) {
      setSelectedProjectId(null);
      setExpandedStyle(null);
    } else if (card) {
      const rect = card.getBoundingClientRect();

      const initial = {
        position: "fixed" as const,
        top: rect.top,
        left: rect.left,
        width: rect.width,
        zIndex: 999,
        transition: "all 0.5s ease",
      };

      setExpandedStyle(initial);
      setSelectedProjectId(projectId);
    }
  };
  useEffect(() => {
    if (!containerRef.current) return;

    const updateGridColumns = () => {
      const columns = calculateGridColumns();
      containerRef.current?.style.setProperty(
        "--grid-columns",
        String(Math.min(columns, projects.length))
      );
    };

    const handleResize = () => {
      updateGridColumns();

      if (selectedProjectId && expandedStyle) {
        const card = cardRefs.current[selectedProjectId];
        if (card) {
          const targetWidth =
            window.innerWidth < 768
              ? window.innerWidth * 0.9
              : window.innerWidth < 1200
              ? window.innerWidth * 0.7
              : Math.min(window.innerWidth * 0.6, 1200);

          const targetHeight = window.innerHeight * 0.7;
          const top = Math.max(20, (window.innerHeight - targetHeight) / 2);
          const left = (window.innerWidth - targetWidth) / 2;

          setExpandedStyle((prev) => ({
            ...prev!,
            top: `${top}px`,
            left: `${left}px`,
            width: `${targetWidth}px`,
            maxHeight: `${targetHeight}px`,
          }));
        }
      }
    };

    const observer = new ResizeObserver(handleResize);
    observer.observe(containerRef.current);
    window.addEventListener("resize", handleResize);
    updateGridColumns();

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, [projects.length, selectedProjectId, expandedStyle]);

  return (
    <section>
      <h1>{t("projects.title")}</h1>

      <div ref={containerRef} className={styles.projectsGrid}>
        {projects.map((project) => {
          const isExpanded = selectedProjectId === project.id;

          return (
            <div
              key={project.id}
              ref={(el) => {
                cardRefs.current[project.id] = el;
              }}
              className={`${styles.projectCard} ${
                isExpanded ? styles.expanded : ""
              }`}
              style={isExpanded && expandedStyle ? expandedStyle : undefined}
              onClick={(e) => toggleProject(project.id, e)}
            >
              <div
                className={styles.cardContent}
                style={{
                  display: "flex",
                  flexDirection: isExpanded ? "row" : "column",
                }}
              >
                <img
                  src={project.imageSrc}
                  alt={project.title}
                  onLoad={() => handleImageLoad(project.id)}
                  className={styles.projectImage}
                />
                {isExpanded ? (
                  <div className={styles.descriptionContainer}>
                    <h2>{project.title}</h2>
                    <p>{project.description}</p>
                    <button className={styles.closeButton}>✕</button>
                  </div>
                ) : (
                  <div className={styles.descriptionContainer}>
                    <h3>{project.title}</h3>
                    <p className={styles.projectDescription}>
                      {project.description}
                    </p>
                    <button>{t("common.button.more")}</button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {selectedProjectId && <div className={styles.overlay} />}
    </section>
  );
};

export default Projects;
