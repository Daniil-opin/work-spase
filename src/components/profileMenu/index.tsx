import { ReactComponent as UserIcon } from "../../assets/icons/user.svg";
import { ReactComponent as ExitIcon } from "../../assets/icons/exit.svg";
import { JSX, useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import styles from "./ProfileMenu.module.scss";
import style from "../header/index.module.scss";
import { CalendarIcon } from "../Icons";
import { ProfileIcon } from "../Icons";
import { StarIcon } from "../Icons";
import { SettingsIcon } from "../Icons";
import { TopicIcon } from "../Icons";
import { HelpIcon } from "../Icons";

interface MenuItem {
  label: string;
  href: string;
  Icon: JSX.Element;
}

const menuGroups: MenuItem[][] = [
  [
    {
      label: "Профиль",
      href: "/profile",
      Icon: <ProfileIcon />,
    },
    {
      label: "Бронирование",
      href: "/reservations",
      Icon: <CalendarIcon />,
    },
    {
      label: "Избранное",
      href: "/favourites",
      Icon: <StarIcon />,
    },
  ],
  [
    {
      label: "Настройки",
      href: "/settings",
      Icon: <SettingsIcon />,
    },
    {
      label: "Темы",
      href: "/topic",
      Icon: <TopicIcon />,
    },
    {
      label: "Помощь",
      href: "/help",
      Icon: <HelpIcon />,
    },
    // { label: "Помощь", href: "/features", badge: "New" },
  ],
];

export default function ProfileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;

      if (!wrapperRef.current?.contains(target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleToggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.profileMenu} ref={wrapperRef}>
      <button
        ref={buttonRef}
        className={style.mainHeader__action}
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={handleToggleMenu}
      >
        <UserIcon className={style.mainHeader__actionIcon} />
      </button>

      {isOpen && (
        <div className={styles.dropdown} role="menu">
          <div className={styles.user}>
            <img
              className={styles.userAvatar}
              src="/images/avatar.jpg"
              alt=""
            />

            <div className={styles.userInfo}>
              <span className={styles.userName}>Якименко Даниил</span>
              <span className={styles.userFullName}>Frontend-разработчик</span>
            </div>
          </div>

          {menuGroups.map((group, groupIndex) => (
            <div className={styles.group} key={groupIndex}>
              {group.map(({ href, label, Icon }) => (
                <Link
                  className={styles.item}
                  to={href}
                  key={label}
                  role="menuitem"
                  onClick={handleCloseMenu}
                >
                  <span className={styles.itemIcon}>{Icon}</span>
                  <span className={styles.itemText}>{label}</span>
                </Link>
              ))}
            </div>
          ))}
          <div className={styles.group_signOut}>
            <button
              className={styles.signOut}
              type="button"
              role="menuitem"
              onClick={handleCloseMenu}
            >
              <ExitIcon className={styles.itemIcon__signOut} />
              <span>Выйти из аккаунта</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
