import { ChangeEvent, useMemo, useState } from "react";
import { isSlotMatchesTimeRange } from "./logic";

import {
  SearchIcon,
  MonitorIcon,
  MapIcon,
  ClockMapIcon,
  FilterIcon,
} from "../Icons";
import styles from "./index.module.scss";

type ViewMode = "map" | "list";

type ResourceType = "all" | "workplace" | "meetingRoom";
type Floor = "all" | "1" | "2" | "3";
type Capacity = "any" | "1" | "2" | "4" | "8" | "12";

type ResourceStatus = "free" | "busy";

type Filters = {
  resourceType: ResourceType;
  floor: Floor;
  capacity: Capacity;
  startTime: string;
  endTime: string;
};

type SelectOption<T extends string> = {
  value: T;
  label: string;
};

type Resource = {
  id: number;
  title: string;
  type: Exclude<ResourceType, "all">;
  floor: number;
  zone: string;
  capacity: number;
  status: ResourceStatus;
  equipment: string[];
  availableSlots: string[];
};

const initialFilters: Filters = {
  resourceType: "all",
  floor: "all",
  capacity: "any",
  startTime: "09:00",
  endTime: "18:00",
};

const resourceTypeOptions: SelectOption<ResourceType>[] = [
  { value: "all", label: "Все типы" },
  { value: "workplace", label: "Рабочие места" },
  { value: "meetingRoom", label: "Переговорные" },
];

const floorOptions: SelectOption<Floor>[] = [
  { value: "all", label: "Все этажи" },
  { value: "1", label: "1 этаж" },
  { value: "2", label: "2 этаж" },
  { value: "3", label: "3 этаж" },
];

const capacityOptions: SelectOption<Capacity>[] = [
  { value: "any", label: "Любая" },
  { value: "1", label: "1 человек" },
  { value: "2", label: "2 человека" },
  { value: "4", label: "4 человека" },
  { value: "8", label: "8 человек" },
  { value: "12", label: "12 человек" },
];

const resources: Resource[] = [
  {
    id: 1,
    title: "Рабочее место 1.01",
    type: "workplace",
    floor: 1,
    zone: "Open Space A",
    capacity: 1,
    status: "free",
    equipment: ["Монитор", "Розетка", "Wi-Fi"],
    availableSlots: ["09:00 — 12:00", "13:00 — 18:00"],
  },
  {
    id: 2,
    title: "Рабочее место 1.02",
    type: "workplace",
    floor: 1,
    zone: "Open Space A",
    capacity: 1,
    status: "busy",
    equipment: ["Монитор", "Wi-Fi"],
    availableSlots: [],
  },
  {
    id: 3,
    title: 'Переговорная "Днепр"',
    type: "meetingRoom",
    floor: 1,
    zone: "Зона переговорных",
    capacity: 4,
    status: "free",
    equipment: ["ТВ-панель", "Видеоконференция", "Wi-Fi"],
    availableSlots: [
      "09:00 — 12:00",
      "12:00 — 15:00",
      "15:00 — 18:00",
      "18:00 — 21:00",
    ],
  },
  {
    id: 4,
    title: "Рабочее место 2.01",
    type: "workplace",
    floor: 2,
    zone: "Open Space B",
    capacity: 1,
    status: "free",
    equipment: ["Монитор", "Wi-Fi"],
    availableSlots: ["10:00 — 14:00", "15:00 — 18:00"],
  },
];

