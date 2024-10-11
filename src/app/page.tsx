"use client";
import { useContext, useEffect, useState } from "react";
import React from 'react';
import Card from "@/components/Card";
import CardParent from "@/components/CardParent";
import Dropdownbtn from "@/components/Dropdownbtn";
import DropdownItem from "@/components/DropdownItem";
import Sidebar, { SidebarContext } from "@/components/Sidebar";
import { SidebarItem } from "@/components/SidebarItem";
import '@ionic/react/css/core.css';

import { 
    Calendar,
    GraduationCap,
    Archive,
    House,
    Settings,
    ListCheckIcon,
} from "lucide-react";

interface Class {
    id: number;
    nameClass: string;
    grupo: string;
    professorName: string;
    profileImage: string | null;
}


export default function Home() {
    const context = useContext(SidebarContext);
    console.log(context);
    
    const isFixed = context?.isFixed || false; 

    const [classes, setClasses] = useState<Class[]>([]);

    useEffect(() => {
        const fetchClasses = async () => {
            const response = await fetch('/api/cards');
            if (!response.ok) {
                console.error('Failed to fetch classes:', response.statusText);
                return;
            }
            const data = await response.json();
            setClasses(data as Class[]);
        };

        fetchClasses().catch(console.error);
    }, []);

    console.log("isFixed:", isFixed);


    return (
        <>
            <main className={`App`}>
                <div className="flex pt-16">
                    <Sidebar>
                        <SidebarItem icon={<House size={20} />} text="Inicio" src="/" />
                        <SidebarItem icon={<Calendar size={20} />} text="Agenda" src="/Agenda" />
                        <Dropdownbtn icon={<GraduationCap size={20}/>} label="Minhas inscrições" border="border-solid border-t border-b border-gray"> 
                            <DropdownItem icon={<ListCheckIcon size={20} />} text="Pendentes" src="/Pendentes" />
                        </Dropdownbtn>
                        <SidebarItem icon={<Archive size={20} />} text="Turmas arquivadas" src="/TurmasArquivdas" />
                        <SidebarItem icon={<Settings size={20}/>} text="Configuracoes" src="/configuracoes" />
                    </Sidebar>
                    <div className={`flex-1 p-4 transition-all duration-300 ${isFixed ? 'ml-[19.5rem]' : 'ml-20'}`}>
                        <CardParent>
                            {classes.map((classData) => (
                                <Card
                                key={classData.id}
                                title={classData.nameClass}
                                grupo={classData.grupo}
                                professorName={classData.professorName}
                                deadline={classData.deadline}
                                activityDetails={classData.activityDetails}
                                profileImage={classData.profileImage}
                                />gi
                            ))}
                        </CardParent>
                    </div>
                </div>
            </main>
        </>
    );
}
