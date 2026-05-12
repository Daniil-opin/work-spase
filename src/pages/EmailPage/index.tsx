import { FormEvent, useMemo, useState } from "react";

import styles from "./index.module.scss";
import { TrashIcon } from "../Icons";
import { BasicEmailIcon } from "../../components/Icons";
import { PublicEmailIcon } from "../../components/Icons";

type EmailVerificationProps = {
  initialEmail?: string;
};

type EmailObject = {
  idEmail: number;
  email: string;
  isBasic: boolean;
  isPublic: boolean;
};

const emails: EmailObject[] = [
  {
    idEmail: 1,
    email: "yakim.nik@corp.by",
    isBasic: true,
    isPublic: true,
  },
  {
    idEmail: 2,
    email: "nikita@gmail.com",
    isBasic: false,
    isPublic: false,
  },
  {
    idEmail: 3,
    email: "work@gmail.com",
    isBasic: false,
    isPublic: true,
  },
];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function EmailPage({
  initialEmail = "",
}: EmailVerificationProps) {
  const [email, setEmail] = useState(initialEmail);
  const [code, setCode] = useState("");

  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isVerifyingCode, setIsVerifyingCode] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);

  const trimmedEmail = email.trim();

  const isEmailValid = useMemo(() => {
    return emailPattern.test(trimmedEmail);
  }, [trimmedEmail]);

  const canSendCode = isEmailValid && !isSendingCode;
  const canVerifyCode = code.trim().length >= 4 && !isVerifyingCode;

  const handleSendCode = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isEmailValid) {
      setError("Введите корректный адрес электронной почты");
      setMessage(null);
      return;
    }

    try {
      setIsSendingCode(true);
      setError(null);
      setMessage(null);

      const response = await fetch(
        "http://localhost:8080/api/me/email/verification-code",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: trimmedEmail,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Не удалось отправить код подтверждения");
      }

      setIsCodeSent(true);
      setMessage("Код подтверждения отправлен на указанную электронную почту");
    } catch {
      setError("Не удалось отправить код. Попробуйте ещё раз");
    } finally {
      setIsSendingCode(false);
    }
  };

  const handleVerifyCode = async () => {
    try {
      setIsVerifyingCode(true);
      setError(null);
      setMessage(null);

      const response = await fetch(
        "http://localhost:8080/api/me/email/verify",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: trimmedEmail,
            code: code.trim(),
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Не удалось подтвердить электронную почту");
      }

      setMessage("Электронная почта успешно подтверждена");
      setCode("");
    } catch {
      setError("Неверный код подтверждения или срок действия кода истёк");
    } finally {
      setIsVerifyingCode(false);
    }
  };

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Электронная почта</h1>

        <p className={styles.description}>
          Подтвердите адрес электронной почты, связанный с вашим аккаунтом. На
          указанный адрес будет отправлен код подтверждения. После ввода кода
          почта будет считаться подтверждённой.
        </p>
      </div>

      <form className={styles.form} onSubmit={handleSendCode}>
        <label className={styles.field}>
          <span className={styles.label}>Добавить адрес электронной почты</span>

          <div className={styles.emailRow}>
            <input
              className={styles.input}
              type="email"
              value={email}
              placeholder="example@corp.by"
              onChange={(event) => {
                setEmail(event.target.value);
                setError(null);
                setMessage(null);
              }}
            />

            <button
              className={styles.primaryButton}
              type="submit"
              disabled={!canSendCode}
            >
              {isSendingCode ? "Отправка..." : "Отправить код"}
            </button>
          </div>
        </label>

        {isCodeModalOpen && (
          <div
            className={styles.modalOverlay}
            role="presentation"
            onMouseDown={() => setIsCodeModalOpen(false)}
          >
            <div
              className={styles.modal}
              role="dialog"
              aria-modal="true"
              aria-labelledby="email-code-modal-title"
              onMouseDown={(event) => event.stopPropagation()}
            >
              <div className={styles.modalHeader}>
                <div>
                  <h2 className={styles.modalTitle} id="email-code-modal-title">
                    Подтверждение почты
                  </h2>

                  <p className={styles.modalDescription}>
                    Мы отправили код подтверждения на адрес {trimmedEmail}.
                    Введите его ниже, чтобы подтвердить электронную почту.
                  </p>
                </div>

                <button
                  className={styles.closeButton}
                  type="button"
                  aria-label="Закрыть окно"
                  onClick={() => setIsCodeModalOpen(false)}
                ></button>
              </div>

              <label className={styles.field}>
                <span className={styles.label}>Код подтверждения</span>

                <input
                  className={styles.input}
                  type="text"
                  value={code}
                  placeholder="Введите код из письма"
                  maxLength={6}
                  inputMode="numeric"
                  autoFocus
                  onChange={(event) => {
                    setCode(event.target.value);
                    setError(null);
                    setMessage(null);
                  }}
                />
              </label>

              {error && <p className={styles.errorMessage}>{error}</p>}
              {message && <p className={styles.successMessage}>{message}</p>}

              <div className={styles.modalActions}>
                <button
                  className={styles.secondaryButton}
                  type="button"
                  onClick={() => setIsCodeModalOpen(false)}
                >
                  Отмена
                </button>

                <button
                  className={styles.primaryButton}
                  type="button"
                  disabled={!canVerifyCode}
                  onClick={handleVerifyCode}
                >
                  {isVerifyingCode ? "Проверка..." : "Подтвердить"}
                </button>
              </div>
            </div>
          </div>
        )}

        {message && <p className={styles.successMessage}>{message}</p>}
        {error && <p className={styles.errorMessage}>{error}</p>}
      </form>

      <h2 className={styles.titleSection}>Список почт</h2>
      <p className={styles.description}>
        Здесь отображаются почты, которые привязаны к вашему аккаунту
      </p>
      <div className={styles.emailList}>
        {emails.map((emailObject) => (
          <article key={emailObject.idEmail} className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.place}>{emailObject.email}</h2>

              {emailObject.isBasic && (
                <span className={`${styles.status} ${styles.basic}`}>
                  Основная
                </span>
              )}

              {emailObject.isPublic && (
                <span className={`${styles.status} ${styles.public}`}>
                  Публичная
                </span>
              )}
            </div>

            <div className={styles.cardActions}>
              {!emailObject.isPublic && (
                <button
                  type="button"
                  className={styles.publicEmailButton}
                  aria-label="Сделать почту публичной"
                >
                  <PublicEmailIcon />
                </button>
              )}

              {!emailObject.isBasic && (
                <>
                  <button
                    type="button"
                    className={styles.basicEmailButton}
                    aria-label="Сделать почту основной"
                  >
                    <BasicEmailIcon />
                  </button>

                  <button
                    type="button"
                    className={styles.deleteButton}
                    aria-label="Удалить почту"
                  >
                    <TrashIcon />
                  </button>
                </>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
