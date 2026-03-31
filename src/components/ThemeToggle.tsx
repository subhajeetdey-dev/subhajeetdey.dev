"use client";

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export default function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  return (
    <>
      <style>{`
        @keyframes float-sun {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-2px); }
        }
        @keyframes float-moon {
          0%, 100% { transform: translateY(0px) rotate(-15deg); }
          50% { transform: translateY(-2px) rotate(-15deg); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.2; transform: scale(0.5); }
        }
        @keyframes cloud-transfer-hub {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(2px); }
        }
      `}</style>

      <button
        onClick={onToggle}
        aria-label="Toggle Theme"
        style={{
          width: "64px",
          height: "30px",
          borderRadius: "15px",
          position: "relative",
          cursor: "pointer",
          overflow: "hidden",
          border: "none",
          padding: 0,
          boxShadow: isDark
            ? "0 4px 14px rgba(0,0,20,0.5), inset 0 1px 2px rgba(255,255,255,0.05)"
            : "0 4px 14px rgba(100,120,200,0.25), inset 0 1px 2px rgba(255,255,255,0.6)",
          transition: "box-shadow 0.5s ease",
          flexShrink: 0,
        }}
      >
        <div style={{
          position: "absolute", inset: 0,
          background: isDark
            ? "linear-gradient(135deg, #1e2a4a 0%, #0d1b3e 100%)"
            : "linear-gradient(135deg, #c9d8f0 0%, #b8cce8 100%)",
          transition: "background 0.5s ease",
        }} />

        {[
          { x: 7, y: 5, size: 1.5, delay: "0s" },
          { x: 14, y: 13, size: 1.2, delay: "0.4s" },
          { x: 22, y: 6, size: 1.5, delay: "0.8s" },
          { x: 18, y: 19, size: 1.2, delay: "0.2s" },
        ].map((star, i) => (
          <div key={i} style={{
            position: "absolute",
            left: star.x, top: star.y,
            width: star.size, height: star.size,
            borderRadius: "50%",
            background: "#fff",
            opacity: isDark ? 1 : 0,
            transition: "opacity 0.5s ease",
            animation: `twinkle ${1.5 + i * 0.3}s ease-in-out infinite`,
            animationDelay: star.delay,
          }} />
        ))}

        <div style={{
          position: "absolute", bottom: -4, left: 0, right: 0, height: 14,
          borderRadius: "60% 60% 0 0",
          background: isDark
            ? "linear-gradient(180deg, #2d3a6b 0%, #1e2a4a 100%)"
            : "linear-gradient(180deg, #8fb8e8 0%, #6a9fd8 100%)",
          transition: "background 0.5s ease",
        }} />

        <div style={{
          position: "absolute", right: 10, top: 7,
          opacity: isDark ? 0 : 1,
          transition: "opacity 0.3s ease",
          animation: "cloud-transfer-hub 4s ease-in-out infinite",
        }}>
          <div style={{ position: "relative", width: 20, height: 10 }}>
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0, height: 6,
              background: "white", borderRadius: 3,
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }} />
            <div style={{ position: "absolute", bottom: 3, left: 3, width: 8, height: 8, background: "white", borderRadius: "50%" }} />
            <div style={{ position: "absolute", bottom: 3, left: 9, width: 10, height: 10, background: "white", borderRadius: "50%" }} />
          </div>
        </div>

        <div style={{
          position: "absolute",
          top: "50%",
          left: isDark ? "calc(100% - 27px)" : "3px",
          transform: "translateY(-50%)",
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          transition: "left 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <div style={{
            position: "absolute",
            width: 18, height: 18,
            borderRadius: "50%",
            background: "radial-gradient(circle at 40% 35%, #ffe066, #ffb700)",
            boxShadow: "0 0 8px 2px rgba(255,180,0,0.5)",
            opacity: isDark ? 0 : 1,
            transform: isDark ? "scale(0.4)" : "scale(1)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
            animation: "float-sun 3s ease-in-out infinite",
          }}>
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
              <div key={i} style={{
                position: "absolute",
                top: "50%", left: "50%",
                width: 1.5, height: 4,
                background: "#ffcc00",
                borderRadius: 1,
                transformOrigin: "50% calc(50% + 12px)",
                transform: `translate(-50%, -50%) rotate(${deg}deg) translateY(-12px)`,
                opacity: 0.7,
              }} />
            ))}
          </div>
          <div style={{
            position: "absolute",
            width: 17, height: 17,
            borderRadius: "50%",
            background: "radial-gradient(circle at 35% 35%, #f0f4ff, #c8d4f0)",
            boxShadow: "0 0 8px 3px rgba(180,200,255,0.35)",
            opacity: isDark ? 1 : 0,
            transform: isDark ? "scale(1) rotate(-15deg)" : "scale(0.4) rotate(-15deg)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
            animation: isDark ? "float-moon 3s ease-in-out infinite" : "none",
            overflow: "hidden",
          }}>
            <div style={{ position: "absolute", top: 4, left: 5, width: 3, height: 3, borderRadius: "50%", background: "rgba(150,170,220,0.4)" }} />
            <div style={{ position: "absolute", top: 9, left: 9, width: 2, height: 2, borderRadius: "50%", background: "rgba(150,170,220,0.3)" }} />
            <div style={{ position: "absolute", top: -2, right: -3, width: 14, height: 20, borderRadius: "50%", background: "rgba(20,30,60,0.15)" }} />
          </div>
        </div>
      </button>
    </>
  );
}