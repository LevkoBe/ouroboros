import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./ProjectDocumentation.module.css";
import Popup from "@/components/Popup/Popup";

type ProjectDocumentationProps = {
  onClose: () => void;
};

const ProjectDocumentation: React.FC<ProjectDocumentationProps> = ({
  onClose,
}) => {
  const { t } = useTranslation();

  function formatAboutText(markdown: string): string {
    const escapeHtml = (str: string): string =>
      str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const parseInline = (text: string): string => {
      return escapeHtml(text)
        .replace(
          /\*\*(.+?)\*\*/g,
          (_, m: string) => `<strong className={styles.strong}>${m}</strong>`
        )
        .replace(
          /\*(.+?)\*/g,
          (_, m: string) => `<em className={styles.em}>${m}</em>`
        )
        .replace(
          /`(.+?)`/g,
          (_, m: string) => `<code className={styles.code}>${m}</code>`
        );
    };

    const lines = markdown.split("\n");
    const output: string[] = [];
    let inList = false;

    for (const line of lines) {
      if (/^[-*] /.test(line)) {
        if (!inList) {
          output.push(`<ul class="${styles.ul}">`);
          inList = true;
        }
        output.push(
          `<li class="${styles.li}">${parseInline(line.slice(2))}</li>`
        );
      } else {
        if (inList) {
          output.push(`</ul>`);
          inList = false;
        }

        if (/^#{1,6} /.test(line)) {
          const level = line.match(/^#+/)?.[0].length || 1;
          const content = line.slice(level + 1);
          output.push(
            `<h${level} className={styles["h${level}"]}>${parseInline(
              content
            )}</h${level}>`
          );
        } else if (line.trim() !== "") {
          output.push(`<p className={styles.p}>${parseInline(line)}</p>`);
        } else {
          output.push(""); // preserve blank lines
        }
      }
    }

    if (inList) {
      output.push(`</ul>`); // Close list if it was open at the end
    }

    return output.join("\n");
  }

  return (
    <Popup
      onClose={onClose}
      title={t("support.options.donate.aboutProject.title")}
    >
      <div
        dangerouslySetInnerHTML={{
          __html: formatAboutText(
            t("support.options.donate.aboutProject.description")
          ),
        }}
      />
    </Popup>
  );
};

export default ProjectDocumentation;
