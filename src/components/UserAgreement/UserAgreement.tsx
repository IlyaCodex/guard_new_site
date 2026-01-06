"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./UserAgreement.module.css";

const UserAgreement: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const lastUpdated = "01 декабря 2024";

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
            Пользовательское соглашение
          </span>
        </div>

        <header className={styles.header}>
          <h1 className={styles.title}>
            Пользовательское <span className={styles.gradient}>соглашение</span>
          </h1>
        </header>

        <div className={styles.sections}>
          <section className={styles.section}>
            <p className={styles.intro}>
              Настоящее Пользовательское соглашение (далее – «Соглашение»)
              является публичной офертой и определяет условия использования
              Telegram-бота{" "}
              <a
                href="https://t.me/GuardTunnel_bot"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                Guard Tunnel VPN
              </a>{" "}
              (далее – «Бот»), размещенного в мессенджере Telegram, между
              Администрацией Бота (далее – «Администрация») и Пользователем
              (далее – «Пользователь»).
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>1.</span>
              Предмет соглашения
            </h2>
            <div className={styles.sectionContent}>
              <div className={styles.item}>
                <span className={styles.itemNumber}>1.1.</span>
                <p>
                  Администрация предоставляет Пользователю доступ к Боту и его
                  функционалу на условиях, изложенных в настоящем Соглашении.
                </p>
              </div>
              <div className={styles.item}>
                <span className={styles.itemNumber}>1.2.</span>
                <p>
                  Пользователь, используя Бот, подтверждает свое полное и
                  безоговорочное согласие с условиями настоящего Соглашения.
                </p>
              </div>
              <div className={styles.item}>
                <span className={styles.itemNumber}>1.3.</span>
                <p>
                  Настоящее Соглашение является юридически обязательным
                  документом.
                </p>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>2.</span>
              Описание Бота и его функциональности
            </h2>
            <div className={styles.sectionContent}>
              <div className={styles.item}>
                <span className={styles.itemNumber}>2.1.</span>
                <p>
                  Бот Guard Tunnel VPN предназначен для предоставления
                  Пользователю доступа к сервисам виртуальной частной сети
                  (VPN), включая автоматизированное подключение, управление
                  параметрами использования сервиса, информирование о статусе
                  услуг, условиях их предоставления, а также иные сопутствующие
                  функции, реализуемые в рамках функциональных возможностей
                  Бота.
                </p>
              </div>
              <div className={styles.item}>
                <span className={styles.itemNumber}>2.2.</span>
                <p>
                  Перечень функций и возможностей Бота может быть изменен
                  Администрацией без предварительного уведомления Пользователя.
                </p>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>3.</span>
              Правила использования Бота
            </h2>
            <div className={styles.sectionContent}>
              <div className={styles.item}>
                <span className={styles.itemNumber}>3.1.</span>
                <p>
                  Пользователь обязуется использовать Бот исключительно в
                  соответствии с его целевым назначением и в рамках действующего
                  законодательства.
                </p>
              </div>
              <div className={styles.item}>
                <span className={styles.itemNumber}>3.2.</span>
                <div>
                  <p className={styles.itemIntro}>
                    Пользователь не имеет права:
                  </p>
                  <ul className={styles.list}>
                    <li>
                      Пытаться получить несанкционированный доступ к информации,
                      содержащейся в Боте.
                    </li>
                    <li>
                      Использовать Бот для распространения вредоносного
                      программного обеспечения, спама или другой незаконной
                      информации.
                    </li>
                    <li>
                      Вмешиваться в работу Бота, изменять его код или
                      функциональность.
                    </li>
                    <li>Нарушать права третьих лиц при использовании Бота.</li>
                  </ul>
                </div>
              </div>
              <div className={styles.item}>
                <span className={styles.itemNumber}>3.3.</span>
                <p>
                  Администрация оставляет за собой право ограничить или
                  прекратить доступ Пользователя к Боту в случае нарушения им
                  условий настоящего Соглашения.
                </p>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>4.</span>
              Ответственность сторон
            </h2>
            <div className={styles.sectionContent}>
              <div className={styles.item}>
                <span className={styles.itemNumber}>4.1.</span>
                <p>
                  Администрация не несет ответственности за убытки, причиненные
                  Пользователю в результате использования Бота, в том числе за
                  возможные ошибки в работе Бота, перерывы в работе, потерю
                  данных и т.д.
                </p>
              </div>
              <div className={styles.item}>
                <span className={styles.itemNumber}>4.2.</span>
                <p>
                  Пользователь несет полную ответственность за свои действия при
                  использовании Бота, а также за последствия таких действий.
                </p>
              </div>
              <div className={styles.item}>
                <span className={styles.itemNumber}>4.3.</span>
                <p>
                  Администрация не несет ответственности за содержание
                  информации, размещенной Пользователем в Боте.
                </p>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>5.</span>
              Обработка персональных данных
            </h2>
            <div className={styles.sectionContent}>
              <div className={styles.item}>
                <span className={styles.itemNumber}>5.1.</span>
                <p>
                  Администрация обязуется соблюдать конфиденциальность
                  персональных данных Пользователя, полученных в процессе
                  использования Бота.
                </p>
              </div>
              <div className={styles.item}>
                <span className={styles.itemNumber}>5.2.</span>
                <p>
                  Подробная информация об обработке персональных данных
                  содержится в{" "}
                  <Link href="/privacy" className={styles.link}>
                    Политике конфиденциальности
                  </Link>
                  , являющейся неотъемлемой частью настоящего Соглашения.
                </p>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>6.</span>
              Срок действия и порядок изменения Соглашения
            </h2>
            <div className={styles.sectionContent}>
              <div className={styles.item}>
                <span className={styles.itemNumber}>6.1.</span>
                <p>
                  Настоящее Соглашение вступает в силу с момента его принятия
                  Пользователем и действует бессрочно.
                </p>
              </div>
              <div className={styles.item}>
                <span className={styles.itemNumber}>6.2.</span>
                <p>
                  Администрация оставляет за собой право вносить изменения в
                  настоящее Соглашение. Информация об изменениях будет размещена
                  в Боте. Пользователь считается принявшим изменения, если он
                  продолжает использовать Бот после внесения изменений.
                </p>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>7.</span>
              Разрешение споров
            </h2>
            <div className={styles.sectionContent}>
              <div className={styles.item}>
                <span className={styles.itemNumber}>7.1.</span>
                <p>
                  Все споры, возникающие между Администрацией и Пользователем в
                  связи с настоящим Соглашением, подлежат разрешению в порядке,
                  предусмотренном действующим законодательством.
                </p>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>8.</span>
              Прочие условия
            </h2>
            <div className={styles.sectionContent}>
              <div className={styles.item}>
                <span className={styles.itemNumber}>8.1.</span>
                <p>
                  Во всем остальном, что не предусмотрено настоящим Соглашением,
                  стороны руководствуются действующим законодательством.
                </p>
              </div>
              <div className={styles.item}>
                <span className={styles.itemNumber}>8.2.</span>
                <p>
                  Если какое-либо положение настоящего Соглашения будет признано
                  недействительным, это не повлияет на действительность
                  остальных положений.
                </p>
              </div>
            </div>
          </section>

          <section className={styles.contactSection}>
            <h2 className={styles.sectionTitle}>
              Контактная информация:
            </h2>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>Поддержка:</span>
                <a
                  href="https://t.me/guardtunnel_support"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactLink}
                >
                  @guardtunnel_support
                </a>
              </div>
            </div>
          </section>
        </div>

      </motion.div>
    </div>
  );
};

export default UserAgreement;
