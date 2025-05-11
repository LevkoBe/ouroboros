import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./Embeds.module.css";

const PartnerForm: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    organization: "",
    email: "",
    proposalType: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit logic
    console.log("Partner form submitted:", formData);
  };

  return (
    <div className={styles.embed}>
      <h3>{t("support.options.partner.title")}</h3>
      <p>{t("support.options.partner.description")}</p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroupInline}>
          <label htmlFor="organization">
            {t("support.options.partner.organization")}
          </label>
          <input
            type="text"
            id="organization"
            name="organization"
            value={formData.organization}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroupInline}>
          <label htmlFor="email">{t("support.options.partner.email")}</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroupInline}>
          <label htmlFor="proposalType">
            {t("support.options.partner.proposalType.type")}
          </label>
          <select
            id="proposalType"
            name="proposalType"
            value={formData.proposalType}
            onChange={handleChange}
            required
          >
            <option value="">
              {t("support.options.partner.proposalType.selectType")}
            </option>
            <option value="sponsorship">
              {t("support.options.partner.proposalType.sponsorship")}
            </option>
            <option value="collaboration">
              {t("support.options.partner.proposalType.collaboration")}
            </option>
            <option value="other">
              {t("support.options.partner.proposalType.other")}
            </option>
          </select>
        </div>

        <div className={styles.formGroupInline}>
          <label htmlFor="message">
            {t("support.options.partner.message.title")}
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className={styles.smallTextarea}
            placeholder={t(
              `support.options.partner.message.${formData.proposalType}`,
              ""
            )}
            required
          />
        </div>

        <button type="submit">{t("support.options.partner.submit")}</button>
      </form>
    </div>
  );
};

export default PartnerForm;
