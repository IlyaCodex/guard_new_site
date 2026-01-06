"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import styles from "./SnowEffect.module.css";

const Snowfall = dynamic(() => import("react-snowfall"), {
  ssr: false,
});

interface SnowEffectProps {
  isEnabled: boolean;
}

const SnowEffect: React.FC<SnowEffectProps> = ({ isEnabled }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isEnabled) return null;

  return (
    <div className={styles.snowContainer}>
      <Snowfall
        color="#ffffff"
        snowflakeCount={150}
        style={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          zIndex: 100,
          pointerEvents: "none",
        }}
        speed={[0.5, 2.5]}
        wind={[-0.5, 1.0]}
        radius={[0.5, 3.0]}
      />
    </div>
  );
};

export default SnowEffect;
