import { IonCard, IonButton, IonIcon } from '@ionic/react';
import { ellipsisVertical, personCircleOutline, folderOutline } from 'ionicons/icons';
import React from 'react';
<<<<<<< HEAD
=======
import { ContactRoundIcon, EllipsisVertical, FolderClosedIcon } from 'lucide-react';
import { IonButton, IonDatetime } from '@ionic/react';

>>>>>>> 940914e41393ef20e7d51c6d1dde0cfdbbe27a06

interface CardProps {
  title: string;
  grupo: string;
  professorName: string;
  deadline: string;
  activityDetails: string;
  profileImage: string | null;
}

const Card: React.FC<CardProps> = ({ title, grupo, professorName, deadline, activityDetails, profileImage }: CardProps) => {
<<<<<<< HEAD
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
=======
    return (
        <li className='bg-white shadow-md rounded-lg max-w-[19rem] w-full h-[20rem] ml-0 mr-5 mb-5 border border-gray-300'>
            {/* Header */}
            <div className='bg-green-700 text-white pt-4 pl-4 rounded-t-lg flex justify-between items-center'>
                <div className='flex items-center'>
                    <div className='hover:underline'>
                        <h2 className='text-xl truncate w-[12.5rem]'>{title}</h2>
                        <p className='text-xs'>{grupo}</p>
                    </div>
                    <div className='relative rounded-full bg-white-600 flex items-center justify-center text-white ml-[2.5rem] -mt-5'>
                  
                <IonDatetime></IonDatetime>
                <IonButton fill="clear">
                    <EllipsisVertical size={24} />
                </IonButton>

                    </div>
                </div>
            </div>
>>>>>>> 940914e41393ef20e7d51c6d1dde0cfdbbe27a06

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

<<<<<<< HEAD
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
=======
            {/* Footer */}
            <div className='flex justify-end items-center border-t-2 px-4 pt-6'>
                <IonDatetime></IonDatetime>
                <IonButton fill="clear" className="rounded-full flex items-center justify-center mx-5">
                    <ContactRoundIcon size={24} />
                </IonButton>
                <IonButton fill="clear" className="rounded-full flex items-center justify-center">
                    <FolderClosedIcon size={24} />
                </IonButton>
            </div>
        </li>
    );
}
>>>>>>> 940914e41393ef20e7d51c6d1dde0cfdbbe27a06

export default Card;
