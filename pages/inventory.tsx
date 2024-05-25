import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import InventoryCard from '../components/inventoryCard';
import Modal from '../components/Modal';

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

const Inventory: NextPage = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [isAdmin, setIsAdmin] = useState(false); // This should be determined by user authentication status
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  useEffect(() => {
    fetchInventory();
    checkAdminStatus();
  }, []);

  const handleCardClick = (_id: string) => {
    console.log("Clicked item ID:", _id);  // Log the _id of the clicked item
    const item = inventory.find(item => item._id === _id);
    setSelectedItem(item || null);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  const fetchInventory = async () => {
    try {
      const response = await fetch('/api/inventory', { method: 'GET' });
      const data = await response.json();
      setInventory(data);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const checkAdminStatus = async () => {
    // Replace this with actual authentication logic
    setIsAdmin(true);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async (itemId: string) => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('itemId', itemId);

    setUploading(true);
    try {
      const response = await fetch(`/api/inventory/${itemId}/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setUploading(false);
      fetchInventory(); // Refresh inventory list to show new attachment
    } catch (error) {
      console.error('Upload failed:', error);
      setUploading(false);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <div className="container mx-auto px-4">
      <h1 className="text-xl font-bold my-4">Inventory Catalog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {inventory.map(item => (
          <InventoryCard
            key={item._id}
            item={item}
            isAdmin={isAdmin}
            handleFileChange={handleFileChange}
            handleUpload={handleUpload}
            uploading={uploading}
            onClick={() => handleCardClick(item._id)}
            expanded={expandedId === item._id}
          />
        ))}
      </div>
      <Modal isOpen={!!selectedItem} onClose={handleCloseModal}>
        {selectedItem && <InventoryCard
          onClick={() => {}}
          expanded={false}
          item={selectedItem}
          isAdmin={isAdmin}
          handleFileChange={handleFileChange}
          handleUpload={handleUpload}
          uploading={uploading}
        />}
      </Modal>
    </div>
  );
};

export default Inventory;