"use client";
import React from "react";
import { useSnow } from "@/contexts/SnowContext";
import SnowEffect from "@/components/SnowEffect/SnowEffect";

interface SnowWrapperProps {
  children: React.ReactNode;
}

const SnowWrapper: React.FC<SnowWrapperProps> = ({ children }) => {
  const { snowEnabled } = useSnow();

  return (
    <>
      <SnowEffect isEnabled={snowEnabled} />
      {children}
    </>
  );
};

export default SnowWrapper;
