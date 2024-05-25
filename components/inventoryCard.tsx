import React from 'react';

interface InventoryItem {
  _id: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  attachment: {
    path: string;
    originalName: string;
    mimeType: string;
    size: number;
  };
}

interface Props {
  item: InventoryItem;
  isAdmin: boolean;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpload: (itemId: string) => void;
  uploading: boolean;
  onClick: () => void;
  expanded: boolean;
}

const InventoryCard: React.FC<Props> = ({ item, uploading, onClick, expanded }) => {
  const defaultImagePath = "/path/to/default/image.png";
  const cardClass = `card2 border p-4 shadow-lg rounded-lg transition duration-300 ease-in-out cursor-pointer ${expanded ? 'expanded' : ''}`;

  return (
    <div onClick={() => onClick()} className={cardClass}>
      {item.attachment && item.attachment.path && item.attachment.path !== defaultImagePath && (
        <img src={item.attachment.path} alt={item.title} className="w-full h-64 object-cover mb-4" />
      )}
      <h2 className="text-lg font-semibold">{item.title || 'No Title'}</h2>
      <p>{item.description || 'No description available.'}</p>
      <p className="font-bold">Price: ${item.price ? item.price.toFixed(2) : 'N/A'}</p>
    </div>
  );
};

export default InventoryCard;