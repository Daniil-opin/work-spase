import { FormEvent, useState } from "react";

import styles from "./index.module.scss";

export default function AccountSettingsPage() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [nickname, setNickname] = useState("");

  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordMessage, setPasswordMessage] = useState<string | null>(null);
  const [isPasswordSubmitting, setIsPasswordSubmitting] = useState(false);

  const [nicknameError, setNicknameError] = useState<string | null>(null);
  const [nicknameMessage, setNicknameMessage] = useState<string | null>(null);
  const [isNicknameSubmitting, setIsNicknameSubmitting] = useState(false);

  const trimmedNickname = nickname.trim();

  const canChangePassword =
    oldPassword.trim().length > 0 &&
    newPassword.trim().length >= 8 &&
    !isPasswordSubmitting;

  const canChangeNickname =
    trimmedNickname.length >= 3 && !isNicknameSubmitting;

  const handleChangePassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setPasswordError(null);
    setPasswordMessage(null);

    if (newPassword.trim().length < 8) {
      setPasswordError("Новый пароль должен содержать минимум 8 символов.");
      return;
    }

    try {
      setIsPasswordSubmitting(true);

      // Здесь позже будет запрос на backend
      // await changePassword({
      //   oldPassword,
      //   newPassword,
      // });

      setPasswordMessage("Пароль успешно изменён.");
      setOldPassword("");
      setNewPassword("");
    } catch {
      setPasswordError(
        "Не удалось изменить пароль. Проверьте старый пароль и попробуйте снова.",
      );
    } finally {
      setIsPasswordSubmitting(false);
    }
  };

  const handleChangeNickname = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setNicknameError(null);
    setNicknameMessage(null);

    if (trimmedNickname.length < 3) {
      setNicknameError("Никнейм должен содержать минимум 3 символа.");
      return;
    }

    try {
      setIsNicknameSubmitting(true);

      // Здесь позже будет запрос на backend
      // await changeNickname({
      //   nickname: trimmedNickname,
      // });

      setNicknameMessage("Никнейм успешно изменён.");
      setNickname("");
    } catch {
      setNicknameError(
        "Не удалось изменить никнейм. Возможно, такой никнейм уже используется.",
      );
    } finally {
      setIsNicknameSubmitting(false);
    }
  };

  return (
    <section className={styles.page}>
      <div className={styles.sectionHeader}>
        <h1 className={styles.title}>Настройки аккаунта</h1>

        <p className={styles.description}>
          Здесь вы можете изменить данные своей учетной записи. Для повышения
          безопасности доступна смена пароля, а также изменение никнейма,
          который отображается в системе.
        </p>
      </div>

      <form className={styles.form} onSubmit={handleChangePassword}>
        <div className={styles.formHeader}>
          <h2 className={styles.titleSection}>Изменение пароля</h2>

          <p className={styles.description}>
            Введите текущий пароль, а затем укажите новый пароль. После
            подтверждения новый пароль будет использоваться для входа в аккаунт.
          </p>
        </div>

        <label className={styles.field}>
          <span className={styles.label}>Старый пароль</span>

          <input
            className={styles.input}
            type="password"
            value={oldPassword}
            placeholder="Введите старый пароль"
            onChange={(event) => {
              setOldPassword(event.target.value);
              setPasswordError(null);
              setPasswordMessage(null);
            }}
          />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Новый пароль</span>

          <input
            className={styles.input}
            type="password"
            value={newPassword}
            placeholder="Введите новый пароль"
            onChange={(event) => {
              setNewPassword(event.target.value);
              setPasswordError(null);
              setPasswordMessage(null);
            }}
          />
        </label>

        {passwordError && (
          <p className={styles.errorMessage}>{passwordError}</p>
        )}

        {passwordMessage && (
          <p className={styles.successMessage}>{passwordMessage}</p>
        )}

        <div className={styles.formActions}>
          <button
            className={styles.primaryButton}
            type="submit"
            disabled={!canChangePassword}
          >
            {isPasswordSubmitting ? "Сохранение..." : "Подтвердить"}
          </button>
        </div>
      </form>

      <form className={styles.form} onSubmit={handleChangeNickname}>
        <div className={styles.formHeader}>
          <h2 className={styles.titleSection}>Изменение никнейма</h2>

          <p className={styles.description}>
            Укажите новый никнейм, который будет отображаться в вашем профиле и
            использоваться в интерфейсе системы.
          </p>
        </div>

        <label className={styles.field}>
          <span className={styles.label}>Новый никнейм</span>

          <input
            className={styles.input}
            type="text"
            value={nickname}
            placeholder="Введите новый никнейм"
            onChange={(event) => {
              setNickname(event.target.value);
              setNicknameError(null);
              setNicknameMessage(null);
            }}
          />
        </label>

        {nicknameError && (
          <p className={styles.errorMessage}>{nicknameError}</p>
        )}

        {nicknameMessage && (
          <p className={styles.successMessage}>{nicknameMessage}</p>
        )}

        <div className={styles.formActions}>
          <button
            className={styles.primaryButton}
            type="submit"
            disabled={!canChangeNickname}
          >
            {isNicknameSubmitting ? "Сохранение..." : "Подтвердить"}
          </button>
        </div>
      </form>
    </section>
  );
}
