import type { ReactNode } from "react";
import { NavLink, Outlet, useNavigate } from "react-router";

import styles from "./index.module.scss";

import {
  SettingsIcon,
  BellIcon,
  EmailIcon,
  EyeIcon,
  HistoryIcon,
  LogoutIcon,
  MonitorIcon,
  ProfileIcon,
} from "../Icons";

type SettingsLink = {
  label: string;
  path: string;
  icon: ReactNode;
};

const mainLinks: SettingsLink[] = [
  {
    label: "Публичный профиль",
    path: "/settings/profile",
    icon: <ProfileIcon />,
  },
  {
    label: "Аккаунт",
    path: "/settings/account",
    icon: <SettingsIcon />,
  },
  {
    label: "Внешний вид",
    path: "/settings/topic",
    icon: <MonitorIcon />,
  },
  {
    label: "Уведомления",
    path: "/settings/notifications",
    icon: <BellIcon />,
  },
  {
    label: "Приватность",
    path: "/settings/privacy",
    icon: <EyeIcon />,
  },
  {
    label: "История",
    path: "/settings/history",
    icon: <HistoryIcon />,
  },
];

const accessLinks: SettingsLink[] = [
  {
    label: "Электронная почта",
    path: "/settings/email",
    icon: <EmailIcon />,
  },
];

export default function SettingsSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className={styles.settingsPage}>
      <aside className={styles.sidebar}>
        <div className={styles.profile}>
          <div className={styles.avatarWrapper}>
            <img
              className={styles.avatarImage}
              src="/images/avatar.jpg"
              alt="Аватар пользователя"
            />
          </div>

          <div className={styles.profileInfo}>
            <div className={styles.profileName}>
              Якименко Данила Дмитриевич{" "}
              <span className={styles.nickname}>(@yakim)</span>
            </div>

            <div className={styles.position}>Frontend-разработчик</div>
          </div>
        </div>

        <nav className={styles.nav}>
          <div className={styles.links}>
            {mainLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navLink} ${styles.navLinkActive}`
                    : styles.navLink
                }
              >
                <span className={styles.navIcon}>{link.icon}</span>
                <span className={styles.navText}>{link.label}</span>
              </NavLink>
            ))}
          </div>

          <div className={styles.divider} />

          <div className={styles.sectionTitle}>Доступ</div>

          <div className={styles.links}>
            {accessLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navLink} ${styles.navLinkActive}`
                    : styles.navLink
                }
              >
                <span className={styles.navIcon}>{link.icon}</span>
                <span className={styles.navText}>{link.label}</span>
              </NavLink>
            ))}
          </div>

          <button
            className={styles.logoutButton}
            type="button"
            onClick={handleLogout}
          >
            <span className={styles.logoutIcon}>
              <LogoutIcon />
            </span>

            <span>Выйти из аккаунта</span>
          </button>
        </nav>
      </aside>

      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
}
