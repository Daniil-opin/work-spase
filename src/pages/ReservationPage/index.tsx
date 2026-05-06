import { useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent } from "react";
import { createPortal } from "react-dom";

import { CalendarIcon } from "../Icons";
import { ClockIcon } from "../Icons";
import { QrIcon } from "../Icons";
import { GuestIcon } from "../Icons";
import { TrashIcon } from "../Icons";

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
    status: "confirmed",
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

type GuestFormData = {
  fullName: string;
  document: string;
};

type AddGuestModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (guest: GuestFormData) => void;
};

function AddGuestModal({ isOpen, onClose, onSubmit }: AddGuestModalProps) {
  const [fullName, setFullName] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const isSubmitDisabled = !fullName.trim() || !documentNumber.trim();

  const handleClose = () => {
    setFullName("");
    setDocumentNumber("");
    onClose();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitDisabled) {
      return;
    }

    onSubmit({
      fullName: fullName.trim(),
      document: documentNumber.trim(),
    });

    handleClose();
  };

  return createPortal(
    <div className={styles.modalOverlay} onMouseDown={handleClose}>
      <form
        className={styles.modal}
        onSubmit={handleSubmit}
        onMouseDown={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="addGuestTitle"
      >
        <button
          className={styles.modalCloseButton}
          type="button"
          aria-label="Закрыть окно"
          onClick={handleClose}
        >
          ×
        </button>

        <h2 className={styles.modalTitle} id="addGuestTitle">
          Добавить гостя
        </h2>

        <p className={styles.modalDescription}>
          Укажите данные гостя для оформления пропуска
        </p>

        <label className={styles.modalField}>
          <span>ФИО гостя</span>

          <input
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            placeholder="Иванов Иван Иванович"
            autoFocus
          />
        </label>

        <label className={styles.modalField}>
          <span>Документ</span>

          <input
            value={documentNumber}
            onChange={(event) => setDocumentNumber(event.target.value)}
            placeholder="Паспорт 1234 567890"
          />
        </label>

        <div className={styles.modalActions}>
          <button
            className={styles.modalSubmitButton}
            type="submit"
            disabled={isSubmitDisabled}
          >
            Добавить
          </button>

          <button
            className={styles.modalCancelButton}
            type="button"
            onClick={handleClose}
          >
            Отмена
          </button>
        </div>
      </form>
    </div>,
    document.body,
  );
}

export default function BookingsPage() {
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
    <main className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Мои бронирования</h1>
          <p className={styles.description}>
            Управление вашими текущими и прошлыми бронированиями
          </p>
        </div>

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

              <div className={styles.actions}>
                {booking.status === "confirmed" && (
                  <>
                    <button type="button" className={styles.checkInButton}>
                      <QrIcon />
                      <span>Qr-код</span>
                    </button>

                    <button
                      type="button"
                      className={styles.guestButton}
                      onClick={() => setActiveGuestBookingId(booking.id)}
                    >
                      <GuestIcon />
                      <span>Гость</span>
                    </button>
                  </>
                )}

                <button
                  type="button"
                  className={styles.deleteButton}
                  aria-label="Удалить бронирование"
                >
                  <TrashIcon />
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <section className={styles.empty}>
          <CalendarIcon />

          <h2>Бронирований не найдено</h2>

          <p>Попробуйте изменить фильтр статуса</p>
        </section>
      )}
      <AddGuestModal
        isOpen={activeGuestBookingId !== null}
        onClose={() => setActiveGuestBookingId(null)}
        onSubmit={(guest) => {
          console.log("ID бронирования:", activeGuestBookingId);
          console.log("Данные гостя:", guest);
        }}
      />
    </main>
  );
}
