import { IonCard, IonButton, IonIcon } from '@ionic/react';
import { ellipsisVertical, personCircleOutline, folderOutline } from 'ionicons/icons';
import React from 'react';

interface CardProps {
  title: string;
  grupo: string;
  professorName: string;
  deadline: string;
  activityDetails: string;
  profileImage: string | null;
}

const Card: React.FC<CardProps> = ({ title, grupo, professorName, deadline, activityDetails, profileImage }: CardProps) => {
  return (
    <IonCard className="custom-card">
      <div className="header bg-green-700 text-white">
        <div className="header-content">
          <h2 className="truncate">{title}</h2>
          <p className="group">{grupo}</p>
          <IonButton fill="clear" className="options-button">
            <IonIcon icon={ellipsisVertical} />
          </IonButton>
        </div>
      </div>

      <div className="professor-info bg-green-700 text-white">
        <p className="professor-name truncate">{professorName}</p>
      </div>

      <div className="profile-image-container">
        {profileImage && (
          <img
            src={`data:image/jpeg;base64,${profileImage}`}
            alt={title}
            className="profile-image"
          />
        )}
      </div>

      <div className="content">
        {deadline && (
          <div className="deadline-info">
            <p>Data de entrega: {deadline}</p>
            <p className="activity-details truncate">{activityDetails}</p>
          </div>
        )}
      </div>

      <div className="footer">
        <IonButton fill="clear">
          <IonIcon icon={personCircleOutline} />
        </IonButton>
        <IonButton fill="clear">
          <IonIcon icon={folderOutline} />
        </IonButton>
      </div>
    </IonCard>
  );
};

export default Card;
