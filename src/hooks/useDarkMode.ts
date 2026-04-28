import { useState } from "react";

export function useDarkMode() {
  const [dark, setDark] = useState<boolean>(true);
  const toggle = () => setDark((d) => !d);
  return { dark, toggle };
}
