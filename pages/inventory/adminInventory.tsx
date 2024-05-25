import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import InventoryCard from '../../components/inventoryCard';
import Modal from '../../components/Modal';

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
  const [isEditing, setIsEditing] = useState(false);
  
  useEffect(() => {
    fetchInventory();
    checkAdminStatus();
  }, []);

  const handleCardClick = (_id: string) => {
    console.log("Clicked item ID:", _id);  // Log the _id of the clicked item
    const item = inventory.find(item => item._id === _id);
    setSelectedItem(item || null);
    setIsEditing(true);
  };

  const handleCloseModal = () => {
    console.log("Closing modal");
    setIsEditing(false);
    setSelectedItem(null);
  };

  const handleSave = async (item: InventoryItem) => {
    // Implement save logic here, either update or add new item
    setIsEditing(false);
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
      <button onClick={() => { setSelectedItem(null); setIsEditing(true); }} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Add New Item
      </button>
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
      {isEditing && (
        <Modal isOpen={isEditing} onClose={handleCloseModal}>
            <div className="flex">
            <div className="w-1/2 p-4">
        {selectedItem && (
            <InventoryCard
            item={selectedItem}
            isAdmin={isAdmin}
            onClick={() => {}}
            expanded={false}
            handleFileChange={() => {}}  // Dummy function
            handleUpload={() => {}}      // Dummy function
            uploading={false}            // Default value
            />
        )}
        </div>
      <form onSubmit={(e) => { e.preventDefault(); handleSave(selectedItem!); }} className="w-1/2 p-4 flex flex-col justify-center items-center">
      <div className="col-span-1 flex justify-center">
        <div className="mb-4">
          <label className="block text-sm font-medium text-white text-center">Title</label>
          <input type="text" value={selectedItem?.title || ''} onChange={(e) => setSelectedItem({...selectedItem!, title: e.target.value})} placeholder="Edit Title" className="form-input mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-white text-center">Price</label>
          <input type="number" value={selectedItem?.price || 0} onChange={(e) => setSelectedItem({...selectedItem!, price: parseFloat(e.target.value)})} placeholder="Edit Price" className="form-input mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-white text-center">Stock</label>
          <input type="number" value={selectedItem?.stock || 0} onChange={(e) => setSelectedItem({...selectedItem!, stock: parseInt(e.target.value, 10)})} placeholder="Edit Stock" className="form-input mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div className="mb-4">       
        <button type="submit" className="form-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Save Changes
        </button>
        </div>
        </div> 
      </form>
    </div>
  </Modal>
)}
    </div>
  );
};

export default Inventory;