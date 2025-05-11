import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./Embeds.module.css";

const VolunteerForm: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    skills: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit logic
    console.log("Volunteer form submitted:", formData);
  };

  return (
    <div className={styles.embed}>
      <h3>{t("support.options.volunteer.title")}</h3>
      <p>{t("support.options.volunteer.description")}</p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroupInline}>
          <label htmlFor="name">{t("support.options.volunteer.name")}</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroupInline}>
          <label htmlFor="email">{t("support.options.volunteer.email")}</label>
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
          <label htmlFor="skills">
            {t("support.options.volunteer.skills")}
          </label>
          <textarea
            id="skills"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            className={styles.smallTextarea}
          />
        </div>

        <button type="submit">{t("support.options.volunteer.submit")}</button>
      </form>
    </div>
  );
};

export default VolunteerForm;
