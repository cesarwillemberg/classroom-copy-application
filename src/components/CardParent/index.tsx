import { IonList } from '@ionic/react';
import React from 'react';

interface CardParentProps {
  children: React.ReactNode;
}

const CardParent: React.FC<CardParentProps> = ({ children }) => {
  return (
    <IonList className="flex-wrap custom-list">
      {children}
    </IonList>
  );
};

export default CardParent;
