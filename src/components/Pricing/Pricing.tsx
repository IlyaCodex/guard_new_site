"use client";
import React, { useState } from "react";
import styles from "./Pricing.module.css";

interface PricingPlan {
  id: number;
  duration: number;
  durationText: string;
  price: number;
  originalPrice: number;
  discount?: number;
  discountDecor?: string;
  popular?: boolean;
  perMonth?: number;
}

const pricingPlans: PricingPlan[] = [
  {
    id: 1,
    duration: 1,
    durationText: "1 месяц",
    price: 99,
    originalPrice: 199,
    discountDecor: "Выгодно",
    perMonth: 99,
  },
  {
    id: 2,
    duration: 3,
    durationText: "3 месяца",
    price: 270,
    originalPrice: 297,
    discount: 15,
    perMonth: 90,
  },
  {
    id: 3,
    duration: 6,
    durationText: "6 месяцев",
    price: 500,
    originalPrice: 594,
    discount: 17,
    perMonth: 83,
  },
  {
    id: 4,
    duration: 12,
    durationText: "12 месяцев",
    price: 900,
    originalPrice: 1188,
    discount: 25,
    perMonth: 75,
  },
];

const TELEGRAM_BOT_URL = "https://t.me/GuardTunnel_bot";

const Pricing: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);

  const handlePurchase = (planId: number) => {
    window.open(
      `${TELEGRAM_BOT_URL}?start=plan_${planId}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <section id="pricing" className={styles.pricing}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Выберите <span className={styles.gradient}>период подписки</span>
          </h2>
          <p className={styles.subtitle}>
            Чем дольше период — тем выгоднее цена
          </p>
        </div>

        <div className={styles.plansWrapper}>
          <div className={styles.plansGrid}>
            {pricingPlans.map((plan) => (
              <div
                key={plan.id}
                className={`${styles.planCard} ${
                  selectedPlan === plan.id ? styles.selected : ""
                } ${plan.popular ? styles.popular : ""}`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && (
                  <div className={styles.popularBadge}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M8 0L10 6L16 6L11 10L13 16L8 12L3 16L5 10L0 6L6 6L8 0Z"
                        fill="currentColor"
                      />
                    </svg>
                    Популярный выбор
                  </div>
                )}

                {plan.discountDecor && (
                  <div className={styles.discountBadge}>
                    {plan.discountDecor}
                  </div>
                )}
                {plan.discount && (
                  <div className={styles.discountBadge}>-{plan.discount}%</div>
                )}

                <div className={styles.planContent}>
                  <div className={styles.planDuration}>
                    <span className={styles.durationNumber}>
                      {plan.duration}
                    </span>
                    <span className={styles.durationUnit}>
                      {plan.duration === 1
                        ? "месяц"
                        : plan.duration === 3
                        ? "месяца"
                        : "месяцев"}
                    </span>
                  </div>

                  <div className={styles.priceSection}>
                    <div className={styles.mainPrice}>
                      <span className={styles.currency}>₽</span>
                      <span className={styles.price}>{plan.price}</span>
                    </div>

                    {plan.originalPrice !== plan.price && (
                      <div className={styles.originalPrice}>
                        ₽{plan.originalPrice}
                      </div>
                    )}
                  </div>

                  {plan.duration > 1 ? (
                    <div className={styles.perMonth}>
                      ₽{plan.perMonth} / месяц
                    </div>
                  ) : (
                    <div className={styles.perMonth}>
                      ₽{plan.perMonth} / месяц
                    </div>
                  )}

                  <button
                    className={styles.selectBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePurchase(plan.id);
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M3 10L8 15L17 5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Приобрести
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.paymentSection}>
          <div className={styles.paymentMethods}>
            <h4 className={styles.paymentTitle}>Принимаем к оплате</h4>
            <div className={styles.paymentGrid}>
              <div className={styles.paymentMethod}>
                <div className={styles.paymentIcon}>
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <rect
                      x="2"
                      y="8"
                      width="28"
                      height="18"
                      rx="3"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path d="M2 14H30" stroke="currentColor" strokeWidth="2" />
                    <rect
                      x="6"
                      y="19"
                      width="8"
                      height="3"
                      rx="1"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <span>Банковские карты</span>
                <div className={styles.paymentLogos}>
                  <span className={styles.visa}>VISA</span>
                  <span className={styles.mastercard}>MC</span>
                  <span className={styles.mir}>МИР</span>
                </div>
              </div>

              <div className={styles.paymentMethod}>
                <div className={styles.paymentIcon}>
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <rect
                      x="4"
                      y="6"
                      width="24"
                      height="20"
                      rx="4"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <circle
                      cx="16"
                      cy="16"
                      r="4"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M16 2V6M16 26V30"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <span>СБП</span>
                <div className={styles.paymentDescription}>
                  Система быстрых платежей
                </div>
              </div>

              <div className={styles.paymentMethod}>
                <div className={styles.paymentIcon}>
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <circle
                      cx="16"
                      cy="16"
                      r="14"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M16 8V16L20 20"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <circle cx="16" cy="16" r="3" fill="currentColor" />
                  </svg>
                </div>
                <span>Криптовалюта</span>
                <div className={styles.cryptoLogos}>
                  <span>BTC</span>
                  <span>ETH</span>
                  <span>USDT</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
