"use client";

import { useEffect } from "react";
import { useStateContext } from "../context/stateContext";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
    const {theme} = useStateContext();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return <>{children}</>;
}
