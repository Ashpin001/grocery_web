import React from 'react';
import './Card.css'; // Assuming you will create a CSS file for styling

interface CardProps {
    title: string;
    image: string;
    description: string;
    children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, image, description, children }) => {
    return (
        <div className="card">
            <img src={image} alt={title} className="card-image" />
            <div className="card-content">
                <h2 className="card-title">{title}</h2>
                <p className="card-description">{description}</p>
                {children}
            </div>
        </div>
    );
};

export default Card;