import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import styles from "./Projects.module.css";
import { useProjects } from "@/hooks/useProjects";
import { Button } from "@/components/Button/Button";
import Popup from "@/components/Popup/Popup";
import Gallery from "@/components/ImagePile/ImagePile";
import { artworkImgSrcs } from "@/data/images";

const MIN_CARD_WIDTH = 250;
const GAP = 16;

const Projects: React.FC = () => {
  const { t } = useTranslation();
  const projects = useProjects();

  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );
  const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({});
  const [, setAllImagesLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleImageLoad = (projectId: string) => {
    setImagesLoaded((prev) => ({ ...prev, [projectId]: true }));
  };

  useEffect(() => {
    if (
      projects.length > 0 &&
      Object.keys(imagesLoaded).length === projects.length
    ) {
      const allLoaded = Object.values(imagesLoaded).every(Boolean);
      if (allLoaded) setAllImagesLoaded(true);
    }
  }, [imagesLoaded, projects]);

  const calculateGridColumns = () => {
    if (!containerRef.current) return 1;
    const containerWidth = containerRef.current.offsetWidth;
    return Math.max(1, Math.floor(containerWidth / (MIN_CARD_WIDTH + GAP)));
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

    const observer = new ResizeObserver(updateGridColumns);
    observer.observe(containerRef.current);
    window.addEventListener("resize", updateGridColumns);
    updateGridColumns();

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateGridColumns);
    };
  }, [projects.length]);

  const selectedProject = projects.find((p) => p.id === selectedProjectId);

  return (
    <section>
      <h1>{t("projects.title")}</h1>

      <div ref={containerRef} className={styles.projectsGrid}>
        {projects.map((project) => (
          <div
            key={project.id}
            className={styles.projectCard}
            onClick={() => setSelectedProjectId(project.id)}
          >
            <div className={styles.cardContent}>
              <img
                src={project.imageSrc}
                alt={project.title}
                onLoad={() => handleImageLoad(project.id)}
                className={styles.projectImage}
              />
              <div className={styles.descriptionContainer}>
                <h3>{project.title}</h3>
                <p className={styles.projectDescription}>
                  {project.description}
                </p>
                <Button>{t("common.button.more")}</Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedProject && (
        <Popup
          onClose={() => setSelectedProjectId(null)}
          title={selectedProject.title}
          noScroll
        >
          <div className={styles.cardContent} style={{ flexDirection: "row" }}>
            {selectedProjectId === projects[2].id ? (
              <Gallery
                images={artworkImgSrcs}
                className={styles.projectImage}
              />
            ) : (
              <img
                src={selectedProject.imageSrc}
                alt={selectedProject.title}
                className={styles.projectImage}
              />
            )}
            <div className={styles.descriptionContainer}>
              {selectedProject.description.split("\n").map((line, index) => (
                <div key={index} style={{ marginBottom: "0.5rem" }}>
                  {line}
                </div>
              ))}
            </div>
          </div>
        </Popup>
      )}
    </section>
  );
};

export default Projects;
