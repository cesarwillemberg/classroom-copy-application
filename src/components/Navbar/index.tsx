import React, { useContext } from 'react';
import { IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonIcon } from '@ionic/react';
import { menuOutline, gridOutline, personCircleOutline, addCircleOutline } from 'ionicons/icons';
import ModalParent from '../ModalParent';
import { SidebarContext } from '../Sidebar';

interface NavbarProps {
  toggleSidebar?: () => void;
}

export default function Navbar({ toggleSidebar }: NavbarProps) {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error("Navbar deve ser usado dentro de um SidebarProvider");
  }

  return (
    <IonHeader className="ion-no-border">
      <IonToolbar className="flex justify-between">

        <IonButtons slot="start">
          <IonButton onClick={toggleSidebar} aria-label="Toggle Menu" title="Menu Principal">
            <IonIcon icon={menuOutline} size="large" />
          </IonButton>
        </IonButtons>

        <div className="flex items-center">
          <img src="/logo.svg" alt="classroom_logo" width={30} height={30} />
          <IonTitle className="px-2 text-xl hover:underline hover:text-green-700">Google Sala de Aula</IonTitle>
        </div>

        <IonButtons slot="end" className="space-x-3">
          <ModalParent icon={<IonIcon icon={addCircleOutline} size="large" />} title="Participar de uma turma" />
          
          <IonButton aria-label="Google Apps" title="Google Apps">
            <IonIcon icon={gridOutline} size="large" />
          </IonButton>

          <IonButton aria-label="Google Accounts" title="Google Accounts">
            <IonIcon icon={personCircleOutline} size="large" />
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
}
