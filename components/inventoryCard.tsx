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
}

const InventoryCard: React.FC<Props> = ({ item, uploading }) => {
  const defaultImagePath = "/path/to/default/image.png";

  return (
    <div key={item._id} className="card2 border p-4 shadow-lg rounded-lg transition duration-300 ease-in-out">
       {item.attachment && item.attachment.path && item.attachment.path !== defaultImagePath && (
        <img src={item.attachment.path} alt={item.title} className="w-full h-64 object-cover mb-4" />
      )}
      <h2 className="text-lg font-semibold">{item.title || 'No Title'}</h2>
      <p>{item.description || 'No description available.'}</p>
      <p className="font-bold">Price: ${item.price.toFixed(2)}</p>
    </div>
  );
};

export default InventoryCard;