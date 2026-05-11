import { type SyntheticEvent, useState } from "react";

import styles from "./LoginPage.module.css";

export default function LoginPage() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.trim(),
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Неверный email или пароль");
      }

      const data: { token: string } = await response.json();

      localStorage.setItem("accessToken", data.token);

      window.location.href = "/";
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Произошла неизвестная ошибка");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className={styles.loginPage}>
      <section className={styles.loginLeft} aria-label="Форма входа">
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <div className={styles.loginHeader}>
            <h1>Welcome Back</h1>
            <p className={styles.subtitle}>Hi there! Welcome to WorkSpace</p>
            <p className={styles.hint}>
              Please enter your user name and Password to Login
            </p>
          </div>

          <label className={styles.field}>
            <span className={styles.srOnly}>Email Address</span>
            <input
              type="email"
              placeholder="Email Address"
              autoComplete="email"
              value={username}
              onChange={(event) => setUserName(event.target.value)}
              required
            />
            <UserIcon />
          </label>

          <label className={styles.field}>
            <span className={styles.srOnly}>Password</span>
            <input
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <KeyIcon />
          </label>

          <div className={styles.formOptions}>
            <label className={styles.rememberRow}>
              <input
                type="checkbox"
                checked={remember}
                onChange={(event) => setRemember(event.target.checked)}
              />
              <span>Remember for 30 days</span>
            </label>

            <a href="#forgot">Forgot Password ?</a>
          </div>

          {error && <p className={styles.errorText}>{error}</p>}

          <button
            type="submit"
            className={styles.signInButton}
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>

          <p className={styles.guestText}>
            Are you a guest? <a href="#activate">Activate your Account</a>
          </p>
        </form>
      </section>

      <section className={styles.loginRight} aria-label="Декоративный блок">
        <div className={`${styles.portrait} ${styles.portraitLeft}`}>
          <img src="/images/login-man.jpg" alt="Business man" />
        </div>

        <div className={`${styles.portrait} ${styles.portraitRight}`}>
          <img src="/images/login-woman.jpg" alt="Business woman" />
        </div>
      </section>
    </main>
  );
}

function UserIcon() {
  return (
    <svg
      className={styles.fieldIcon}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20 21V19C20 17.9 19.1 17 18 17H6C4.9 17 4 17.9 4 19V21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 13C14.21 13 16 11.21 16 9C16 6.79 14.21 5 12 5C9.79 5 8 6.79 8 9C8 11.21 9.79 13 12 13Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function KeyIcon() {
  return (
    <svg
      className={styles.fieldIcon}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M21 2L19 4M19 4L16.5 6.5M19 4L22 7L18.5 10.5L15.5 7.5M14 10L7.5 16.5M7.5 16.5C6.7 16.1 5.72 16.2 5.05 16.88C4.25 17.68 4.25 18.97 5.05 19.77C5.85 20.57 7.15 20.57 7.95 19.77C8.63 19.1 8.73 18.12 8.32 17.32L7.5 16.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
