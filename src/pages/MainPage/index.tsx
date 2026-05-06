import { ReactComponent as LocationIcon } from "../../assets/icons/location.svg";
import { ReactComponent as CalendarIcon } from "../../assets/icons/calendar.svg";
import { ReactComponent as ClockIcon } from "../../assets/icons/clock.svg";
import { ReactComponent as QrIcon } from "../../assets/icons/qr-code.svg";
import { ReactComponent as ArrowRightIcon } from "../../assets/icons/arrow_right.svg";

import styles from "./index.module.scss";

type StatCard = {
  label: string;
  value: number;
};

type BookingItem = {
  place: string;
  date: string;
  time: string;
  status: string;
};

const stats: StatCard[] = [
  {
    label: "Активные бронирования",
    value: 1,
  },
  {
    label: "Избранных мест",
    value: 0,
  },
  {
    label: "Посещений в этом месяце",
    value: 12,
  },
];

const recentBookings: BookingItem[] = [
  {
    place: "Рабочее место 1.02",
    date: "27 апреля 2026",
    time: "09:00–18:00",
    status: "Подтверждено",
  },
];

export default function MainPage() {
  return (
    <main className={styles.dashboard}>
      <section className={styles.header}>
        <h1 className={styles.title}>Добро пожаловать, Даниил Дмитриевич!</h1>
        <p className={styles.date}>вторник, 28 апреля 2026</p>
      </section>

      <section className={styles.quickActions} aria-label="Быстрые действия">
        <article className={styles.actionCard}>
          <div>
            <h2 className={styles.cardTitle}>Забронировать на сегодня</h2>
            <p className={styles.cardDescription}>
              Найдите свободное место или переговорную
            </p>
          </div>

          <button className={styles.primaryButton} type="button">
            <LocationIcon className={styles.buttonIcon} />
            <span>Открыть карту этажей</span>
          </button>
        </article>

        <article className={styles.actionCard}>
          <div>
            <h2 className={styles.cardTitle}>Забронировать на завтра</h2>
            <p className={styles.cardDescription}>Спланируйте визит заранее</p>
          </div>

          <button className={styles.secondaryButton} type="button">
            <CalendarIcon className={styles.buttonIcon} />
            <span>Выбрать место</span>
          </button>
        </article>
      </section>

      <section
        className={styles.todayBooking}
        aria-label="Бронирование на сегодня"
      >
        <div className={styles.todayContent}>
          <div className={styles.todayHeader}>
            <div>
              <h2 className={styles.sectionTitle}>
                Ваше бронирование на сегодня
              </h2>
              <p className={styles.sectionDescription}>
                Не забудьте выполнить чек-ин
              </p>
            </div>

            <span className={styles.statusBadge}>Подтверждено</span>
          </div>
          <div className={styles.todayBody}>
            <div className={styles.bookingInfo}>
              <div className={styles.bookingRow}>
                <LocationIcon className={styles.infoIcon} />
                <span className={styles.bookingPlace}>Рабочее место 1.02</span>
              </div>

              <div className={styles.bookingRow}>
                <ClockIcon className={styles.infoIcon} />
                <span>9:00 – 18:00</span>
              </div>
            </div>
            <button className={styles.checkInButton} type="button">
              <QrIcon className={styles.checkInIcon} />
              <span>Чек-ин</span>
            </button>
          </div>
        </div>
      </section>

      <section className={styles.stats} aria-label="Статистика">
        {stats.map((stat) => (
          <article className={styles.statCard} key={stat.label}>
            <p className={styles.statLabel}>{stat.label}</p>
            <strong className={styles.statValue}>{stat.value}</strong>
          </article>
        ))}
      </section>

      <section className={styles.history} aria-label="История бронирований">
        <div className={styles.historyHeader}>
          <div>
            <h2 className={styles.sectionTitle}>
              Ваше бронирование на сегодня
            </h2>
            <p className={styles.sectionDescription}>
              История ваших последних бронирований
            </p>
          </div>

          <button className={styles.historyButton} type="button">
            <span>Все бронирования</span>
            <ArrowRightIcon className={styles.historyButtonIcon} />
          </button>
        </div>

        <div className={styles.historyList}>
          {recentBookings.map((booking) => (
            <article
              className={styles.historyItem}
              key={`${booking.place}-${booking.date}`}
            >
              <div>
                <h3 className={styles.historyPlace}>{booking.place}</h3>
                <p className={styles.historyMeta}>
                  {booking.date} · {booking.time}
                </p>
              </div>

              <span className={styles.statusBadge}>{booking.status}</span>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
