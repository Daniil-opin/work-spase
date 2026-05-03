import { Link, useLocation } from "react-router-dom";

import styles from "./index.module.scss";
import ProfileMenu from "../profileMenu/index";

import { ReactComponent as MapIcon } from "../../assets/icons/map.svg";
import { ReactComponent as ReservationsIcon } from "../../assets/icons/calendar.svg";
import { ReactComponent as FavouritesIcon } from "../../assets/icons/star.svg";

export default function HeaderComponent() {
  const location = useLocation();

  const pageTitleByPath: Record<string, string> = {
    "/": "Главная",
    "/map": "Карта этажей",
    "/reservations": "Мои бронирования",
    "/favourites": "Избранное",
    "/notifications": "Уведомления",
    "/help": "Помощь",
    "/settings": "Настройки",
  };

  const pageTitle = pageTitleByPath[location.pathname] ?? "Страница";

  return (
    <header className={styles.mainHeader}>
      <div className={styles.mainHeader__left}>
        <Link className={styles.mainHeader__logo} to="/">
          <div className={styles.mainHeader__text}>
            <h1 className={styles.mainHeader__title}>Workspace</h1>
            <p className={styles.mainHeader__subtitle}>Система бронирования</p>
          </div>
        </Link>

        <span className={styles.mainHeader__divider} />

        <span className={styles.mainHeader__pageTitle}>{pageTitle}</span>
      </div>

      <div className={styles.mainHeader__actions}>
        <button
          className={styles.mainHeader__action}
          type="button"
          aria-label="Карта этажей"
        >
          <MapIcon className={styles.mainHeader__actionIcon_map} />
        </button>

        <button
          className={styles.mainHeader__action}
          type="button"
          aria-label="Мои бронирования"
        >
          <ReservationsIcon className={styles.mainHeader__actionIcon} />
        </button>

        <button
          className={styles.mainHeader__action}
          type="button"
          aria-label="Избранное"
        >
          <FavouritesIcon className={styles.mainHeader__actionIcon} />
        </button>

        <ProfileMenu />
      </div>
    </header>
  );
}
