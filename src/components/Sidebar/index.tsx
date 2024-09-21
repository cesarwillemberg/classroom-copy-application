"use client";
import { AlignJustify } from 'lucide-react';
import React, { createContext, useState, ReactNode } from 'react';
import Navbar from '../Navbar/index';

// Define the context type
interface SidebarContextType {
    expanded: boolean;
}

// Create the SidebarContext with a default value
const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

interface SidebarProps {
    children: ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
    const [expanded, setExpanded] = useState<boolean>(false);

    const handleMouseEnter = () => setExpanded(true);
    const handleMouseLeave = () => setExpanded(false);

    return (
            <>
                <div className="flex items-center px-5 w-full border-b-2">
                    <button
                        onClick={() => setExpanded(curr => !curr)}
                        className="p-3 rounded-lg bg-gray-50 hover:bg-gray-300 hover:rounded-full"
                        aria-label="Toggle Menu"
                        title='Menu Principal'
                    >
                        <AlignJustify size={32} strokeWidth={0.8} />
                    </button>
                    <Navbar />
                </div>
                <aside 
                    className={`flex items-center transition-all`}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <div 
                        className={`h-full transition-all bg-white shadow-md ${expanded ? 'w-80' : ''}`} 
                        style={{ height: `calc(100vh - 72px)`}} 
                    >
                        <SidebarContext.Provider value={{ expanded }}>
                            <ul className='flex-1'>
                                {children}
                            </ul>
                        </SidebarContext.Provider>
                    </div>
                </aside>
            </>
    );
}

export { SidebarContext };