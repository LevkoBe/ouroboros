import { useMemo } from "react";
import { useTranslation } from "react-i18next";

export interface PartnerData {
  id: string;
  name: string;
  title: string;
  description: string;
  imageSrc: string;
}

export const usePartners = (): PartnerData[] => {
  const { t } = useTranslation();

  return useMemo(
    () => [
      {
        id: "partner1",
        name: t("partners.partner1.name"),
        description: t("partners.partner1.description"),
        imageSrc: t("partners.partner1.imageSrc"),
        title: t("partners.partner1.title"),
      },
      {
        id: "partner2",
        name: t("partners.partner2.name"),
        description: t("partners.partner2.description"),
        imageSrc: t("partners.partner2.imageSrc"),
        title: t("partners.partner2.title"),
      },
      {
        id: "partner3",
        name: t("partners.partner3.name"),
        description: t("partners.partner3.description"),
        imageSrc: t("partners.partner3.imageSrc"),
        title: t("partners.partner3.title"),
      },
      {
        id: "partner4",
        name: t("partners.partner4.name", "David Kim"),
        description: t("partners.partner4.description"),
        imageSrc: t("partners.partner4.imageSrc"),
        title: t("partners.partner4.title"),
      },
    ],
    [t]
  );
};
