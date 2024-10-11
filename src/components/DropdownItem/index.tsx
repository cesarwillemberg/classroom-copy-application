import React from 'react';
import { IonRouterLink, IonItem, IonButton, IonIcon } from '@ionic/react';

interface DropdownItemProps {
  text: string;
  icon?: JSX.Element;
  src?: string;
}

const DropdownItem: React.FC<DropdownItemProps> = ({ text, icon, src = "#" }) => {
  return (
    <IonRouterLink href={src}>
      <IonItem lines="none">
        <IonButton fill="clear" className="flex items-center w-full text-left px-7 py-2 text-sm text-gray-700 hover:bg-gray-200">
          {icon && <IonIcon icon={icon} />}
          <span className="ml-2 text-sm">{text}</span>
        </IonButton>
      </IonItem>
    </IonRouterLink>
  );
};

export default DropdownItem;
