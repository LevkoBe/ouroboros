import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./ProjectDocumentation.module.css";
import Popup from "@/components/Popup/Popup";
import { formatMarkdown } from "@/utils/formatMarkdown";

type ProjectDocumentationProps = {
  onClose: () => void;
};

const ProjectDocumentation: React.FC<ProjectDocumentationProps> = ({
  onClose,
}) => {
  const { t } = useTranslation();

  return (
    <Popup
      onClose={onClose}
      title={t("support.options.donate.aboutProject.title")}
    >
      <div
        dangerouslySetInnerHTML={{
          __html: formatMarkdown(
            t("support.options.donate.aboutProject.description"),
            styles
          ),
        }}
      />
    </Popup>
  );
};

export default ProjectDocumentation;