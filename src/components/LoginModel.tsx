import React, { useState } from "react";
import { Lock, Eye, EyeOff, ShieldCheck, X } from "lucide-react";

interface LoginModelProps {
  onLogin: (password: string) => boolean;
  onClose: () => void;
  dark: boolean;
}

export function LoginModel({ onLogin, onClose, dark }: LoginModelProps) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const bg = dark ? "#0a0a0a" : "#fff";
  const textCol = dark ? "#e4e4e7" : "#18181b";
  const mutedCol = dark ? "#52525b" : "#a3a3a3";
  const borderCol = dark ? "#1f1f1f" : "#e5e7eb";
  const inputBg = dark ? "#141414" : "#f4f4f5";

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    await new Promise((r) => setTimeout(r, 400));
    const success = onLogin(password);
    if (!success) {
      setError("Incorrect password, Try again.");
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <div
          className="relative w-full max-w-sm overflow-hidden border shadow-2xl rounded-2xl"
          style={{
            background: bg,
            borderColor: borderCol,
            animation: shake ? "shake 0.4s ease" : undefined,
          }}
        >
          <div
            className="w-full h-1"
            style={{ background: "linear-gradient(90deg, #ef233c, #f59e0b)" }}
          />
          <div className="p-8">
            <div className="flex flex-col items-center mb-8">
              <div
                className="flex items-center justify-center mb-4 border w-14 h-14 rounded-2xl"
                style={{
                  background: "rgba(239,35,60,0.08)",
                  borderColor: "rgba(239,35,60,0.2)",
                }}
              >
                <Lock size={24} style={{ color: "#ef233c" }} />
              </div>
              <h2
                className="mb-1 text-2xl font-bold tracking-tight"
                style={{
                  color: textCol,
                  fontFamily: "'Space Grotesk', sans-serif",
                  letterSpacing: "-0.03em",
                }}
              >
                Admin Access
              </h2>
              <p className="font-mono text-sm" style={{ color: mutedCol }}>
                // enter password to continue
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="relative">
                <input
                 type={showPassword ? "text": "password"} 
                 placeholder="Enter admin password"
                 value={password}
                 onChange={(e) => {setPassword(e.target.value); setError("");}}
                 onKeyDown={(e) => {if(e.key === "Enter") handleSubmit();}}
                 autoFocus
                 className="w-full px-4 py-3 pr-12 font-mono text-sm transition-all border outline-none rounded-xl"
                 style={{
                  background: inputBg,
                  color: textCol,
                  borderColor: error ? "#ef233c" : borderCol,
                 }}
                 />
                 <button
                 type="button"
                 onClick={() => setShowPassword(!showPassword)}
                 className="absolute -translate-y-1/2 cursor-pointer right-3 top-1/2"
                 style={{ color: mutedCol}}
                 >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16}/>}
                 </button>
                </div>
                {error && (
                  <p className="flex items-center font-mono text-xs gap-1.5" style={{ color: "#ef233c" }}>
                    <span><X size={14}/></span>{error}
                  </p>
                )}
                <button
                type="button"
                onClick={handleSubmit}
                disabled={loading || !password}
                className="w-full py-3 font-mono text-sm font-bold transition-all cursor-pointer rounded-xl"
                style={{
                  background: loading || !password ? borderCol : "#ef233c",
                  color: loading || !password ? mutedCol : "#fff",
                  cursor: loading || !password ? "not-allowed" : "pointer",
                }}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                        <span className="w-4 h-4 border-2 rounded-full border-white/30 border-t-white animate-spin"/>                    
                        Verifying...
                    </span>
                  ): (
                    <span className="flex items-center justify-center gap-2">
                      <ShieldCheck size={16}/>                      
                      Enter Dashboard
                    </span>
                  )}
                  </button>        
            </div>
            <p
              className="text-center text-[11px] font-mono mt-6"
              style={{ color: mutedCol }}
            >
              Session clears when tab closes
            </p>
          </div>
        </div>
        <style>
          {`
            @keyframes shake {
            0%, 100% {transform: translateX(0);}
            20% {transform: translateX(-8px);}
            40% {transform: translateX(8px);}
            60% {transform: translateX(-5px);}
            80% {transform: translateX(-5px);}
            }

            @keyframes spin {
            to {transform: rotate(360deg);}
            }
            .animate-spin {animation: spin 0.7s linear infinite;}
            `}
        </style>
      </div>
    </div>
  );
}
