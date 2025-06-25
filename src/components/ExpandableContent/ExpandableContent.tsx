import { useRef, useState, useEffect } from "react";
import { formatMarkdown } from "@/utils/formatMarkdown";
import styles from "./ExpandableContent.module.css";
import { useTranslation } from "react-i18next";

interface Props {
  text: string;
  clampLines?: number;
  onChange?: (isExpanded: boolean) => void;
}

export const ExpandableContent = ({
  text,
  clampLines = 2,
  onChange,
}: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const expandedRef = useRef<HTMLDivElement>(null);
  const clampedRef = useRef<HTMLDivElement>(null);
  const [heights, setHeights] = useState({ clamped: "auto", expanded: "auto" });
  const html = formatMarkdown(text);
  const { t } = useTranslation();

  const handleChange = () => {
    if (onChange) {
      onChange(!isExpanded);
    }
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (expandedRef.current && clampedRef.current) {
      setHeights({
        clamped: `${clampedRef.current.scrollHeight}px`,
        expanded: `${expandedRef.current.scrollHeight}px`,
      });
    }
  }, [clampLines, html]);

  const clampedStyle = {
    display: "-webkit-box",
    WebkitLineClamp: clampLines,
    WebkitBoxOrient: "vertical" as const,
    overflow: "hidden" as const,
  };

  const ContentBlock = ({ clamped }: { clamped?: boolean }) => (
    <div
      className={clamped ? styles.clampedContent : styles.expandedContent}
      style={clamped ? clampedStyle : undefined}
    >
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );

  return (
    <div className={styles.expendableWrapper}>
      <div ref={clampedRef} className={styles.measurements}>
        <ContentBlock clamped />
      </div>
      <div ref={expandedRef} className={styles.measurements}>
        <ContentBlock />
      </div>

      {/* Actual content */}
      <div
        className={styles.expandableContent}
        style={{
          height: isExpanded ? heights.expanded : heights.clamped,
        }}
      >
        <ContentBlock clamped={!isExpanded} />
      </div>
      <button
        style={{ marginTop: "1rem" }}
        onClick={handleChange}
        className={styles.learnMoreButton}
      >
        {isExpanded ? t("common.button.less") : t("common.button.more")}
      </button>
    </div>
  );
};
