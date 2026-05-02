import React, { useState } from "react";
import { accentPalette, typeBadge } from "../constants/theme";
import type { PortfolioData } from "../types/portfolio.types";
import { Sparkle, Check, X  } from 'lucide-react';


interface CMSPanelProps {
  data: PortfolioData;
  setData: React.Dispatch<React.SetStateAction<PortfolioData>>;
  onClose: () => void;
  dark: boolean;
}

export function CMSPanel({ data, setData, onClose, dark }: CMSPanelProps) {
  const [tab, setTab] = useState<
    "meta" | "about" | "projects" | "skills" | "testimonial"
  >("meta");
  const [saved, setSaved] = useState(false);

  const bg = dark ? "0a0a0a" : "#fff";
  const textCol = dark ? "#e4e4e7" : "#18181b";
  const mutedCol = dark ? "#52525b" : "#a3a3a3";
  const borderCol = dark ? "#1f1f1f" : "#e5e7eb";
  const inputBg = dark ? "#141414" : "#f4f4f5";

  const update = <S extends keyof PortfolioData>(
    section: S,
    key: string,
    val: unknown,
  ) => {
    setData((prev) => ({
      ...prev,
      [section]: { ...(prev[section] as object) },
      [key]: val,
    }));
  };

  const updateNested = <S extends keyof PortfolioData>(
    section: S,
    index: number,
    key: string,
    val: unknown,
  ) => {
    setData((prev) => {
      const arr = [...(prev[section] as unknown[])];
      arr[index] = { ...(arr[index] as object), [key]: val };
      return { ...prev, [section]: arr };
    });
  };

  const FieldInput = ({
    label,
    value,
    onChange,
    multiline = false,
  }: {
    label: string;
    value: string;
    onChange: () => void;
    multiline?: boolean;
  }) => (
    <div className="mb-4">
      <label
        className="block text-[10px] font-mono uppercase tracking-widest mb-1.5"
        style={{ color: mutedCol }}
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 font-sans text-sm border rounded-lg outline-none resize-none"
          style={{
            background: inputBg,
            color: textCol,
            borderColor: borderCol,
          }}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 font-sans text-sm border rounded-lg outline-none"
          style={{
            background: inputBg,
            color: textCol,
            borderColor: borderCol,
          }}
        />
      )}
    </div>
  );

  return(
     <div className="fixed inset-0 z-50 flex items-stretch">
        <div className="flex-1 bg-black/70 backdrop-blur-sm" onClick={onClose} />       

        <div
        className="flex flex-col w-full max-w-md overflow-hidden shadow-2xl"
        style={{background: bg, borderLeft: `1px solid ${borderCol}`}}
        >
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: borderCol}}>
                <div>
                    <div className="font-mono text-sm font-bold" style={{ color: textCol}}>
                        <span className="flex items-center justify-center gap-1"><Sparkle />CMS Editor</span>
                    </div>
                    <div className="text-[11px] font-mono mt-0.5" style={{ color: mutedCol}}>// edit portfolio</div>
                    <div className="flex items-center gap-2">
                        <button
                        onClick={() => {setSaved(true); setTimeout(() => setSaved(false), 200);}}
                        className="px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-all"
                        style={{ background: saved ? "#22c55e" : "#ef233c", color: "#fff"}}
                        >
                            {saved? (<span className="flex items-center justify-center gap-1"><Check size={16} strokeWidth={3} />saved</span>): "save"}
                        </button>
                        <button
                        onClick={onClose}
                        className="flex items-center justify-center font-mono text-xs rounded-full w-7 h-7"
                        style={{ background: inputBg, color: mutedCol}}
                        >
                            <X size={16} strokeWidth={3} />
                        </button>
                    </div>
                </div>
                <div className="flex gap-1 px-4 py-2 overflow-x-auto border-b" style={{borderColor: borderCol}}>
                    {(["meta", "about", "projects", "skills", "testimonial"] as const).map((t) => (
                        <button
                        key={t}
                        onClick={() => setTab(t)}
                        className="px-3 py-1.5 rounded-lg text-[11px] font-mono whitespace-nowrap transition-all"
                        style={{
                            background: tab === t ? (dark ? "#1a1a1a":"#f0f0f0"): "transparent",
                            color: tab === t ? textCol: mutedCol,
                        }}
                        >
                            {t}
                        </button>
                    ))}                    
                </div>
                
                // pending: update content part 
            </div>            
        </div>
     </div>
    );
}
