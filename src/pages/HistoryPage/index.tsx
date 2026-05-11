import { useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent } from "react";
import { createPortal } from "react-dom";

import { CalendarIcon } from "../Icons";
import { ClockIcon } from "../Icons";
import { HistoryIcon } from "../Icons";

import styles from "./index.module.scss";

type BookingStatus = "confirmed" | "checkedIn" | "completed" | "cancelled";

type FilterStatus = "all" | BookingStatus;

type Booking = {
  id: number;
  place: string;
  date: string;
  time: string;
  status: BookingStatus;
};

const bookings: Booking[] = [
  {
    id: 1,
    place: "Рабочее место 1.02",
    date: "28 апреля 2026",
    time: "09:00 — 18:00",
    status: "cancelled",
  },
];

const statusLabels: Record<BookingStatus, string> = {
  confirmed: "Подтверждено",
  checkedIn: "Чек-ин выполнен",
  completed: "Завершено",
  cancelled: "Отменено",
};

const filterOptions: { value: FilterStatus; label: string }[] = [
  {
    value: "all",
    label: "Все статусы",
  },
  {
    value: "confirmed",
    label: "Подтверждено",
  },
  {
    value: "checkedIn",
    label: "Чек-ин выполнен",
  },
  {
    value: "completed",
    label: "Завершено",
  },
  {
    value: "cancelled",
    label: "Отменено",
  },
];

type StatusFilterSelectProps = {
  value: FilterStatus;
  options: typeof filterOptions;
  onChange: (value: FilterStatus) => void;
};

function StatusFilterSelect({
  value,
  options,
  onChange,
}: StatusFilterSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement | null>(null);

  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!selectRef.current) {
        return;
      }

      if (!selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (nextValue: FilterStatus) => {
    onChange(nextValue);
    setIsOpen(false);
  };

  return (
    <div className={styles.filterSelect} ref={selectRef}>
      <button
        type="button"
        className={styles.filterButton}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
      >
        <span>{selectedOption?.label}</span>

        <svg
          className={`${styles.filterArrow} ${
            isOpen ? styles.filterArrowOpen : ""
          }`}
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M5 7.5L10 12.5L15 7.5" />
        </svg>
      </button>

      {isOpen && (
        <div className={styles.filterDropdown}>
          {options.map((option) => {
            const isSelected = option.value === value;

            return (
              <button
                key={option.value}
                type="button"
                className={`${styles.filterOption} ${
                  isSelected ? styles.filterOptionSelected : ""
                }`}
                onClick={() => handleSelect(option.value)}
              >
                <span>{option.label}</span>

                {isSelected && (
                  <svg
                    className={styles.checkIcon}
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M4.5 10L8 13.5L15.5 6" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function HistoryPage() {
  const [selectedStatus, setSelectedStatus] = useState<FilterStatus>("all");
  const [activeGuestBookingId, setActiveGuestBookingId] = useState<
    number | null
  >(null);

  const filteredBookings = useMemo(() => {
    if (selectedStatus === "all") {
      return bookings;
    }

    return bookings.filter((booking) => booking.status === selectedStatus);
  }, [selectedStatus]);

  const hasBookings = filteredBookings.length > 0;
  return (
    <section className={styles.page}>
      <h1 className={styles.title}>История посещений</h1>
      <div className={styles.historyToolBar}>
        <p className={styles.description}>
          Здесь отображается ваша история посещений за последний месяц
        </p>
        <StatusFilterSelect
          value={selectedStatus}
          options={filterOptions}
          onChange={setSelectedStatus}
        />
      </div>
      {hasBookings ? (
        <div className={styles.list}>
          {filteredBookings.map((booking) => (
            <article key={booking.id} className={styles.card}>
              <div className={styles.cardInfo}>
                <div className={styles.cardHeader}>
                  <h2 className={styles.place}>{booking.place}</h2>

                  <span
                    className={`${styles.status} ${styles[booking.status]}`}
                  >
                    {statusLabels[booking.status]}
                  </span>
                </div>

                <div className={styles.meta}>
                  <div className={styles.metaItem}>
                    <CalendarIcon />
                    <span>{booking.date}</span>
                  </div>

                  <div className={styles.metaItem}>
                    <ClockIcon />
                    <span>{booking.time}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <section className={styles.empty}>
          <HistoryIcon />

          <h2>Бронирований не найдено</h2>

          <p>Попробуйте изменить фильтр статуса</p>
        </section>
      )}
    </section>
  );
}
