"use client";
import Image from 'next/image';
import './index.module.css';
import React from 'react';
import { ContactRoundIcon, EllipsisVertical, FolderClosedIcon } from 'lucide-react';

interface CardProps {
    title: string;
    group: string;
    professorName: string;
    deadline: string;
    activityDetails: string;
    profileImage: JSX.Element;
}

const Card: React.FC<CardProps> = ({ title, group, professorName, deadline, activityDetails, profileImage }: CardProps) => {
    return (
        <li className='bg-white shadow-md rounded-lg max-w-[19rem] w-full h-[20rem] mx-3 mb-5 border-solid border border-gray-400'>
            {/* Header */}
            <div className='bg-gray-800 text-white pt-4 pl-4 rounded-t-lg flex justify-between items-center'>
                <div className='flex items-center'>
                    <div className='hover:underline'>
                        <h2 className='font-semibold text-lg truncate w-48'>{title}</h2>
                        <p className='text-xs'>{group}</p>
                    </div>
                    <div className='relative rounded-full bg-gray-500 flex items-center justify-center text-white ml-12 -mt-5'>
                        <button>
                            <EllipsisVertical size={24} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Professor Info */}
            <div className='bg-gray-800 text-white p-4 flex items-center'>
                <p className='text-xs truncate w-[11.5rem] hover:underline'>{professorName}</p>
            </div>

            <div className='flex justify-end mb-2 mx-12 -mt-11'>
                <div className="h-12 w-12 rounded-full object-cover text-red-500">
                    {profileImage}
                </div>
            </div>

            {/* Content */}
            <div className='flex-grow pb-5 pl-4 h-28'>
                <div className='mt-4'>
                    <p className='text-xs text-gray-500'>Data de entrega: {deadline}</p>
                    <p className='text-xs text-gray-700 truncate w-52 hover:underline'>{activityDetails}</p>
                </div>
            </div>

            {/* Footer */}
            <div className='flex justify-end items-center border-t p-4'>
                <button className='bg-gray-300 rounded-full flex items-center justify-center mx-5'>
                    <ContactRoundIcon size={24} />
                </button>
                <button className="bg-gray-300 rounded-full flex items-center justify-center">
                    <FolderClosedIcon size={24} />
                </button>
            </div>
        </li>
    );
}

export default Card;
