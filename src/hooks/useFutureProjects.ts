import { useMemo } from "react";
import { useTranslation } from "react-i18next";

export interface FutureProjectData {
  id: string;
  title: string;
  description: string;
}

export const useFutureProjects = (): FutureProjectData[] => {
  const { t } = useTranslation();

  return useMemo(
    () => [
      {
        id: "project1",
        title: t("visionMission.futureProjects.project1.title"),
        description: t("visionMission.futureProjects.project1.description"),
      },
      {
        id: "project2",
        title: t("visionMission.futureProjects.project2.title"),
        description: t("visionMission.futureProjects.project2.description"),
      },
    ],
    [t]
  );
};
