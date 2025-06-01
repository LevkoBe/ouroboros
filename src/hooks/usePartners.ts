import { useMemo } from "react";
import { useTranslation } from "react-i18next";

export interface PartnerData {
  id: string;
  name: string;
  title: string;
  description: string;
  imageSrc: string;
  website: string;
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
        website: t("partners.partner1.website"),
      },
      {
        id: "partner2",
        name: t("partners.partner2.name"),
        description: t("partners.partner2.description"),
        imageSrc: t("partners.partner2.imageSrc"),
        title: t("partners.partner2.title"),
        website: t("partners.partner2.website"),
      },
    ],
    [t]
  );
};
