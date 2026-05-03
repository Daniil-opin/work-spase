import { ReactComponent as UserIcon } from "../../assets/icons/user.svg";
import { ReactComponent as ExitIcon } from "../../assets/icons/exit.svg";
import { useEffect, useRef, useState } from "react";

import styles from "./ProfileMenu.module.scss";
import style from "../header/index.module.scss";
const menuGroups = [
  [
    {
      label: "Профиль",
      href: "/profile",
      icon: "../../assets/icons/user.svg",
    },
    {
      label: "Бронирование",
      href: "/repositories",
      icon: "/assets/icons/calendar.svg",
    },
    {
      label: "Избранное",
      href: "/stars",
      icon: "../../assets/icons/star.svg",
    },
  ],
  [
    {
      label: "Настройки",
      href: "/settings",
      icon: "../../assets/icons/settings.svg",
    },
    {
      label: "Темы",
      href: "/copilot",
      icon: "../../assets/icons/topic.svg",
    },
    {
      label: "Помощь",
      href: "/features",
      icon: "../../assets/icons/help.svg",
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
              {group.map((item) => (
                <a
                  key={item.label}
                  className={styles.item}
                  href={item.href}
                  role="menuitem"
                  onClick={handleCloseMenu}
                >
                  <span className={styles.itemIcon}>
                    <img src={item.icon} alt="" />
                  </span>
                  <span className={styles.itemText}>{item.label}</span>

                  {/* {item.badge && (
                    <span className={styles.badge}>{item.badge}</span>
                  )} */}
                </a>
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
