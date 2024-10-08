"use client"; // Para garantir que o componente é renderizado no lado do cliente
import React, { useContext, useState } from 'react';
import { SidebarContext } from "@/components/Sidebar/index";
import './index.module.css';

interface DropdownProps {
    children: React.ReactNode;
    label: string;
    icon: JSX.Element;
    border? : string;
}

const Dropdown: React.FC<DropdownProps> = ({ children, label, icon, border}: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const context = useContext(SidebarContext);

    if (!context) {
        throw new Error("SidebarItem must be used within a Sidebar");
    }

    const { expanded } = context;

    const toggleDropdown = () => {
        setIsOpen(prev => !prev);
    };

    return (
        <li className={`relative inline-block text-left ${border} w-full`}>
            <div>
                <button
                    onClick={toggleDropdown}
                    className="flex items-center py-2 font-medium  text-gray-700 pl-2 w-full hover:bg-gray-300"
                    aria-haspopup="true"
                    aria-expanded={isOpen}

                >
                    <svg className={`w-5 h-5 transition-transform  ${isOpen && expanded ? 'rotate-90' : ''}`} viewBox="0 0 24 24">
                        <path d="M10 17l5-5-5-5v10z" />
                    </svg>
                    {icon}
                    <span className={`overflow-hidden text-sm transition-transform ${expanded ? 'w-28 ml-3' : 'w-0 hidden'}`}>{label}</span>
                    
                </button>
            </div>

            {isOpen && expanded && (
                <div className="rounded-md bg-white">
                    <ul role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        {children}
                    </ul>
                </div>
            )}
        </li>
    );
};

export default Dropdown;
