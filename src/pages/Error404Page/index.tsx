import { ReactComponent as ErrorImage } from "../../assets/image/404.avif.svg";

// import { Link } from "react-router-dom";
import styles from "./index.module.scss";

export function Error404Page() {
  return (
    <main className={styles.main}>
      <div className={styles.main__container}>
        <div className={styles.page}>
          <section className={styles.content}>
            <h1 className={styles.title}>
              Если вы видите это сообщение,
              <br />
              значит что-то пошло ужасно,
              <br />
              ужасно не так.
            </h1>
            {/* <Link className={styles.button} to="/">
            Вернуться на главную ↗
            </Link>  */}
            <a className={styles.button} href="/">
              Вернуться на главную ↗
            </a>
          </section>

          <div className={styles.decor} aria-hidden="true">
            <ErrorImage className={styles.decor__image} />
          </div>
        </div>
      </div>
    </main>
  );
}
