import { ChangeEvent, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";

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
type Capacity = "any" | "1" | "2" | "4" | "8";

type Filters = {
  resourceType: ResourceType;
  floor: Floor;
  capacity: Capacity;
  startTime: string;
  endTime: string;
};

const initialFilters: Filters = {
  resourceType: "all",
  floor: "all",
  capacity: "any",
  startTime: "09:00",
  endTime: "18:00",
};

const resourceTypeOptions = [
  { value: "all", label: "Все типы" },
  { value: "workplace", label: "Рабочие места" },
  { value: "meetingRoom", label: "Переговорные" },
];

const floorOptions = [
  { value: "all", label: "Все этажи" },
  { value: "1", label: "1 этаж" },
  { value: "2", label: "2 этаж" },
  { value: "3", label: "3 этаж" },
];

const capacityOptions = [
  { value: "any", label: "Любая" },
  { value: "1", label: "1 человек" },
  { value: "2", label: "2 человека" },
  { value: "4", label: "4 человека" },
  { value: "8", label: "8 человек" },
  { value: "12", label: "12 человек" },
];

export default function ResourcesPage() {
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("map");
  const [filters, setFilters] = useState<Filters>(initialFilters);

  const foundResourcesCount = useMemo(() => {
    return 6;
  }, []);

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
              Найдено ресурсов: <span>{foundResourcesCount}</span>
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
    </section>
  );
}

type SelectOption<T extends string> = {
  value: T;
  label: string;
};

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
