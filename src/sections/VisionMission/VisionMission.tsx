import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styles from "./VisionMission.module.css";
import { useFutureProjects } from "@/hooks/useFutureProjects";

const renderRichText = (text: string) => {
  const blocks = text.split(/\n+/);

  return blocks.map((block, index) => {
    if (block.trim().startsWith("-")) {
      const items = block
        .split("\n")
        .filter((line) => line.startsWith("-"))
        .map((item, idx) => <li key={idx}>{item.slice(1).trim()}</li>);
      return (
        <ul key={index} style={{ marginBottom: "5px" }}>
          {items}
        </ul>
      );
    } else {
      return <p key={index}>{block}</p>;
    }
  });
};

interface ExpandableContentProps {
  children: React.ReactNode;
  isExpanded: boolean;
  clampLines?: number;
}

const ExpandableContent = ({
  children,
  isExpanded,
  clampLines = 2,
}: ExpandableContentProps) => {
  const expandedRef = useRef<HTMLDivElement>(null);
  const clampedRef = useRef<HTMLDivElement>(null);
  const [heights, setHeights] = useState({ clamped: "auto", expanded: "auto" });

  useEffect(() => {
    if (expandedRef.current && clampedRef.current) {
      const expandedHeight = expandedRef.current.scrollHeight;
      const clampedHeight = clampedRef.current.scrollHeight;

      setHeights({
        clamped: `${clampedHeight}px`,
        expanded: `${expandedHeight}px`,
      });
    }
  }, [children, clampLines]);

  const currentHeight = isExpanded ? heights.expanded : heights.clamped;

  return (
    <div className={styles.expandableWrapper}>
      {/* Hidden elements for measurement */}
      <div
        ref={clampedRef}
        className={styles.measurementElement}
        style={{
          position: "absolute",
          visibility: "hidden",
          height: "auto",
          width: "100%",
        }}
      >
        <div
          className={styles.clampedContent}
          style={{
            display: "-webkit-box",
            WebkitLineClamp: clampLines,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {children}
        </div>
      </div>

      <div
        ref={expandedRef}
        className={styles.measurementElement}
        style={{
          position: "absolute",
          visibility: "hidden",
          height: "auto",
          width: "100%",
        }}
      >
        {children}
      </div>

      {/* Actual visible content */}
      <div
        className={styles.expandableContent}
        style={{
          height: currentHeight,
          transition: "height 1s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div
          className={
            isExpanded ? styles.expandedContent : styles.clampedContent
          }
          style={
            !isExpanded
              ? {
                  display: "-webkit-box",
                  WebkitLineClamp: clampLines,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }
              : {}
          }
        >
          {children}
        </div>
      </div>
    </div>
  );
};

const VisionMission = () => {
  const { t } = useTranslation();
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});
  const futureProjects = useFutureProjects();

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <section>
      <h1>{t("visionMission.title")}</h1>

      <div className={styles.contentContainer}>
        <div className={styles.textContainer}>
          {/* Vision Section */}
          <div className={styles.sectionContainer}>
            <h2>{t("visionMission.vision.title")}</h2>
            <div>
              <div
                className={`${styles.mainText} ${
                  !expandedSections.vision ? styles.visible : styles.hidden
                }`}
              >
                {t("visionMission.vision.mainText")}
              </div>

              <div
                className={`${styles.extendedText} ${
                  expandedSections.vision ? styles.visible : styles.hidden
                }`}
              >
                {t("visionMission.vision.extendedText")}
              </div>
            </div>

            <button
              onClick={() => toggleSection("vision")}
              className={styles.learnMoreButton}
            >
              {expandedSections.vision
                ? t("common.button.less")
                : t("common.button.more")}
            </button>
          </div>

          {/* Mission Section */}
          <div className={styles.sectionContainer}>
            <h2>{t("visionMission.mission.title")}</h2>
            <div>
              <div
                className={`${styles.mainText} ${
                  !expandedSections.mission ? styles.visible : styles.hidden
                }`}
              >
                {t("visionMission.mission.mainText")}
              </div>

              <div
                className={`${styles.extendedText} ${
                  expandedSections.mission ? styles.visible : styles.hidden
                }`}
              >
                {t("visionMission.mission.extendedText")}
              </div>
            </div>

            <button
              onClick={() => toggleSection("mission")}
              className={styles.learnMoreButton}
            >
              {expandedSections.mission
                ? t("common.button.less")
                : t("common.button.more")}
            </button>
          </div>

          {/* Future Projects */}
          <div className={styles.sectionContainer}>
            <h2>{t("visionMission.futureProjects.title")}</h2>

            {futureProjects.map((project) => (
              <div key={project.id} className={styles.projectItem}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <ExpandableContent
                  isExpanded={expandedSections[project.id]}
                  clampLines={2} // Show 2 complete lines when collapsed
                >
                  <div className={styles.projectDescription}>
                    {renderRichText(project.description)}
                  </div>
                </ExpandableContent>
                <button
                  onClick={() => toggleSection(project.id)}
                  className={styles.learnMoreButton}
                >
                  {expandedSections[project.id]
                    ? t("common.button.less")
                    : t("common.button.more")}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.imageContainer}>
          <img
            src={t("visionMission.image.src")}
            alt={t("visionMission.image.altKey")}
            className={styles.image}
          />
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
