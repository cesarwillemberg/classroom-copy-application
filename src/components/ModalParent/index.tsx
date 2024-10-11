import React, { useState } from 'react';
import { IonButton } from '@ionic/react';
import Modal from '../Modal';

interface ModalParentProps {
  text?: string;
  icon?: JSX.Element;
  title?: string;
}

const ModalParent: React.FC<ModalParentProps> = ({ text, icon, title }: ModalParentProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div>
      <IonButton onClick={openModal} title={title}>
        {text ? text : icon}
      </IonButton>
      <Modal isOpen={isOpen} onClose={closeModal} title="Participar da turma" subtitle="Preencha os campos obrigatórios" />
    </div>
  );
};

export default ModalParent;
