"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { ThemeToggleClient } from "@/components/ThemeToggleClient";

import { RiDashboardHorizontalLine } from "react-icons/ri";
import { StickyNote } from "lucide-react";
import { MdPostAdd } from "react-icons/md";
import { GoProjectRoadmap } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: <RiDashboardHorizontalLine /> },
  { label: "Posts", href: "/admin/posts", icon: <StickyNote /> },
  { label: "New post", href: "/admin/posts/new", icon: <MdPostAdd /> },
  { label: "Projects", href: "/admin/projects", icon: <GoProjectRoadmap /> },
  { label: "Settings", href: "/admin/settings", icon: <IoSettingsOutline /> },
];

export function AdminSidebar(){
    const pathname = usePathname()

    return(
        <aside className="w-56 shrink-0 flex flex-col bg-gray-900 border-r border-gray-800 min-h-screen sticky top-0">

            {/* logo */}
            <div className="px-4 py-5 border-b border-gray-800">
                <span className="font-mono text-xs text-gray-500 tracking-widest uppercase">
                    CMS / v1.0
                </span>
            </div>

            <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
                <p className="font-mono text-xs text-gray-600 uppercase tracking-widest px-2 mb-2">
                    Content
                </p>
                {navItems.map((item) => {
                    const isActive = pathname === item.href
                    return(
                        <Link key={item.href} href={item.href} className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors duration-150 ${isActive ? 'bg-lime-400/10 text-lime-400': 'text-gray-400 hover:bg-gray-800 hover:text-gray-100'}`}>
                            <span className="text-base w-4 text-center">{item.icon}</span>
                            {item.label}
                        </Link>
                    )
                })}
            </nav>

            <div className="px-4 py-4 border-t border-gray-800 flex items-center justify-between">
                <ThemeToggleClient/>
                <button
                onClick={() => signOut({ callbackUrl: '/login'})}
                className="font-mono text-xs text-gray-500 hover:text-red-400 transition-colors"
                >
                    Sign out
                </button>
            </div>
        </aside>
    )
}