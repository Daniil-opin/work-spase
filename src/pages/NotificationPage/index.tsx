import { FormEvent, useState } from "react";

import styles from "./index.module.scss";

type NotificationSettings = {
  email: boolean;
  push: boolean;
  reminders: boolean;
};

const initialSettings: NotificationSettings = {
  email: true,
  push: true,
  reminders: true,
};

export default function NotificationPage() {
  const [settings, setSettings] =
    useState<NotificationSettings>(initialSettings);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("Настройки уведомлений сохранены:", settings);
  };

  const handleToggle = (name: keyof NotificationSettings) => {
    setSettings((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Настройки уведомлений</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <p className={styles.description}>
          Управление способами получения уведомлений
        </p>

        <div className={styles.notificationsList}>
          <NotificationRow
            title="Email уведомления"
            description="Получать уведомления на email"
            checked={settings.email}
            onChange={() => handleToggle("email")}
          />

          <NotificationRow
            title="Push уведомления"
            description="Показывать всплывающие уведомления в браузере"
            checked={settings.push}
            onChange={() => handleToggle("push")}
          />

          <NotificationRow
            title="Напоминания"
            description="Напоминания о предстоящих бронированиях и чек-ине"
            checked={settings.reminders}
            onChange={() => handleToggle("reminders")}
          />
        </div>
      </form>
    </section>
  );
}

type NotificationRowProps = {
  title: string;
  description: string;
  checked: boolean;
  onChange: () => void;
};

function NotificationRow({
  title,
  description,
  checked,
  onChange,
}: NotificationRowProps) {
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
