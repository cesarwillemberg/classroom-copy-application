
// import Sidebar, { SidebarItem } from "@/components/Sidebar/index";
import Dropdownbtn from "@/components/Dropdownbtn";
import DropdownItem from "@/components/DropdownItem";
import Sidebar from "@/components/Sidebar";
import { SidebarItem } from "@/components/SidebarItem";

import { 
  Calendar,
  GraduationCap,
  Archive,
  House,
  Settings,
  ListCheckIcon,

} from "lucide-react";

export default function Home() {



  return (
    <>
      <main className="App">
        <Sidebar>
          <SidebarItem icon={<House size={20} />} text="Inicio" />
          <SidebarItem icon={<Calendar size={20} />} text="Agenda" />
          <Dropdownbtn icon={<GraduationCap size={20}/>} label="Minhas inscrições" border="border-solid border-t border-b border-gray"> 
            <DropdownItem icon={<ListCheckIcon size={20} />} text="Pendentes" />
          </Dropdownbtn>
          <SidebarItem icon={<Archive size={20} />} text="Turmas arquivadas" />
          <SidebarItem icon={<Settings size={20}/>} text="Configuracoes" />
        </Sidebar>
      </main>
    </>
  );
}