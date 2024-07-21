"use client";
import React from "react";
import ToastProvider from "./ToastProvider";

const AppProviders = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      {children}
      <ToastProvider />
    </>
  );
};

export default AppProviders;
