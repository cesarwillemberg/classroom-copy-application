"use client"; 
import { AlignJustify, CircleUserRound, Grip, Plus } from "lucide-react";
import Image from "next/image";
import './index.module.css';
import { SidebarContext } from "../Sidebar";
import { useContext } from "react";
import ModalParent from "../ModalParent";

interface NavbarProps {
    toggleSidebar?: () => void;
}


export default function Navbar({ toggleSidebar }: NavbarProps) {

    const context = useContext(SidebarContext);

    if (!context) {
        throw new Error("Navbar deve ser usado dentro de um SidebarProvider");
    }

    return (
        <nav className="fixed top-0 w-full flex pl-6 pt-3 pb-3 justify-between items-center border-b border-solid border-gray-400 bg-white z-50">
            <div className="flex justify-between">
                <button
                    onClick={toggleSidebar}
                    className="p-1 rounded-lg bg-gray-50 hover:bg-gray-300 hover:rounded-full"
                    aria-label="Toggle Menu"
                    title='Menu Principal'
                >
                    <AlignJustify size={22} strokeWidth={1.4} />
                </button>
                <div className="flex items-center px-5">
                    <Image
                        src={'/logo.svg'}
                        width={30} 
                        height={30} 
                        alt="classroom_logo" 
                    />
                    <h2 className="text-colorText1 text-xl px-2 hover:underline hover:text-green-700">Google Sala de Aula</h2>
                </div>
            </div> 
            <div className="flex space-x-5 px-5">
                <ModalParent icon={<Plus size={32} strokeWidth={1.4}/>} title={"Participar de uma turma"} />
                <button aria-label="Google Apps" title="Google Apps">
                    <Grip size={30} strokeWidth={1} />
                </button>
                <button aria-label="Google Accounts">
                    <CircleUserRound size={32} strokeWidth={0.5} />
                </button>
            </div>
        </nav>
    );
}
