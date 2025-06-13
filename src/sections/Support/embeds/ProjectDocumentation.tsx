import React from "react";
import { useTranslation } from "react-i18next";
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
            t("support.options.donate.aboutProject.description")
          ),
        }}
      />
    </Popup>
  );
};

export default ProjectDocumentation;
