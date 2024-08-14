import React from 'react';
import {Card} from '../models/card';

const MiniCard: React.FC<Card> = ({ title, description, imageUrl }) => {
  return (
    <div className="bg-white min-h-[10rem] rounded-[20px] shadow-lg overflow-hidden">
      <div className="flex flex-col gap-4 p-4">
        <h2 className="text-black/50 text-sm mb-2">{title}</h2>
        <p className="font-bold text-gray-600">{description}</p>

        {imageUrl && (
          <img src={imageUrl} alt={title} className="w-full h-32 object-cover" />
        )}
      </div>
    </div>
  );
};

export default MiniCard;
