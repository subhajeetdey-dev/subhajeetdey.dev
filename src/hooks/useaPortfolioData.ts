import { useState, useEffect } from "react";
import { defaultData } from "../data/defaultData";
import type { PortfolioData } from "../types/portfolio.types";

const STORAGE_KEY = "portfolio_data";

export function usePortfolioData() {
  const [data, setData] = useState<PortfolioData>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return defaultData;

      const parsed = JSON.parse(stored) as PortfolioData;

      return {
        ...defaultData,
        ...parsed,
        meta: { ...defaultData.meta, ...parsed.meta },
        about: { ...defaultData.about, ...parsed.about },
        projects: parsed.projects ?? defaultData.projects,
        skills: parsed.skills ?? defaultData.skills,
      };
    } catch {
      return defaultData;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      console.warn("localStorage write failed!");
    }
  }, [data]);

  const resetData = () => {
    localStorage.removeItem(STORAGE_KEY);
    setData(defaultData);
  };

  return { data, setData, resetData };
}
