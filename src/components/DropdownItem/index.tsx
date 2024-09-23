"use client"; // Para garantir que o componente é renderizado no lado do cliente
import React from 'react';
import { SidebarContext } from "@/components/Sidebar/index";

interface DropdownItemProps {
    text: string;
    icon?: JSX.Element;
}

const DropdownItem: React.FC<DropdownItemProps> = ({ text, icon}) => {
    return (
        <li>
            <button
                className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                >
                {icon}
                <span className='ml-2 text-sm'>{text}</span>
            </button>
        </li>
    );
};

export default DropdownItem;
