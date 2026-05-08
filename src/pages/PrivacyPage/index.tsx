import { FormEvent, useState } from "react";

import styles from "./index.module.scss";

type PrivacySettings = {
  showBookingsToColleagues: boolean;
  showPresenceStatus: boolean;
};

const initialSettings: PrivacySettings = {
  showBookingsToColleagues: true,
  showPresenceStatus: true,
};

export default function PrivacyPage() {
  const [settings, setSettings] = useState<PrivacySettings>(initialSettings);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("Настройки приватности сохранены:", settings);
  };

  const handleToggle = (name: keyof PrivacySettings) => {
    setSettings((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Настройки приватности</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <p className={styles.description}>Управление видимостью ваших данных</p>

        <div className={styles.notificationsList}>
          <PrivacyRow
            title="Показывать бронирование коллегам"
            description="Другие пользователи смогут видеть ваши бронирования"
            checked={settings.showBookingsToColleagues}
            onChange={() => handleToggle("showBookingsToColleagues")}
          />

          <PrivacyRow
            title="Показывать статус присутствия"
            description="Показывать информацию о ваших нахождения в офисе"
            checked={settings.showPresenceStatus}
            onChange={() => handleToggle("showPresenceStatus")}
          />
        </div>
      </form>
    </section>
  );
}

type PrivacyRowProps = {
  title: string;
  description: string;
  checked: boolean;
  onChange: () => void;
};

function PrivacyRow({
  title,
  description,
  checked,
  onChange,
}: PrivacyRowProps) {
  return (
    <div className={styles.notificationRow}>
      <div className={styles.notificationInfo}>
        <h2 className={styles.notificationTitle}>{title}</h2>
        <p className={styles.notificationDescription}>{description}</p>
      </div>

      <label className={styles.switch}>
        <input type="checkbox" checked={checked} onChange={onChange} />
        <span className={styles.slider} />
      </label>
    </div>
  );
}
