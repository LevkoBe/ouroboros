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

  return useMemo(() => {
    const partnerKeys: string[] = t("partners", { returnObjects: true })
      ? Object.keys(t("partners", { returnObjects: true })).filter((key) =>
          key.startsWith("partner")
        )
      : [];

    return partnerKeys.map((key) => ({
      id: key,
      name: t(`partners.${key}.name`),
      description: t(`partners.${key}.description`),
      imageSrc: t(`partners.${key}.imageSrc`),
      title: t(`partners.${key}.title`),
      website: t(`partners.${key}.website`),
    }));
  }, [t]);
};
