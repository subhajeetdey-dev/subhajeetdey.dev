import { useState, useEffect } from "react";

export function TerminalCursor() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setShow((s) => !s), 530);
    return () => clearInterval(t);
  }, []);

  return (
    <span
      className="inline-block w-[3px] h-[1.1em] align-middle ml-1 rounded-sm"
      style={{
        background: "#ef233c",
        opacity: show ? 1 : 0,
        transition: "opacity 0.1s",
      }}
    />
  );
}
