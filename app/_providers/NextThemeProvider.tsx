"use client";

import React from "react";
import { ThemeProvider } from 'next-themes'

type themeProps = {
  children: React.ReactNode;
};
function NextThemeProvider({ children }: themeProps) {
  return <ThemeProvider themes={['forest', 'emerald']} >{children}</ThemeProvider>;
}

export default NextThemeProvider;