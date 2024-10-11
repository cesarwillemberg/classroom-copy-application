import React from 'react';
import { IonModal, IonButton, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonFooter } from '@ionic/react';

import FormNewClass from './FormNewClass';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, subtitle }: ModalProps) => {
  const handleSubmit = (formData: any) => {
    console.log(formData);
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{title}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onClose}>Fechar</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      
      <IonContent>
        <div className="ion-padding">
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
          <FormNewClass onSubmit={handleSubmit} onClose={onClose} />
        </div>
      </IonContent>
      
     <IonFooter>
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton onClick={onClose}>Cancelar</IonButton>
            <IonButton onClick={onClose}>Participar</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonFooter>
    </IonModal>
  );
};

export default Modal;
