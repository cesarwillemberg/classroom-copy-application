import './index.module.css';
import React from 'react';

interface CardParentProps {
    children: React.ReactNode;
}

const CardParent: React.FC<CardParentProps> = ({ children }) => {
    return (
        <ol className='flex flex-wrap justify-start'>
            {children}
        </ol>
    );
}

export default CardParent;