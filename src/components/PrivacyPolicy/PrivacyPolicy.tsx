"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./PrivacyPolicy.module.css";

const PrivacyPolicy: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <div className={styles.container}>
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Хлебные крошки */}
        <div className={styles.breadcrumbs}>
          <Link href="/" className={styles.breadcrumbLink}>
            Главная
          </Link>
          <span className={styles.separator}>/</span>
          <span className={styles.currentPage}>
            Политика конфиденциальности
          </span>
        </div>

        <header className={styles.header}>
          <h1 className={styles.title}>
            Политика <span className={styles.gradient}>конфиденциальности</span>
          </h1>
        </header>

        <div className={styles.sections}>
          <section className={styles.section}>
            <p className={styles.intro}>
              Настоящее соглашение о конфиденциальности использования
              персональных данных (далее — Соглашение о конфиденциальности)
              регулирует порядок сбора, использования и разглашения
              Администрацией информации о Пользователе (Принципал), которая
              может быть признана конфиденциальной или является таковой в
              соответствии с законодательством РФ.
            </p>
            <p className={styles.intro} style={{ marginTop: "1rem" }}>
              Термины, используемые в настоящем Соглашении о конфиденциальности,
              если не указано иное, применяются на условиях и в значении,
              определенном Агентским договором.
            </p>
            <p className={styles.intro} style={{ marginTop: "1rem" }}>
              Факт использования Пользователем Телеграм бота{" "}
              <a
                href="https://t.me/GuardTunnel_bot"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                @GuardTunnel_bot
              </a>
              , а также заключение Агентского договора являются полным и
              безоговорочным акцептом настоящего Соглашения. Незнание указанных
              соглашений не освобождает Пользователя от ответственности за
              несоблюдение их условий.
            </p>
            <p
              className={styles.intro}
              style={{ marginTop: "1rem", fontWeight: 500 }}
            >
              Если Пользователь не согласен с условиями настоящего Соглашения
              или не имеет права на заключение Соглашения, Пользователю следует
              незамедлительно прекратить любое использование Телеграм бота{" "}
              <a
                href="https://t.me/GuardTunnel_bot"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                @GuardTunnel_bot
              </a>
              .
            </p>
          </section>

          {/* Раздел 1 */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>1</span>
              ИСТОЧНИКИ ИНФОРМАЦИИ
            </h2>
            <div className={styles.sectionContent}>
              <div className={styles.item}>
                <span className={styles.itemNumber}>1.1</span>
                <p>
                  Информация, о которой идёт речь в настоящем соглашении, может
                  быть персонифицированной (прямо относящейся к конкретному лицу
                  или ассоциируемой с ним) и не персонифицированной (данные о
                  Пользователе Телеграм бота{" "}
                  <a
                    href="https://t.me/GuardTunnel_bot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    @GuardTunnel_bot
                  </a>
                  , полученные без привязки к конкретному лицу).
                </p>
              </div>

              <div className={styles.item}>
                <span className={styles.itemNumber}>1.2</span>
                <div>
                  <p className={styles.itemIntro}>
                    Администрации доступна информация, получаемая следующими
                    способами:
                  </p>
                  <ul className={styles.list}>
                    <li>
                      информация, полученная при переписке Администрации с
                      Пользователями Телеграм бота{" "}
                      <a
                        href="https://t.me/GuardTunnel_bot"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.link}
                      >
                        @GuardTunnel_bot
                      </a>{" "}
                      посредством электронной почты;
                    </li>
                    <li>
                      информация, предоставляемая Пользователями при регистрации
                      на Телеграм бота{" "}
                      <a
                        href="https://t.me/GuardTunnel_bot"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.link}
                      >
                        @GuardTunnel_bot
                      </a>{" "}
                      / заключении Агентского договора, в рамках мероприятий,
                      проводимых Администрацией Телеграм бота{" "}
                      <a
                        href="https://t.me/GuardTunnel_bot"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.link}
                      >
                        @GuardTunnel_bot
                      </a>
                      , опросах, заявках, формах обратной связи, путём внесения
                      записей в регистрационные онлайн-формы;
                    </li>
                    <li>
                      техническая информация — данные об интернет-провайдере
                      Пользователя, IP-адресе Пользователя, характеристиках
                      используемого ПК и программного обеспечения, данные о
                      загруженных и выгруженных на Телеграм бота{" "}
                      <a
                        href="https://t.me/GuardTunnel_bot"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.link}
                      >
                        @GuardTunnel_bot
                      </a>{" "}
                      файлах и т.п.;
                    </li>
                    <li>
                      статистические данные о предпочтениях отдельно взятого
                      Пользователя (тематика просмотренных страниц).
                    </li>
                  </ul>
                </div>
              </div>

              <div className={styles.item}>
                <span className={styles.itemNumber}>1.3</span>
                <p>
                  Конфиденциальной, согласно настоящему Соглашению, может быть
                  признана лишь информация, хранящаяся в базе данных Телеграм
                  бота{" "}
                  <a
                    href="https://t.me/GuardTunnel_bot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    @GuardTunnel_bot
                  </a>{" "}
                  в зашифрованном виде и доступная для просмотра исключительно
                  Администрации Телеграм бота{" "}
                  <a
                    href="https://t.me/GuardTunnel_bot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    @GuardTunnel_bot
                  </a>
                  .
                </p>
              </div>

              <div className={styles.item}>
                <span className={styles.itemNumber}>1.4</span>
                <p>
                  Информация о лице, добровольно размещённая им в общих разделах
                  Телеграм бота{" "}
                  <a
                    href="https://t.me/GuardTunnel_bot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    @GuardTunnel_bot
                  </a>{" "}
                  бота при заполнении регистрационных форм и доступная любому
                  другому пользователю Телеграм бота{" "}
                  <a
                    href="https://t.me/GuardTunnel_bot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    @GuardTunnel_bot
                  </a>
                  , или информация, которая может быть свободно получена из
                  других общедоступных источников, не является конфиденциальной.
                </p>
              </div>
            </div>
          </section>

          {/* Раздел 2 */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>2</span>
              БЕЗОПАСНОСТЬ
            </h2>
            <div className={styles.sectionContent}>
              <div className={styles.item}>
                <span className={styles.itemNumber}>2.1</span>
                <p>
                  Администрация Телеграм бота{" "}
                  <a
                    href="https://t.me/GuardTunnel_bot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    @GuardTunnel_bot
                  </a>{" "}
                  использует современные технологии обеспечения
                  конфиденциальности персональных данных, данных, полученных из
                  регистрационных форм, оставляемых Пользователями Телеграм бота{" "}
                  <a
                    href="https://t.me/GuardTunnel_bot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    @GuardTunnel_bot
                  </a>
                  , с целью обеспечения максимальной защиты информации.
                </p>
              </div>

              <div className={styles.item}>
                <span className={styles.itemNumber}>2.2</span>
                <p>
                  Доступ к личной информации Пользователя осуществляется через
                  систему авторизации с логином и паролем. Пользователь
                  обязуется самостоятельно обеспечить сохранность
                  авторизационных данных и ни под каким предлогом не разглашать
                  их третьим лицам. Любые изменения личной информации, внесённые
                  посредством авторизационных данных, будут считаться
                  осуществлёнными лично Пользователем.
                </p>
              </div>

              <div className={styles.item}>
                <span className={styles.itemNumber}>2.3</span>
                <p>
                  Сбор, хранение, использование, обработка, разглашение
                  информации, полученной Администрацией Телеграм бота{" "}
                  <a
                    href="https://t.me/GuardTunnel_bot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    @GuardTunnel_bot
                  </a>{" "}
                  в результате посещения пользователем Телеграм бота{" "}
                  <a
                    href="https://t.me/GuardTunnel_bot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    @GuardTunnel_bot
                  </a>{" "}
                  и/или заполнения регистрационных форм, в том числе и
                  персональные данные пользователей, осуществляется
                  администрацией Телеграм бота{" "}
                  <a
                    href="https://t.me/GuardTunnel_bot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    @GuardTunnel_bot
                  </a>{" "}
                  в соответствии с законодательством РФ.
                </p>
              </div>

              <div className={styles.item}>
                <span className={styles.itemNumber}>2.4</span>
                <p>
                  Пользователь осознает и предоставляет согласие на сбор и
                  обработку своих персональных данных Администрацией Телеграм
                  бота{" "}
                  <a
                    href="https://t.me/GuardTunnel_bot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    @GuardTunnel_bot
                  </a>{" "}
                  в рамках и с целью, предусмотренными условиями Агентского
                  договора; обязуется уведомлять Администрацию Телеграм бота{" "}
                  <a
                    href="https://t.me/GuardTunnel_bot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    @GuardTunnel_bot
                  </a>{" "}
                  об изменениях его персональных данных.
                </p>
              </div>
            </div>
          </section>

          {/* Раздел 3 */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>3</span>
              ЗАКЛЮЧИТЕЛЬНЫЕ ПОЛОЖЕНИЯ
            </h2>
            <div className={styles.sectionContent}>
              <div className={styles.item}>
                <span className={styles.itemNumber}>3.1</span>
                <p>
                  Принципал, заинтересованный в услугах Агента, заполняет
                  специальную форму на Телеграм бота{" "}
                  <a
                    href="https://t.me/GuardTunnel_bot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    @GuardTunnel_bot
                  </a>
                  . При оформлении заказа Принципал указывает UID, ID, Server
                  ID, Zone ID, E-mail учётной записи игры, на которую
                  приобретается Цифровая Услуга, а также количество требуемой
                  игровой валюты или требуемые игровые предметы.
                </p>
              </div>

              <div className={styles.item}>
                <span className={styles.itemNumber}>3.2</span>
                <p>
                  Деятельность Администрации Телеграм бота{" "}
                  <a
                    href="https://t.me/GuardTunnel_bot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    @GuardTunnel_bot
                  </a>{" "}
                  осуществляется в соответствии с законодательством РФ. Любые
                  претензии, споры, официальные обращения будут рассматриваться
                  исключительно в порядке, предусмотренном законодательством РФ.
                </p>
              </div>

              <div className={styles.item}>
                <span className={styles.itemNumber}>3.3</span>
                <p>
                  Администрация Телеграм бота{" "}
                  <a
                    href="https://t.me/GuardTunnel_bot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    @GuardTunnel_bot
                  </a>{" "}
                  не несёт ответственности за любые прямые или косвенные убытки,
                  понесённые Пользователями или третьими сторонами, а также за
                  упущенную выгоду при использовании, невозможности
                  использования или результатов использования Телеграм бота{" "}
                  <a
                    href="https://t.me/GuardTunnel_bot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    @GuardTunnel_bot
                  </a>
                  .
                </p>
              </div>

              <div className={styles.item}>
                <span className={styles.itemNumber}>3.4</span>
                <p>
                  Условия настоящего Соглашения могут быть изменены
                  Администрацией Телеграм бота{" "}
                  <a
                    href="https://t.me/GuardTunnel_bot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    @GuardTunnel_bot
                  </a>{" "}
                  в одностороннем порядке.
                </p>
              </div>
            </div>
          </section>

        </div>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicy;
