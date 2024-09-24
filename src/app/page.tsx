"use client";
import { useContext } from "react";
import Card from "@/components/Card";
import CardParent from "@/components/CardParent";
import Dropdownbtn from "@/components/Dropdownbtn";
import DropdownItem from "@/components/DropdownItem";
import Sidebar, { SidebarContext } from "@/components/Sidebar";
import { SidebarItem } from "@/components/SidebarItem";
import { 
  Calendar,
  GraduationCap,
  Archive,
  House,
  Settings,
  ListCheckIcon,
  CircleUserRound,
} from "lucide-react";

export default function Home() {
  const context = useContext(SidebarContext);
  const isFixed = context?.isFixed; 

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
          <div className={`flex-1 p-4 transition-all duration-300 ${isFixed ? 'ml-80' : 'ml-24'}`}>
            <CardParent>
              {Array.from({ length: 15 }).map((_, index) => (
                <Card
                  key={index}
                  title="IJ - Programação para Web"
                  group="Grp00537"
                  professorName="LORI RONALDO FLORES MACHADO"
                  deadline="quarta-feira"
                  activityDetails="22:30 - Missão 2 - Aplicação web com front-end e back-end - 200 XP - Grupo/Individual"
                  profileImage={<CircleUserRound size={85} />}
                />
              ))}
            </CardParent>
          </div>
        </div>
      </main>
    </>
  );
}
