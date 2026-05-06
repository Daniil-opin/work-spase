import { useState } from "react";

import styles from "./index.module.scss";

type FaqItem = {
  question: string;
  answer: string;
};

type SupportItem = {
  title: string;
  description: string;
  value: string;
};

type GuideItem = {
  title: string;
  description: string;
};

const faqItems: FaqItem[] = [
  {
    question: "Как забронировать рабочее место?",
    answer:
      "Откройте карту рабочих мест, выберите свободное место, укажите дату и время, затем подтвердите бронирование.",
  },
  {
    question: "Как забронировать переговорную?",
    answer:
      "Перейдите в раздел переговорных, выберите подходящую комнату, дату, время и подтвердите бронирование.",
  },
  {
    question: "Как выполнить чек-ин?",
    answer:
      "Откройте активное бронирование и нажмите кнопку чек-ина. При необходимости отсканируйте QR-код на рабочем месте.",
  },
  {
    question: "Что делать, если я опоздал на бронирование?",
    answer:
      "Если время чек-ина ещё доступно, выполните его в карточке бронирования. Иначе бронирование может быть отменено системой.",
  },
  {
    question: "Как перенести или отменить бронирование?",
    answer:
      "Откройте нужное бронирование и выберите действие переноса или отмены. После изменения данные обновятся автоматически.",
  },
  {
    question: "Как добавить гостя к бронированию?",
    answer:
      "В карточке бронирования выберите добавление гостя и укажите его данные.",
  },
  {
    question: "Как перенести серию бронирований?",
    answer:
      "Откройте повторяющееся бронирование и выберите изменение всей серии.",
  },
  {
    question: "Как оформить визит гостя?",
    answer:
      "Создайте гостевой визит, укажите данные гостя, дату, время и ответственное лицо.",
  },
  {
    question: "Что означают цвета на карте?",
    answer:
      "Цвета показывают статус мест: свободно, занято, выбрано или недоступно.",
  },
  {
    question: "За сколько времени можно бронировать место?",
    answer:
      "Доступный период бронирования зависит от правил компании и настроек системы.",
  },
  {
    question: "Как добавить место в избранное?",
    answer: "Откройте карточку места и нажмите на иконку избранного.",
  },
  {
    question: "Что делать при технических проблемах?",
    answer:
      "Обратитесь в службу поддержки по email или телефону, указанным ниже.",
  },
];

const supportItems: SupportItem[] = [
  {
    title: "Email поддержка",
    description: "Ответим в течение 24 часов",
    value: "support@company.com",
  },
  {
    title: "Телефон",
    description: "Пн-Пт с 9:00 до 18:00",
    value: "+7 (495) 123-45-67",
  },
];

const guideItems: GuideItem[] = [
  {
    title: "Первое бронирование",
    description: "Пошаговое руководство для новых пользователей",
  },
  {
    title: "Видеоинструкции",
    description: "Обучающие видео по основным функциям",
  },
  {
    title: "Политики использования",
    description: "Правила бронирования и no-show",
  },
  {
    title: "Горячие клавиши",
    description: "Быстрое управление с клавиатуры",
  },
];

function FaqIcon() {
  return (
    <svg
      className={styles.sectionIcon}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        d="M7 3.5h10A1.5 1.5 0 0 1 18.5 5v14A1.5 1.5 0 0 1 17 20.5H7A1.5 1.5 0 0 1 5.5 19V5A1.5 1.5 0 0 1 7 3.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M8.5 8h7M8.5 12h7M8.5 16h4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg
      className={styles.sectionIcon}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        d="M5.5 18.5 4 21l3.2-1.1a8.2 8.2 0 1 0-2.6-2.8Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg
      className={styles.chevron}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        d="m7 10 5 5 5-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function HelpPage() {
  const [openedFaqIndex, setOpenedFaqIndex] = useState<number | null>(null);

  const handleFaqClick = (index: number) => {
    setOpenedFaqIndex((currentIndex) =>
      currentIndex === index ? null : index,
    );
  };

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Помощь</h1>
          <p className={styles.subtitle}>Ответы на часто задаваемые вопросы</p>
        </header>

        <section className={styles.card} aria-labelledby="faq-title">
          <div className={styles.sectionHeader}>
            <FaqIcon />

            <div>
              <h2 className={styles.sectionTitle} id="faq-title">
                Часто задаваемые вопросы
              </h2>
              <p className={styles.sectionDescription}>
                Найдите ответы на популярные вопросы о работе с системой
              </p>
            </div>
          </div>

          <div className={styles.faqList}>
            {faqItems.map((item, index) => {
              const isOpened = openedFaqIndex === index;

              return (
                <div className={styles.faqItem} key={item.question}>
                  <button
                    className={styles.faqButton}
                    type="button"
                    onClick={() => handleFaqClick(index)}
                    aria-expanded={isOpened}
                  >
                    <span>{item.question}</span>
                    <ChevronIcon />
                  </button>

                  {isOpened && (
                    <div className={styles.faqAnswer}>
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <section className={styles.card} aria-labelledby="support-title">
          <div className={styles.sectionHeader}>
            <MessageIcon />

            <div>
              <h2 className={styles.sectionTitle} id="support-title">
                Нужна дополнительная помощь?
              </h2>
              <p className={styles.sectionDescription}>
                Свяжитесь с нашей службой поддержки
              </p>
            </div>
          </div>

          <div className={styles.supportGrid}>
            {supportItems.map((item) => (
              <article className={styles.supportCard} key={item.title}>
                <h3 className={styles.supportTitle}>{item.title}</h3>
                <p className={styles.supportDescription}>{item.description}</p>
                <div className={styles.supportValue}>{item.value}</div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.card} aria-labelledby="guides-title">
          <h2 className={styles.sectionTitle} id="guides-title">
            Быстрые инструкции
          </h2>

          <div className={styles.guideGrid}>
            {guideItems.map((item) => (
              <article className={styles.guideCard} key={item.title}>
                <h3 className={styles.guideTitle}>{item.title}</h3>
                <p className={styles.guideDescription}>{item.description}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
