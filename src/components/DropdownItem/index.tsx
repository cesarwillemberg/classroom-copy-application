"use client"; // Para garantir que o componente é renderizado no lado do cliente
import React from 'react';
import { SidebarContext } from "@/components/Sidebar/index";
import './index.module.css';
import Link from 'next/link';

interface DropdownItemProps {
    text: string;
    icon?: JSX.Element;
    src?: string;
}

const DropdownItem: React.FC<DropdownItemProps> = ({ text, icon, src = "#"}) => {
    return (
        <Link href={src} >
            <li>
                <button
                    className="flex items-center w-full text-left px-7 py-2 text-sm text-gray-700 hover:bg-gray-200"
                    role="menuitem"
                    >
                    {icon}
                    <span className='ml-2 text-sm'>{text}</span>
                </button>
            </li>
        </Link>
    );
};

export default DropdownItem;
