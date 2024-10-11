import React, { useState } from 'react';
import { IonInput, IonButton, IonItem, IonLabel, IonList, IonTextarea } from '@ionic/react';

interface ClassFormProps {
  onSubmit: (classData: ClassData) => void;
  onClose: () => void;
}

interface ClassData {
  nameClass: string;
  group: string;
  professorName: string;
}

const FormNewClass: React.FC<ClassFormProps> = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState<ClassData>({
    nameClass: '',
    group: '',
    professorName: '',
  });

  const [imagemProfile, setImageProfile] = useState<File | null>(null);

  const handleChange = (e: CustomEvent) => {
    const { name, value } = e.detail;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageProfile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('nameClass', formData.nameClass);
    formDataToSend.append('group', formData.group);
    formDataToSend.append('professorName', formData.professorName);

    if (imagemProfile) {
      formDataToSend.append('imageProfile', imagemProfile);
    }

    try {
      const response = await fetch('/api/cards', {
        method: 'POST',
        body: formDataToSend,
      }).then((response) => response.json());

      if (response.created) {
        alert("Turma criada com sucesso!");
        onSubmit(formData);
        setFormData({
          nameClass: '',
          group: '',
          professorName: '',
        });
        setImageProfile(null);
        onClose();
      } else {
        alert("Erro ao criar turma: " + (response.error || "Erro desconhecido"));
      }
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      alert("Erro ao criar turma. Tente novamente mais tarde.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="ion-padding">
      <IonList>

        <IonItem>
          <IonLabel position="stacked">Turma (obrigatório)</IonLabel>
          <IonInput
            type="text"
            name="nameClass"
            value={formData.nameClass}
            onIonChange={handleChange}
            required
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Grupo</IonLabel>
          <IonInput
            type="text"
            name="group"
            value={formData.group}
            onIonChange={handleChange}
            required
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Nome do Professor</IonLabel>
          <IonInput
            type="text"
            name="professorName"
            value={formData.professorName}
            onIonChange={handleChange}
            required
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Carregar imagem de perfil</IonLabel>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </IonItem>
      </IonList>

      <div className="ion-padding">
        <IonButton expand="block" color="light" onClick={onClose}>
          Cancelar
        </IonButton>
        <IonButton expand="block" type="submit" color="primary">
          Criar
        </IonButton>
      </div>
    </form>
  );
};

export default FormNewClass;
