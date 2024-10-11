"use client";
import React, { useContext } from "react";
import { SidebarContext } from "@/components/Sidebar/index";
import { IonItem, IonLabel } from "@ionic/react";
import { Link } from "react-router-dom"; 
import './index.module.css';

interface SidebarItemProps {
    icon: JSX.Element;
    text: string;
    active?: boolean;
    alert?: boolean;
    src?: string;
}

export function SidebarItem({ icon, text, active, alert, src = "#" }: SidebarItemProps) {
    const context = useContext(SidebarContext);

    if (!context) {
        throw new Error("SidebarItem must be used within a Sidebar");
    }

    const { expanded } = context;

    return (
        <Link to={src}>
            <IonItem
                className={`relative flex items-center py-2 my-1 font-medium cursor-pointer transition-colors group ${
                    active ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800" : "hover:bg-gray-300"
                }`}
                lines="none"
            >
                {icon}
                <IonLabel className={`transition-all ${expanded ? "opacity-100" : "opacity-0"}`}>
                    <span className={`overflow-hidden text-sm ${expanded ? "ml-3" : ""}`}>{text}</span>
                </IonLabel>
                {alert && (
                    <div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"}`}></div>
                )}
            </IonItem>
        </Link>
    );
}
