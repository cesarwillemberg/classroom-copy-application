"use client";

import { useState } from "react";


interface ClassFormProps {
    onSubmit: (classData: ClassData) => void;
    onClose: () => void;
}

interface ClassData {
    nameClass: string;
    group: string;
    professorName: string;
}

const FormNewClass: React.FC<ClassFormProps> = ({ onSubmit, onClose }: ClassFormProps) => {
    const [formData, setFormData] = useState<ClassData>({
        nameClass: '',
        group: '',
        professorName: '',
    });

    const [imagemProfile, setImageProfile] = useState<File | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
    
        if (e.target instanceof HTMLInputElement && e.target.type === "file") {
            const file = e.target.files ? e.target.files[0] : null;
            setFormData((prevState) => ({
                ...prevState,
                [name]: file,
            }));
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setImageProfile(file);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formDataToSend  = new FormData();

        formDataToSend.append('nameClass', formData.nameClass);
        formDataToSend.append('group', formData.group);
        formDataToSend.append('professorName', formData.professorName)
        if (imagemProfile) {
            formDataToSend.append('imageProfile', imagemProfile);
        }

        try {

            const response = await fetch('/api/cards', {
                method: 'POST',
                body: formDataToSend,
            }).then((response) => response.json()); 

            console.log(response);

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
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div className='mb-4'>
                <label htmlFor="nameClass" className="block text-sm font-medium text-gray-700">Turma <span className="">(obrigatório)</span></label>
                <input
                    type="text"
                    id="nameClass"
                    name="nameClass"
                    value={formData.nameClass}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                    required
                />
            </div>
            <div className='mb-4'>
                <label htmlFor="group" className="block text-sm font-medium text-gray-700">Grupo:</label>
                <input
                    type="text"
                    id="group"
                    name="group"
                    value={formData.group}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                    required
                />
            </div>

            <div className='mb-4'>
                <label htmlFor="professorName" className="block text-sm font-medium text-gray-700">Nome do Professor:</label>
                <input
                    type="text"
                    id="professorName"
                    name="professorName"
                    value={formData.professorName}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                    required
                />
            </div>

            <div>
                <label htmlFor="imageProfile" className="block text-sm font-medium text-gray-700 pb-3">Carregar imagem de perfil:</label>
                <input
                    type="file"
                    id="imageProfile"
                    name="imageProfile"
                    accept="image/*"
                    onChange={handleFileChange}
                />
            </div>

            <div className="flex justify-end space-x-3 bg-gray-50 px-4 py-3">
                <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md px-3 py-2 text-sm shadow-sm sm:w-auto"
                    onClick={onClose}
                >
                    Cancelar
                </button>

                <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm sm:w-auto"
                >
                    Criar
                </button>
            </div>
        </form>
    )

}

export default FormNewClass;