"use client";
import { AlignJustify } from 'lucide-react';
import { useContext, createContext, useState, ReactNode } from 'react';
import Navbar from '../Navbar';

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
    const [expanded, setExpanded] = useState<boolean>(true);

    return (
            <>
                <div className="flex items-center px-5 w-full">
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
                <aside className={`flex items-center transition-all`}>
                    <div className={`px-5 h-full transition-all bg-white shadow-md ${expanded ? 'w-64' : 'w-22'}`} style={{ height: `calc(100vh - 72px)`}} >
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

interface SidebarItemProps {
    icon: JSX.Element;
    text: string;
    active?: boolean;
    alert?: boolean;
}

export function SidebarItem({ icon, text, active, alert }: SidebarItemProps) {
    const context = useContext(SidebarContext);

    if (!context) {
        throw new Error("SidebarItem must be used within a Sidebar");
    }

    const { expanded } = context;

    return (
        <li className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group
                ${active ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800" : "hover:bg-indigo-50 text-gray-600"}
        `}>
            {icon}
            <span className={`overflow-hidden transition-all ${expanded ? "w-50 ml-3" : "w-0"}`}>{text}</span>
            {alert && <div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"}`}></div>}

            {!expanded && <div className={`
                absolute left-full rounded-md px-2 py-1 ml-6
                bg-indigo-100 text-indigo-800 text-sm
                invisible opacity-20 -translate-x-3 transition-all
                group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
            `}>{text}</div>}
        </li>
    );
}
