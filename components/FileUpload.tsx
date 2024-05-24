import React, { useState } from 'react';

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showInputs, setShowInputs] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setFile(files[0]);
      setShowInputs(true); // Enable input fields when a file is selected
    }
  };

  const handleUpload = async () => {
    if (!file) return;
  
    console.log('Uploading file:', file.name, 'Size:', file.size); // Log file name and size
  
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('description', description);

    for (var pair of formData.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); // Log FormData contents
    }
  
    const response = await fetch('/api/inventory', {
      method: 'POST',
      body: formData,
    });
  
    const data = await response.json();
    console.log('Response:', data);// Log the response from the server
    setShowInputs(false); // Log the response from the server
  };

  return (
    <div className="p-4">
      <input type="file" onChange={handleFileChange} className="mb-4" />
      {showInputs && (
        <>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            className="mb-4"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            className="mb-4"
          />
          <button onClick={handleUpload} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Submit
          </button>
        </>
      )}
    </div>
  );
};

export default FileUpload;