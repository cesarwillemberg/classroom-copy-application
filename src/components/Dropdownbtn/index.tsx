import React, { useContext, useState } from 'react';
import { IonButton, IonIcon, IonList, IonItem } from '@ionic/react';
import { SidebarContext } from '@/components/Sidebar/index';
import { chevronForward } from 'ionicons/icons';

interface DropdownProps {
  children: React.ReactNode;
  label: string;
  icon: JSX.Element;
  border?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ children, label, icon, border }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error("Dropdown must be used within a Sidebar");
  }

  const { expanded } = context;

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <IonItem className={`relative inline-block text-left ${border} w-full`}>
      <div>
        <IonButton onClick={toggleDropdown} fill="clear" className="flex items-center py-2 pl-2 w-full">
          <IonIcon
            icon={chevronForward}
            className={`w-5 h-5 transition-transform ${isOpen && expanded ? 'rotate-90' : ''}`}
          />
          {icon}
          <span className={`overflow-hidden text-sm transition-transform ${expanded ? 'w-28 ml-3' : 'w-0 hidden'}`}>
            {label}
          </span>
        </IonButton>
      </div>

      {isOpen && expanded && (
        <IonList className="rounded-md bg-white">
          <IonItem role="menu" aria-orientation="vertical">
            {children}
          </IonItem>
        </IonList>
      )}
    </IonItem>
  );
};

export default Dropdown;
