import styles from "./index.module.scss";
import { LocationIcon } from "../../components/Icons";

type ResourceStatus = "free" | "occupied";

type FavoriteResource = {
  id: number;
  title: string;
  location: string;
  status: ResourceStatus;
  equipment: string[];
};

const favorites: FavoriteResource[] = [
  {
    id: 1,
    title: "Рабочее место 1.02",
    location: "Этаж 1, Open Space A",
    status: "occupied",
    equipment: ["Монитор", "Клавиатура", "Мышь", "Вентилятор"],
  },
];

// Для проверки пустого состояния замени массив выше на:
// const favorites: FavoriteResource[] = [];

const statusLabels: Record<ResourceStatus, string> = {
  free: "Свободно",
  occupied: "Занято",
};

// function LocationIcon() {
//   return (
//     <svg
//       className={styles.icon}
//       width="18"
//       height="18"
//       viewBox="0 0 24 24"
//       fill="none"
//     >
//       <path
//         d="M12 21C12 21 5 14.5 5 9.5C5 5.6 8.1 2.5 12 2.5C15.9 2.5 19 5.6 19 9.5C19 14.5 12 21 12 21Z"
//         stroke="currentColor"
//         strokeWidth="2"
//       />
//       <circle cx="12" cy="9.5" r="2.5" stroke="currentColor" strokeWidth="2" />
//     </svg>
//   );
// }

function MonitorIcon() {
  return (
    <svg
      className={styles.icon}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
    >
      <rect
        x="3"
        y="4"
        width="18"
        height="12"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M8 20H16" stroke="currentColor" strokeWidth="2" />
      <path d="M12 16V20" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function StarIcon({ filled = false }: { filled?: boolean }) {
  return (
    <svg
      className={filled ? styles.starFilled : styles.emptyStarIcon}
      width="58"
      height="58"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
    >
      <path
        d="M12 2.8L14.8 8.5L21.1 9.4L16.5 13.8L17.6 20L12 17.1L6.4 20L7.5 13.8L2.9 9.4L9.2 8.5L12 2.8Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FavoriteCard({ resource }: { resource: FavoriteResource }) {
  return (
    <article className={styles.card}>
      <div className={styles.cardHeader}>
        <h2 className={styles.cardTitle}>{resource.title}</h2>

        <button
          className={styles.favoriteButton}
          type="button"
          aria-label="Удалить из избранного"
        >
          <StarIcon filled />
        </button>
      </div>

      <div className={styles.location}>
        <LocationIcon className={styles.icon} />
        <span>{resource.location}</span>
      </div>

      <span className={styles.status}>{statusLabels[resource.status]}</span>

      <div className={styles.equipmentBlock}>
        <div className={styles.equipmentTitle}>
          <MonitorIcon />
          <span>Оснащение:</span>
        </div>

        <div className={styles.equipmentList}>
          {resource.equipment.map((item) => (
            <span className={styles.equipmentItem} key={item}>
              {item}
            </span>
          ))}
        </div>
      </div>

      <button className={styles.bookingButton} type="button">
        Забронировать
      </button>
    </article>
  );
}

function EmptyFavorites() {
  return (
    <section className={styles.emptyState}>
      <StarIcon />

      <h2 className={styles.emptyTitle}>Нет избранных ресурсов</h2>

      <p className={styles.emptyText}>
        Добавьте ресурсы в избранное, чтобы быстро получать к ним доступ
      </p>
    </section>
  );
}

export default function FavoritesPage() {
  const isEmpty = favorites.length === 0;

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Избранное</h1>
        <p className={styles.subtitle}>Ваши избранные места и переговорные</p>
      </header>

      {isEmpty ? (
        <EmptyFavorites />
      ) : (
        <section className={styles.grid}>
          {favorites.map((resource) => (
            <FavoriteCard resource={resource} key={resource.id} />
          ))}
        </section>
      )}
    </main>
  );
}