export default function ResourcesPage() {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [bookingMessage, setBookingMessage] = useState<string | null>(null);
  const [favoriteResourceIds, setFavoriteResourceIds] = useState<number[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("map");
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(
    null,
  );

  const handleToggleFavorite = (resourceId: number) => {
    setFavoriteResourceIds((prevState) => {
      if (prevState.includes(resourceId)) {
        return prevState.filter((id) => id !== resourceId);
      }

      return [...prevState, resourceId];
    });
  };

  const filteredResources = useMemo(() => {
    const normalizedSearchValue = searchValue.trim().toLowerCase();

    const isDefaultTimeRange =
      filters.startTime === initialFilters.startTime &&
      filters.endTime === initialFilters.endTime;

    return resources.filter((resource) => {
      const searchableText = [
        resource.title,
        resource.zone,
        `Этаж ${resource.floor}`,
        resource.type === "workplace" ? "Рабочее место" : "Переговорная",
        ...resource.equipment,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        normalizedSearchValue.length === 0 ||
        searchableText.includes(normalizedSearchValue);

      const matchesType =
        filters.resourceType === "all" ||
        resource.type === filters.resourceType;

      const matchesFloor =
        filters.floor === "all" || String(resource.floor) === filters.floor;

      const matchesCapacity =
        filters.capacity === "any" ||
        resource.capacity >= Number(filters.capacity);

      const matchesTime =
        isDefaultTimeRange ||
        resource.availableSlots.some((slot) =>
          isSlotMatchesTimeRange(slot, filters.startTime, filters.endTime),
        );

      return (
        matchesSearch &&
        matchesType &&
        matchesFloor &&
        matchesCapacity &&
        matchesTime
      );
    });
  }, [filters, searchValue]);

  const handleFilterChange = (
    event: ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    const { name, value } = event.target;

    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleResetFilters = () => {
    setFilters(initialFilters);
    setSearchValue("");
    setSelectedResource(null);
  };

  return (
    <section className={styles.page}>
      <div className={styles.searchRow}>
        <label className={styles.searchField}>
          <SearchIcon />

          <input
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            placeholder="Поиск по названию или зоне..."
            type="text"
          />
        </label>

        <button
          className={
            isFiltersOpen
              ? `${styles.filterButton} ${styles.filterButtonActive}`
              : styles.filterButton
          }
          type="button"
          onClick={() => setIsFiltersOpen((prevState) => !prevState)}
        >
          <FilterIcon />
          <span>Фильтры</span>
        </button>
      </div>

      {isFiltersOpen && (
        <div className={styles.filtersPanel}>
          <div className={styles.filtersGrid}>
            <SelectField
              label="Тип ресурса"
              name="resourceType"
              value={filters.resourceType}
              options={resourceTypeOptions}
              onChange={handleFilterChange}
            />

            <SelectField
              label="Этаж"
              name="floor"
              value={filters.floor}
              options={floorOptions}
              onChange={handleFilterChange}
            />

            <SelectField
              label="Вместимость"
              name="capacity"
              value={filters.capacity}
              options={capacityOptions}
              onChange={handleFilterChange}
            />

            <div className={styles.timeGroup}>
              <div className={styles.filterLabel}>Время</div>

              <div className={styles.timeFields}>
                <label className={styles.timeField}>
                  <input
                    name="startTime"
                    value={filters.startTime}
                    onChange={handleFilterChange}
                    type="time"
                  />
                  <ClockMapIcon />
                </label>

                <label className={styles.timeField}>
                  <input
                    name="endTime"
                    value={filters.endTime}
                    onChange={handleFilterChange}
                    type="time"
                  />
                  <ClockMapIcon />
                </label>
              </div>
            </div>
          </div>

          <div className={styles.filtersFooter}>
            <p className={styles.foundText}>
              Найдено ресурсов: <span>{filteredResources.length}</span>
            </p>

            <button
              className={styles.resetButton}
              type="button"
              onClick={handleResetFilters}
            >
              Сбросить фильтры
            </button>
          </div>
        </div>
      )}

      <div className={styles.viewSwitcher}>
        <button
          className={
            viewMode === "map"
              ? `${styles.viewButton} ${styles.viewButtonActive}`
              : styles.viewButton
          }
          type="button"
          onClick={() => setViewMode("map")}
        >
          <MapIcon />
          <span>Карта</span>
        </button>

        <button
          className={
            viewMode === "list"
              ? `${styles.viewButton} ${styles.viewButtonActive}`
              : styles.viewButton
          }
          type="button"
          onClick={() => setViewMode("list")}
        >
          <MonitorIcon />
          <span>Список</span>
        </button>
      </div>

      <div className={styles.contentLayout}>
        <div className={styles.mainContent}>
          {viewMode === "map" && (
            <div className={styles.mapPlaceholder}>
              <MapIcon />

              <h2>Карта пока не подключена</h2>

              <p>
                Здесь позже можно будет разместить интерактивную схему этажа с
                рабочими местами и переговорными комнатами.
              </p>
            </div>
          )}

          {viewMode === "list" && (
            <>
              {filteredResources.length > 0 ? (
                <div className={styles.resourcesGrid}>
                  {filteredResources.map((resource) => (
                    <ResourceCard
                      key={resource.id}
                      resource={resource}
                      isActive={selectedResource?.id === resource.id}
                      onClick={() => setSelectedResource(resource)}
                    />
                  ))}
                </div>
              ) : (
                <div className={styles.emptyState}>
                  <h2>Ресурсы не найдены</h2>

                  <p>
                    Попробуйте изменить параметры фильтрации или ввести другой
                    запрос в строку поиска.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {selectedResource && (
        <div
          className={styles.detailsBackdrop}
          role="presentation"
          onMouseDown={() => setSelectedResource(null)}
        >
          <div
            className={styles.detailsPanelWrapper}
            role="presentation"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <ResourceDetailsPanel
              resource={selectedResource}
              isFavorite={favoriteResourceIds.includes(selectedResource.id)}
              onToggleFavorite={() => handleToggleFavorite(selectedResource.id)}
              onClose={() => setSelectedResource(null)}
            />
          </div>
        </div>
      )}
    </section>
  );
}

type ResourceCardProps = {
  resource: Resource;
  isActive: boolean;
  onClick: () => void;
};

function ResourceCard({ resource, isActive, onClick }: ResourceCardProps) {
  const isFree = resource.status === "free";

  return (
    <button
      className={
        isActive
          ? `${styles.resourceCard} ${styles.resourceCardActive}`
          : styles.resourceCard
      }
      type="button"
      onClick={onClick}
    >
      <div className={styles.resourceCardHeader}>
        <h2>{resource.title}</h2>

        <span
          className={
            isFree
              ? `${styles.statusBadge} ${styles.statusFree}`
              : `${styles.statusBadge} ${styles.statusBusy}`
          }
        >
          {isFree ? "Свободно" : "Занято"}
        </span>
      </div>

      <p className={styles.resourceLocation}>
        Этаж {resource.floor}, {resource.zone}
      </p>

      <div className={styles.resourceMeta}>
        <span>
          <UsersIcon />
          {resource.type === "meetingRoom"
            ? `До ${resource.capacity} человек`
            : resource.capacity}
        </span>

        {resource.type === "meetingRoom" && (
          <span>
            <MonitorIcon />
            {resource.equipment.length}
          </span>
        )}
      </div>
    </button>
  );
}

type ResourceDetailsPanelProps = {
  resource: Resource;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onClose: () => void;
};
function timeToMinutes(time: string) {
  const [hours, minutes] = time.split(":").map(Number);

  return hours * 60 + minutes;
}

function parseSlot(slot: string) {
  const [startTime, endTime] = slot.split(/[–—-]/).map((value) => value.trim());

  return {
    startTime,
    endTime,
    startMinutes: timeToMinutes(startTime),
    endMinutes: timeToMinutes(endTime),
  };
}

function isTimeRangeInsideFreeSlot(
  startTime: string,
  endTime: string,
  availableSlots: string[],
) {
  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);

  return availableSlots.some((slot) => {
    const parsedSlot = parseSlot(slot);

    return (
      startMinutes >= parsedSlot.startMinutes &&
      endMinutes <= parsedSlot.endMinutes
    );
  });
}

function ResourceDetailsPanel({
  resource,
  isFavorite,
  onToggleFavorite,
  onClose,
}: ResourceDetailsPanelProps) {
  const isFree = resource.status === "free";
  const [bookingStartTime, setBookingStartTime] = useState("");
  const [bookingEndTime, setBookingEndTime] = useState("");
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [bookingMessage, setBookingMessage] = useState<string | null>(null);

  const canBook =
    isFree && bookingStartTime.length > 0 && bookingEndTime.length > 0;

  const handleBookResource = () => {
    setBookingError(null);
    setBookingMessage(null);

    if (!bookingStartTime || !bookingEndTime) {
      setBookingError("Выберите время начала и окончания бронирования.");
      return;
    }

    const startMinutes = timeToMinutes(bookingStartTime);
    const endMinutes = timeToMinutes(bookingEndTime);

    if (startMinutes >= endMinutes) {
      setBookingError("Время окончания должно быть позже времени начала.");
      return;
    }

    if (endMinutes - startMinutes < 60) {
      setBookingError(
        "Минимальный промежуток бронирования должен составлять 1 час.",
      );
      return;
    }

    const isAvailable = isTimeRangeInsideFreeSlot(
      bookingStartTime,
      bookingEndTime,
      resource.availableSlots,
    );

    if (!isAvailable) {
      setBookingError(
        "Данный промежуток времени забронировать нельзя, так как он уже занят.",
      );
      return;
    }

    setBookingMessage(
      `Забронировано место «${resource.title}» на время: ${bookingStartTime} – ${bookingEndTime}`,
    );
  };

  return (
    <aside className={styles.detailsPanel}>
      <div className={styles.detailsHeader}>
        <div>
          <h2>{resource.title}</h2>

          <p>
            <LocationIcon />
            Этаж {resource.floor}, {resource.zone}
          </p>
        </div>

        <div className={styles.detailsHeaderActions}>
          <span
            className={
              isFree
                ? `${styles.statusBadge} ${styles.statusFree}`
                : `${styles.statusBadge} ${styles.statusBusy}`
            }
          >
            {isFree ? "Свободно" : "Занято"}
          </span>

          <button
            className={
              isFavorite
                ? `${styles.favoriteButton} ${styles.favoriteButtonActive}`
                : styles.favoriteButton
            }
            type="button"
            aria-label={
              isFavorite
                ? "Удалить место из избранного"
                : "Добавить место в избранное"
            }
            onClick={onToggleFavorite}
          >
            <StarIcon isFilled={isFavorite} />
          </button>
        </div>
      </div>

      <div className={styles.detailsLine}>
        <UsersIcon />

        <span>
          {resource.type === "meetingRoom"
            ? `До ${resource.capacity} человек`
            : `${resource.capacity} человек`}
        </span>
      </div>

      {resource.equipment.length > 0 && (
        <div className={styles.detailsBlock}>
          <h3>
            <MonitorIcon />
            Оснащение:
          </h3>

          <div className={styles.equipmentList}>
            {resource.equipment.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      )}

      <div className={styles.divider} />

      <div className={styles.detailsBlock}>
        <h3>
          <ClockMapIcon />
          Выберите время бронирования:
        </h3>

        <div className={styles.bookingTimeFields}>
          <label className={styles.bookingTimeField}>
            <span>Начало</span>

            <input
              type="time"
              value={bookingStartTime}
              onChange={(event) => {
                setBookingStartTime(event.target.value);
                setBookingMessage(null);
              }}
            />
          </label>

          <label className={styles.bookingTimeField}>
            <span>Конец</span>

            <input
              type="time"
              value={bookingEndTime}
              onChange={(event) => {
                setBookingEndTime(event.target.value);
                setBookingMessage(null);
              }}
            />
          </label>
        </div>

        {bookingError && (
          <p className={styles.bookingErrorMessage}>{bookingError}</p>
        )}
      </div>

      <div className={styles.detailsBlock}>
        <h3>
          <ClockMapIcon />
          Свободные промежутки на сегодня:
        </h3>

        {resource.availableSlots.length > 0 ? (
          <div className={styles.freeSlotsList}>
            {resource.availableSlots.map((slot) => (
              <div key={slot} className={styles.freeSlotItem}>
                {slot}
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.emptySlots}>
            На сегодня свободных промежутков нет.
          </p>
        )}
      </div>

      <div className={styles.divider} />

      <div className={styles.detailsActions}>
        {bookingMessage && (
          <p className={styles.bookingMessage}>{bookingMessage}</p>
        )}
        <button
          className={styles.bookButton}
          type="button"
          disabled={!canBook}
          onClick={handleBookResource}
        >
          <CalendarIcon />
          Забронировать
        </button>

        <button
          className={styles.closeDetailsButton}
          type="button"
          onClick={onClose}
        >
          Закрыть
        </button>
      </div>
    </aside>
  );
}

type SelectFieldProps<T extends string> = {
  label: string;
  name: string;
  value: T;
  options: SelectOption<T>[];
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
};

function SelectField<T extends string>({
  label,
  name,
  value,
  options,
  onChange,
}: SelectFieldProps<T>) {
  return (
    <label className={styles.selectGroup}>
      <span className={styles.filterLabel}>{label}</span>

      <span className={styles.selectWrapper}>
        <select name={name} value={value} onChange={onChange}>
          {options.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <ChevronIcon />
      </span>
    </label>
  );
}

function ChevronIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M7 10L12 15L17 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M16 21V19C16 17.9 15.1 17 14 17H6C4.9 17 4 17.9 4 19V21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M10 13C12.2 13 14 11.2 14 9C14 6.8 12.2 5 10 5C7.8 5 6 6.8 6 9C6 11.2 7.8 13 10 13Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M20 21V19C20 18.1 19.4 17.3 18.6 17.1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M17 5.1C17.9 5.5 18.5 6.4 18.5 7.5C18.5 8.6 17.9 9.5 17 9.9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M12 21C12 21 18 15.7 18 9.8C18 6.5 15.3 4 12 4C8.7 4 6 6.5 6 9.8C6 15.7 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M12 12C13.1 12 14 11.1 14 10C14 8.9 13.1 8 12 8C10.9 8 10 8.9 10 10C10 11.1 10.9 12 12 12Z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M7 3V7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M17 3V7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M4 9H20" stroke="currentColor" strokeWidth="2" />
      <path
        d="M6 5H18C19.1 5 20 5.9 20 7V19C20 20.1 19.1 21 18 21H6C4.9 21 4 20.1 4 19V7C4 5.9 4.9 5 6 5Z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}
type StarIconProps = {
  isFilled: boolean;
};

function StarIcon({ isFilled }: StarIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill={isFilled ? "currentColor" : "none"}>
      <path
        d="M12 3.5L14.6 8.8L20.5 9.7L16.2 13.8L17.2 19.6L12 16.9L6.8 19.6L7.8 13.8L3.5 9.7L9.4 8.8L12 3.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
