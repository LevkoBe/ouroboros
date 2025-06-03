import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./DonateOptions.module.css";
import LiqPayPopup from "./LiqPayPopup";
import ProjectDocumentation from "./ProjectDocumentation";
import { SiPaypal } from "react-icons/si";

type DonateOptionsProps = {
  data: string;
  signature: string;
};

const DonateOptions: React.FC<DonateOptionsProps> = ({ data, signature }) => {
  const { t } = useTranslation();
  const [showLiqPayPopup, setShowLiqPayPopup] = useState(false);
  const [showDocumentation, setShowDocumentation] = useState(false);

  return (
    <div className={styles.embed}>
      <h3>{t("support.options.donate.title")}</h3>

      <div className={styles.donationForm}>
        {/* PayPal Section */}
        <div className={styles.paymentSection}>
          <h4 className={styles.paymentTitle}>PayPal</h4>
          <a
            href="https://www.paypal.com/paypalme/ouroborosUA"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.amountButton}
          >
            <span className={styles.logoAndText}>
              <SiPaypal />
              {t("support.options.donate.title")}
            </span>
          </a>
        </div>

        {/* LiqPay Section */}
        <div className={styles.paymentSection}>
          <h4 className={styles.paymentTitle}>LiqPay</h4>
          <div className={styles.liqpayButtons}>
            <button
              className={styles.amountButton}
              onClick={() => setShowLiqPayPopup(true)}
            >
              {t("support.options.donate.title")}
            </button>
            <button
              className={`${styles.aboutButton}`}
              onClick={() => setShowDocumentation(true)}
            >
              {t("support.options.donate.aboutProject.button")}
            </button>
          </div>
        </div>
      </div>

      {/* Popups */}
      {showLiqPayPopup && (
        <LiqPayPopup
          data={data}
          signature={signature}
          onClose={() => setShowLiqPayPopup(false)}
        />
      )}

      {showDocumentation && (
        <ProjectDocumentation onClose={() => setShowDocumentation(false)} />
      )}
    </div>
  );
};

export default DonateOptions;
