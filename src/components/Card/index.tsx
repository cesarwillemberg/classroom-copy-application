"use client";
import Image from 'next/image';
import './index.module.css';
import React from 'react';
import { ContactRoundIcon, EllipsisVertical, FolderClosedIcon } from 'lucide-react';

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
        <li className='bg-white shadow-md rounded-lg max-w-[19rem] w-full h-[22rem] mx-3 mb-5 border-solid border border-gray-400'>
            {/* Header */}
            <div className='bg-green-700 text-white pt-4 pl-4 rounded-t-lg flex justify-between items-center'>
                <div className='flex items-center'>
                    <div className='hover:underline'>
                        <h2 className='font-semibold text-lg truncate w-48'>{title}</h2>
                        <p className='text-xs'>{grupo}</p>
                    </div>
                    <div className='relative rounded-full bg-white-600 flex items-center justify-center text-white ml-12 -mt-5'>
                        <button>
                            <EllipsisVertical size={24} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Professor Info */}
            <div className='bg-green-700 text-white p-4 flex items-center'>
                <p className='text-xs truncate w-[11.5rem] hover:underline'>{professorName}</p>
            </div>

            <div className='flex justify-end mb-2 mx-6 -mt-11'>
                <div className="h-24 w-24 object-cover text-black-500">
                    {profileImage && (
                        <img src={`data:image/jpeg;base64,${profileImage}`} alt={title} className="card-image rounded-full" />
                    )}
                </div>
            </div>

            {/* Content */}
            <div className={`flex-grow pb-5 pl-4 h-32`}>
                <div className={`${ deadline ? '' : 'hidden' } mt-4`}>
                    <p className={'text-xs text-black-500'}>Data de entrega: {deadline}</p>
                    <p className='text-xs text-black-700 truncate w-52 hover:underline'>{activityDetails}</p>
                </div>
            </div>

            {/* Footer */}
            <div className='flex justify-end items-center border-t-2 px-4 pt-3'>
                <button className='bg-black-300 rounded-full flex items-center justify-center mx-5'>
                    <ContactRoundIcon size={24} />
                </button>
                <button className="bg-black-300 rounded-full flex items-center justify-center">
                    <FolderClosedIcon size={24} />
                </button>
            </div>
        </li>
    );
}

export default Card;
