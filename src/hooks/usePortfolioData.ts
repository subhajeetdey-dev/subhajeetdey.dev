import { useState, useEffect, useRef } from "react";
import { defaultData } from "../data/defaultData";
import type { PortfolioData } from "../types/portfolio.types";
import {supabase} from "../lib/supabase"

const ROW_ID = 1;

export function usePortfolioData() {
  const [data, setData] = useState<PortfolioData>(defaultData);
  const [loading, setLoading] = useState(true);
  const isFirstLoad = useRef(true)
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    async function load() {
      const {data: row, error} = await supabase
      .from("portfolio").select("data").eq("id", ROW_ID).single();

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
      setTimeout(() => {isFirstLoad.current = false;}, 100)
    }

    load();
  }, []);

  useEffect(() => {
    if(loading || isFirstLoad.current) return;

    if(saveTimer.current) clearTimeout(saveTimer.current);    

    saveTimer.current = setTimeout(async () => {
      console.log("Saving to Supabase:", data.projects.length, "projects");

      const {error} = await supabase
      .from("portfolio")
      .upsert({
        id: ROW_ID,
        data: data,
        updated_at: new Date().toISOString(),
      });

      if(error) {
        console.error("Save error:", error.message);        
      } else {
        console.log('Saved ✓');
      }
    },1000)

    return () => {
      if(saveTimer.current) clearTimeout(saveTimer.current)
    };
  }, [data, loading]);

  const resetData = () => {
    isFirstLoad.current = false;
    setData(defaultData);
  }

  return { data, setData, loading, resetData };
}
