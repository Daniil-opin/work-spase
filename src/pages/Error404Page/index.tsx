import { ReactComponent as ErrorImage } from "../../assets/images/404.avif.svg";
import { ReactComponent as ArrowImage } from "../../assets/icons/arrow.svg";
import { Link } from "react-router";

import styles from "./index.module.scss";

export default function Error404Page() {
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
            <Link className={styles.button} to="/">
              Вернуться на главную
              <ArrowImage className={styles.button__image} />
            </Link>
          </section>

          <div className={styles.decor} aria-hidden="true">
            <ErrorImage className={styles.decor__image} />
          </div>
        </div>
      </div>
    </main>
  );
}
