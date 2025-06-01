import { useTranslation } from "react-i18next";
import { usePartners } from "@/hooks/usePartners";
import styles from "./Partners.module.css";

export default function Partners() {
  const { t } = useTranslation();
  const partners = usePartners();

  if (partners.length === 0) {
    return (
      <div className={styles.partnersContainer}>
        <p>{t("partners.loadingOrNoPartners")}</p>
      </div>
    );
  }

  return (
    <div className={styles.partnersSection}>
      <h2 className={styles.sectionTitle}>
        {t("partners.title", "Our Partners")}
      </h2>
      <div className={styles.partnersContainer}>
        <div className={styles.partnersGrid}>
          {partners.map((partner) => (
            <div key={partner.id} className={styles.partnerCard}>
              <blockquote className={styles.description}>
                {partner.description}
              </blockquote>
              <div className={styles.cardBottomBar}>
                <img
                  src={partner.imageSrc}
                  alt={partner.name}
                  className={styles.partnerImage}
                  draggable="false"
                />
                <div className={styles.partnerInfo}>
                  <h5>
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.partnerLink}
                    >
                      {partner.name}
                    </a>
                  </h5>
                  <p className={styles.partnerDescription}>{partner.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
