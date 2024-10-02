"use client";
import React, { useContext } from "react";
import { SidebarContext } from "@/components/Sidebar/index";
import './index.module.css';
import Link from "next/link";

interface SidebarItemProps {
    icon: JSX.Element;
    text: string;
    active?: boolean;
    alert?: boolean;
    src?: string;
}

export function SidebarItem({ icon, text, active, alert, src = "#"}: SidebarItemProps) {
    const context = useContext(SidebarContext);

    if (!context) {
        throw new Error("SidebarItem must be used within a Sidebar");
    }

    const { expanded } = context;

    return (
        <Link href={src}>
            <li 
                className={`
                    relative flex items-center py-2 px-7 my-1 font-medium cursor-pointer transition-colors group
                    ${active ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800" : "hover:bg-gray-300"}
            `}>
                {icon}
                <span className={`overflow-hidden text-sm transition-all ${expanded ? "w-50 ml-3" : "w-0"}`}>{text}</span>
                {alert && <div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"}`}></div>}
            </li>
        </Link>
    );
}
