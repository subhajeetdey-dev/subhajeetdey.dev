import { useState, useEffect } from "react";
import { defaultData } from "../data/defaultData";
import type { PortfolioData } from "../types/portfolio.types";
import {supabase} from "../lib/supabase"

const ROW_ID = 1;

export function usePortfolioData() {
  const [data, setData] = useState<PortfolioData>(defaultData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("portfolio").select("data").eq("id", ROW_ID).single()
    .then(({data: row, error}) => {
      if(error){
        console.error("Supabase load error: ", error.message);
      } else if(row?.data) {
        setData({
          ...defaultData,
          ...row.data,
          meta: {...defaultData.meta, ...row.data.meta},
          about: { ...defaultData.about, ...row.data.about },
          testimonial: {...defaultData.testimonial, ...row.data.testimonial},
          projects: row.data.projects ?? [],
          skills: row.data.skills ?? defaultData.skills,
        });
      }
      setLoading(false);
    });
  });

  useEffect(() => {
    if(loading) return;

    supabase
    .from("portfolio")
    .update({data, updated_at: new Date().toISOString()})
    .eq("id", ROW_ID)
    .then(({error}) => {
      if(error) console.error("Supabase save error:", error.message);      
    });
  }, [data, loading]);

  const resetData = () => setData(defaultData)

  return { data, setData, loading, resetData };
}
