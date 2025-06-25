import {
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
import { formatMarkdown } from "@/utils/formatMarkdown";
import styles from "./ExpandableContent.module.css";
import { useTranslation } from "react-i18next";
import { Button } from "../Button/Button";

interface Props {
  text: string;
  clampLines?: number;
  variant?: "primary" | "outlined" | "tertiary";
  onChange?: (isExpanded: boolean) => void;
}

export const ExpandableContent = ({
  text,
  clampLines = 2,
  variant = "outlined",
  onChange,
}: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const expandedRef = useRef<HTMLDivElement>(null);
  const clampedRef = useRef<HTMLDivElement>(null);
  const [heights, setHeights] = useState({ clamped: "auto", expanded: "auto" });
  const html = formatMarkdown(text);
  const { t } = useTranslation();

  const measureHeights = useCallback(() => {
    if (expandedRef.current && clampedRef.current) {
      const clampedHeight = clampedRef.current.scrollHeight;
      const expandedHeight = expandedRef.current.scrollHeight;

      setHeights({
        clamped: `${clampedHeight}px`,
        expanded: `${expandedHeight}px`,
      });
    }
  }, []);

  useLayoutEffect(() => {
    measureHeights();
  }, [clampLines, html, measureHeights]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      const timer = setTimeout(measureHeights, 50);
      return () => clearTimeout(timer);
    });

    if (expandedRef.current) {
      resizeObserver.observe(expandedRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [measureHeights]);

  const handleChange = () => {
    if (onChange) {
      onChange(!isExpanded);
    }
    setIsExpanded(!isExpanded);
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
    <div className={styles.expandableWrapper}>
      {/* Measurement containers */}
      <div ref={clampedRef} className={styles.measurements}>
        <ContentBlock clamped />
      </div>
      <div ref={expandedRef} className={styles.measurements}>
        <ContentBlock />
      </div>

      {/* Actual visible content */}
      <div
        className={styles.expandableContent}
        style={{
          height: isExpanded ? heights.expanded : heights.clamped,
        }}
      >
        <ContentBlock clamped={!isExpanded} />
      </div>

      <Button
        variant={variant}
        style={{ marginTop: "1rem" }}
        onClick={handleChange}
        className={styles.learnMoreButton}
      >
        {isExpanded ? t("common.button.less") : t("common.button.more")}
      </Button>
    </div>
  );
};
