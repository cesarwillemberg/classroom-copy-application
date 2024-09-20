
import Navbar from "@/components/Navbar/index";
import Sidebar, { SidebarItem } from "@/components/Sidebar/index";
import { 
  Calendar,
  GraduationCap,
  Archive,
  House,
  Settings,

} from "lucide-react";

export default function Home() {
  return (
    <>
      <main className="App">
        <Sidebar>
          <SidebarItem icon={<House size={20} />} text="Inicio" />
          <SidebarItem icon={<Calendar size={20} />} text="Agenda" />
          <SidebarItem icon={<GraduationCap size={20}/>} text="Minhas inscricoes" />
          <SidebarItem icon={<Archive size={20} />} text="Orders" />
          <SidebarItem icon={<Settings size={20}/>} text="Billings" />
        </Sidebar>
      </main>
    </>
  );
}
