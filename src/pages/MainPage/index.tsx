import { useState } from "react";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import { ReactComponent as TopicIcon } from "../../assets/icons/topic.svg";
import { ReactComponent as SettingsIcon } from "../../assets/icons/settings.svg";
import { ReactComponent as UserIcon } from "../../assets/icons/user.svg";

import styles from "./index.module.scss";

export function MainPage() {
  return (
    <header className={styles.mainHeader}>
      <div className={styles.mainHeader__left}>
        <div className={styles.mainHeader__text}>
          <h1 className={styles.mainHeader__title}>Workspace</h1>
          <p className={styles.mainHeader__subtitle}>Система бронирования</p>
        </div>
      </div>

      <div className={styles.mainHeader__actions}>
        <button
          className={styles.mainHeader__action}
          type="button"
          aria-label="Поиск"
        >
          <SearchIcon className={styles.mainHeader__actionIcon} />
        </button>

        <button
          className={styles.mainHeader__action}
          type="button"
          aria-label="Тема"
        >
          <TopicIcon className={styles.mainHeader__actionIcon} />
        </button>

        <button
          className={styles.mainHeader__action}
          type="button"
          aria-label="Настройки"
        >
          <SettingsIcon className={styles.mainHeader__actionIcon} />
        </button>

        <button
          className={styles.mainHeader__action}
          type="button"
          aria-label="Профиль"
        >
          <UserIcon className={styles.mainHeader__actionIcon} />
        </button>
      </div>
    </header>
  );
}
