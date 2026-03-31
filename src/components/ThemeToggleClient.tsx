'use client';

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

export function ThemeToggleClient(){
    const { resolvedTheme, setTheme } = useTheme()
    const [ mounted, setMounted ] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if(!mounted) return (
        <div style={{ width: 64, height: 30 }}/>
    )

    return(
        <ThemeToggle
        isDark={ resolvedTheme === 'dark'}
        onToggle={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
        />
    )
}