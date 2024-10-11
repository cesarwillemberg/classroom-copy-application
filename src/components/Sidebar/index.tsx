import React, { createContext, useState, ReactNode } from 'react';
import { IonMenu, IonHeader, IonToolbar, IonContent, IonList } from '@ionic/react';
import Navbar from '../Navbar';

interface SidebarContextType {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  isFixed: boolean;
  setIsFixed: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

interface SidebarProps {
  children: ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [isFixed, setIsFixed] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsFixed((prev) => !prev);
    setExpanded((prev) => !prev);
  };

  return (
    <SidebarContext.Provider value={{ expanded, setExpanded, isFixed, setIsFixed }}>
      <IonMenu
        contentId="main-content"
        type={expanded ? 'overlay' : 'push'}
        side="start"
        className={`sidebar-menu ${expanded ? 'expanded' : ''}`}
      >
        <IonHeader>
          <IonToolbar>
            <Navbar toggleSidebar={toggleSidebar} />
          </IonToolbar>
        </IonHeader>

        <IonContent className={`sidebar-content ${isFixed ? 'fixed' : ''}`}>
          <IonList>{children}</IonList>
        </IonContent>
      </IonMenu>

      <IonContent id="main-content">
        <main>
        </main>
      </IonContent>
    </SidebarContext.Provider>
  );
}

export { SidebarContext };
