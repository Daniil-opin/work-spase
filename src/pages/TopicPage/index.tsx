import { ChangeEvent, FormEvent, useState } from "react";

import styles from "./index.module.scss";

type ThemeMode = "single" | "system";
type ColorTheme =
  | "light-default"
  | "light-protanopia"
  | "light-tritanopia"
  | "dark-default"
  | "dark-protanopia"
  | "dark-tritanopia"
  | "soft-dark";

type AppearanceForm = {
  themeMode: ThemeMode;
  colorTheme: ColorTheme;
  highContrast: boolean;
};

type ThemeOption = {
  id: ColorTheme;
  title: string;
  isBeta?: boolean;
  preview:
    | "lightDefault"
    | "lightProtanopia"
    | "lightTritanopia"
    | "darkDefault"
    | "darkProtanopia"
    | "darkTritanopia"
    | "softDark";
};

const initialForm: AppearanceForm = {
  themeMode: "single",
  colorTheme: "light-default",
  highContrast: false,
};

const themeOptions: ThemeOption[] = [
  {
    id: "light-default",
    title: "Свет по умолчанию",
    preview: "lightDefault",
  },
  {
    id: "light-protanopia",
    title: "Легкая протанопия и дейтеранопия",
    preview: "lightProtanopia",
    isBeta: true,
  },
  {
    id: "light-tritanopia",
    title: "Легкая тританопия",
    preview: "lightTritanopia",
    isBeta: true,
  },
  {
    id: "dark-default",
    title: "Темный по умолчанию",
    preview: "darkDefault",
    isBeta: true,
  },
  {
    id: "dark-protanopia",
    title: "Темный протанопия и дейтеранопия",
    preview: "darkProtanopia",
    isBeta: true,
  },
  {
    id: "dark-tritanopia",
    title: "Темный тританопия",
    preview: "darkTritanopia",
    isBeta: true,
  },
  {
    id: "soft-dark",
    title: "Мягкий темный",
    preview: "softDark",
  },
];

export default function TopicPage() {
  const [form, setForm] = useState<AppearanceForm>(initialForm);

  const handleThemeModeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setForm((prevState) => ({
      ...prevState,
      themeMode: event.target.value as ThemeMode,
    }));
  };

  const handleColorThemeChange = (colorTheme: ColorTheme) => {
    setForm((prevState) => ({
      ...prevState,
      colorTheme,
    }));
  };

  const handleHighContrastChange = (event: ChangeEvent<HTMLInputElement>) => {
    setForm((prevState) => ({
      ...prevState,
      highContrast: event.target.checked,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("Настройки внешнего вида сохранены:", form);
  };

  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Цветовая тема приложения</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <p className={styles.description}>
          Выберите, как WorkSpace будет выглядеть для вас. Выберите одну тему
          или синхронизируйте её с вашей системой, чтобы автоматически
          переключаться между дневной и ночной темами. Выбранные параметры
          применяются немедленно и сохраняются автоматически.
        </p>

        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="themeMode">
            Тематический режим
          </label>

          <div className={styles.themeModeRow}>
            <select
              id="themeMode"
              name="themeMode"
              className={styles.select}
              value={form.themeMode}
              onChange={handleThemeModeChange}
            >
              <option value="single">Единственная тема</option>
              <option value="system">Синхронизировать с системой</option>
            </select>

            <span className={styles.helperInline}>
              WorkSpace будет использовать выбранную вами тему
            </span>
          </div>
        </div>

        <div className={styles.themeGrid}>
          {themeOptions.map((theme) => (
            <ThemeCard
              key={theme.id}
              theme={theme}
              checked={form.colorTheme === theme.id}
              onChange={handleColorThemeChange}
            />
          ))}
        </div>

        <div className={styles.contrastBlock}>
          <div>
            <h2 className={styles.contrastTitle}>Увеличьте контрастность</h2>

            <p className={styles.contrastText}>
              Включите высокую контрастность для светлого и тёмного режима или
              для обоих в соответствии с настройками вашей системы
            </p>
          </div>

          <div className={styles.switchArea}>
            <span className={styles.switchStatus}>
              {form.highContrast ? "Вкл" : "Выкл"}
            </span>

            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={form.highContrast}
                onChange={handleHighContrastChange}
              />
              <span className={styles.slider} />
            </label>
          </div>
        </div>
      </form>
    </section>
  );
}

type ThemeCardProps = {
  theme: ThemeOption;
  checked: boolean;
  onChange: (theme: ColorTheme) => void;
};

function ThemeCard({ theme, checked, onChange }: ThemeCardProps) {
  return (
    <button
      className={
        checked
          ? `${styles.themeCard} ${styles.themeCardSelected}`
          : styles.themeCard
      }
      type="button"
      onClick={() => onChange(theme.id)}
    >
      <ThemePreview type={theme.preview} />

      <div className={styles.themeFooter}>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="colorTheme"
            checked={checked}
            onChange={() => onChange(theme.id)}
          />

          <span>{theme.title}</span>
        </label>

        {theme.isBeta && <span className={styles.betaBadge}>Бета</span>}
      </div>
    </button>
  );
}

type ThemePreviewProps = {
  type: ThemeOption["preview"];
};

function ThemePreview({ type }: ThemePreviewProps) {
  return (
    <div className={`${styles.preview} ${styles[type]}`}>
      <div className={styles.previewTopBar}>
        <span className={styles.topPill} />
        <span className={styles.topPill} />
        <span className={styles.topPill} />
      </div>

      <div className={styles.previewBody}>
        <div className={styles.previewMain}>
          <div className={styles.previewLine} />

          <div className={styles.previewPanel}>
            <div className={styles.previewAccentRow}>
              <div className={styles.previewAccent} />
            </div>
          </div>
        </div>

        <div className={styles.previewAside}>
          <div className={styles.previewDots}>
            <span className={styles.greenDot} />
            <span className={styles.redDot} />
          </div>

          <div className={styles.previewSideCard} />
        </div>
      </div>
    </div>
  );
}
