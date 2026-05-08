import { ChangeEvent, FormEvent, useState } from "react";

import styles from "./index.module.scss";

type ProfileForm = {
  fullName: string;
  position: string;
  department: string;
  publicEmail: string;
  bio: string;
  pronouns: string;
  socialLink1: string;
  socialLink2: string;
  socialLink3: string;
};

const initialForm: ProfileForm = {
  fullName: "Якименко Никита Дмитриевич",
  position: "Spring-разработчик",
  department: "Веб-разработка",
  publicEmail: "yakim.nik@corp.by",
  bio: "",
  pronouns: "he/him",
  socialLink1: "",
  socialLink2: "",
  socialLink3: "",
};

export default function PublicProfilePage() {
  const [form, setForm] = useState<ProfileForm>(initialForm);

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;

    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("Профиль сохранён:", form);
  };

  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Публичный профиль</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.mainColumn}>
          <ProfileField
            label="ФИО"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            helperText="Изменение ФИО доступно только администратору, поэтому вы можете направить ему запрос на корректировку данных личного кабинета"
          />

          <ProfileField
            label="Должность"
            name="position"
            value={form.position}
            onChange={handleChange}
            helperText="Изменение должности доступно только администратору, поэтому вы можете направить ему запрос на корректировку данных профиля"
          />

          <ProfileField
            label="Отдел"
            name="department"
            value={form.department}
            onChange={handleChange}
            helperText="Изменение отдела доступно только администратору, поэтому вы можете направить ему запрос на корректировку данных профиля"
          />

          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="publicEmail">
              Публичная электронная почта
            </label>

            <div className={styles.emailRow}>
              <select
                id="publicEmail"
                name="publicEmail"
                className={styles.select}
                value={form.publicEmail}
                onChange={handleChange}
              >
                <option value="yakim.nik@corp.by">yakim.nik@corp.by</option>
                <option value="nikita.yakimenko@corp.by">
                  nikita.yakimenko@corp.by
                </option>
              </select>

              <button className={styles.deleteButton} type="button">
                <CloseIcon />
                <span>Удалить</span>
              </button>
            </div>

            <p className={styles.helperText}>
              Вы можете управлять публичностью адреса электронной почты в
              разделе <a href="/settings/email">настроек электронной почты</a>
            </p>
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="bio">
              Био
            </label>

            <textarea
              id="bio"
              name="bio"
              className={styles.textarea}
              value={form.bio}
              onChange={handleChange}
              placeholder="Расскажи немного о себе"
            />

            <p className={styles.helperText}>
              Вы можете ввести другую информацию, чтобы согласовать на ней.
            </p>
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="pronouns">
              Местоимения
            </label>

            <select
              id="pronouns"
              name="pronouns"
              className={styles.shortSelect}
              value={form.pronouns}
              onChange={handleChange}
            >
              <option value="he/him">Он / его</option>
              <option value="she/her">Она / её</option>
              <option value="they/them">Они / их</option>
              <option value="not-selected">Не указывать</option>
            </select>
          </div>

          <div className={styles.fieldGroup}>
            <div className={styles.label}>Социальные сети</div>

            <SocialInput
              name="socialLink1"
              value={form.socialLink1}
              placeholder="Ссылка на профиль в социальной сети 1"
              onChange={handleChange}
            />

            <SocialInput
              name="socialLink2"
              value={form.socialLink2}
              placeholder="Ссылка на профиль в социальной сети 2"
              onChange={handleChange}
            />

            <SocialInput
              name="socialLink3"
              value={form.socialLink3}
              placeholder="Ссылка на профиль в социальной сети 3"
              onChange={handleChange}
            />
          </div>
        </div>

        <aside className={styles.avatarColumn}>
          <div className={styles.avatarTitle}>Изображение профиля</div>

          <div className={styles.avatarWrapper}>
            <img
              className={styles.avatarImage}
              src="/images/avatar.jpg"
              alt="Аватар пользователя"
            />
          </div>

          <button className={styles.editAvatarButton} type="button">
            <EditIcon />
            <span>Редактировать</span>
          </button>
        </aside>
      </form>
    </section>
  );
}

type ProfileFieldProps = {
  label: string;
  name: keyof ProfileForm;
  value: string;
  helperText: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

function ProfileField({
  label,
  name,
  value,
  helperText,
  onChange,
}: ProfileFieldProps) {
  return (
    <div className={styles.fieldGroup}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>

      <div className={styles.inputRow}>
        <input
          id={name}
          name={name}
          className={styles.input}
          value={value}
          onChange={onChange}
          type="text"
        />

        <button
          className={styles.iconButton}
          type="button"
          aria-label="Редактировать"
        >
          <EditUserIcon />
        </button>
      </div>

      <p className={styles.helperText}>{helperText}</p>
    </div>
  );
}

type SocialInputProps = {
  name: keyof ProfileForm;
  value: string;
  placeholder: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

function SocialInput({ name, value, placeholder, onChange }: SocialInputProps) {
  return (
    <div className={styles.socialRow}>
      <LinkIcon />

      <input
        className={styles.socialInput}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type="text"
      />
    </div>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 120 120" fill="none">
      <circle cx="60" cy="36" r="18" fill="currentColor" />
      <path
        d="M26 94C29 72 43 62 60 62C77 62 91 72 94 94H26Z"
        fill="currentColor"
      />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M5 19L6.4 14.2L16.7 3.9C17.5 3.1 18.8 3.1 19.6 3.9L20.1 4.4C20.9 5.2 20.9 6.5 20.1 7.3L9.8 17.6L5 19Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M15.5 5.2L18.8 8.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function EditUserIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="9" cy="7" r="3" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M3.5 18C4.2 14.8 6.1 13 9 13C11.2 13 12.8 14 13.8 15.8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M15 19L16 15.8L19.7 12.1C20.2 11.6 21 11.6 21.5 12.1C22 12.6 22 13.4 21.5 13.9L17.8 17.6L15 19Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M6 6L18 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M9.8 13.8L14.2 9.4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M10.8 7.2L12.4 5.6C14.1 3.9 16.8 3.9 18.5 5.6C20.2 7.3 20.2 10 18.5 11.7L16.9 13.3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M13.2 16.8L11.6 18.4C9.9 20.1 7.2 20.1 5.5 18.4C3.8 16.7 3.8 14 5.5 12.3L7.1 10.7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
