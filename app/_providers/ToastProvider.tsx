"use client";

import React from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider, useTheme } from 'next-themes'

type themeProps = {
  children: React.ReactNode;
};
function ToastProvider({ children }: themeProps) {
  const {theme} = useTheme();
  return (<>
    <ToastContainer theme={theme === 'emerald' ? 'light': 'dark'}/>
    {children}
  </>);
}

export default ToastProvider;