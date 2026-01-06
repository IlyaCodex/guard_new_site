"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

interface SnowContextType {
  snowEnabled: boolean;
  toggleSnow: () => void;
}

const SnowContext = createContext<SnowContextType | undefined>(undefined);

export const SnowProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [snowEnabled, setSnowEnabled] = useState(false);

  useEffect(() => {
    const savedState = localStorage.getItem("snowEnabled");
    if (savedState !== null) {
      setSnowEnabled(JSON.parse(savedState));
    } else {
      const currentMonth = new Date().getMonth();
      setSnowEnabled(
        currentMonth === 11 || currentMonth === 0 || currentMonth === 1
      );
    }
  }, []);

  const toggleSnow = () => {
    setSnowEnabled((prev) => {
      const newState = !prev;
      localStorage.setItem("snowEnabled", JSON.stringify(newState));
      return newState;
    });
  };

  return (
    <SnowContext.Provider value={{ snowEnabled, toggleSnow }}>
      {children}
    </SnowContext.Provider>
  );
};

export const useSnow = () => {
  const context = useContext(SnowContext);
  if (context === undefined) {
    throw new Error("useSnow must be used within a SnowProvider");
  }
  return context;
};
