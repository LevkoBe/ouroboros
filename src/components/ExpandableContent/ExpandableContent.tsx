import { useRef, useState, useEffect } from "react";
import { formatMarkdown } from "@/utils/formatMarkdown";
import styles from "./ExpandableContent.module.css";
import { useTranslation } from "react-i18next";

interface Props {
  text: string;
  clampLines?: number;
}

export const ExpandableContent = ({ text, clampLines = 2 }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const expandedRef = useRef<HTMLDivElement>(null);
  const clampedRef = useRef<HTMLDivElement>(null);
  const [heights, setHeights] = useState({ clamped: "auto", expanded: "auto" });
  const html = formatMarkdown(text);
  const { t } = useTranslation();

  useEffect(() => {
    if (expandedRef.current && clampedRef.current) {
      setHeights({
        clamped: `${clampedRef.current.scrollHeight}px`,
        expanded: `${expandedRef.current.scrollHeight}px`,
      });
    }
  }, [clampLines, html]);

  const sharedHiddenStyle = {
    position: "absolute" as const,
    visibility: "hidden" as const,
    width: "100%",
  };

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
    <div className={styles.expandable}>
      <div className={styles.expandableWrapper}>
        <div
          ref={clampedRef}
          className={styles.measurementElement}
          style={sharedHiddenStyle}
        >
          <ContentBlock clamped />
        </div>
        <div
          ref={expandedRef}
          className={styles.measurementElement}
          style={sharedHiddenStyle}
        >
          <ContentBlock />
        </div>

        <div
          className={styles.expandableContent}
          style={{
            height: isExpanded ? heights.expanded : heights.clamped,
          }}
        >
          <ContentBlock clamped={!isExpanded} />
        </div>
      </div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={styles.learnMoreButton}
      >
        {isExpanded ? t("common.button.less") : t("common.button.more")}
      </button>
    </div>
  );
};
