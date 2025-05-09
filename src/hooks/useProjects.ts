import { useMemo } from "react";
import { useTranslation } from "react-i18next";

export interface ProjectData {
  id: string;
  title: string;
  imageSrc: string;
  description: string;
}

export const useProjects = (): ProjectData[] => {
  const { t } = useTranslation();

  return useMemo(
    () => [
      {
        id: "project1",
        title: t("projects.project1.title"),
        description: t("projects.project1.description"),
        imageSrc: t("projects.project1.imageSrc"),
      },
      {
        id: "project2",
        title: t("projects.project2.title"),
        description: t("projects.project2.description"),
        imageSrc: t("projects.project2.imageSrc"),
      },
      {
        id: "project3",
        title: t("projects.project3.title"),
        description: t("projects.project3.description"),
        imageSrc: t("projects.project3.imageSrc"),
      },
    ],
    [t]
  );
};
