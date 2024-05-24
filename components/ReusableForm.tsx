import React, { useState } from 'react';

interface Props {
  onSubmit: (formData: FormData) => void;
  collectionName: string;
}

const ReusableForm: React.FC<Props> = ({ onSubmit, collectionName }) => {
  const [file, setFile] = useState<File | null>(null);
  const [fields, setFields] = useState<{ [key: string]: string }>({});
  const [showForm, setShowForm] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setFile(files[0]);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields({
      ...fields,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    }
    Object.keys(fields).forEach(key => {
      formData.append(key, fields[key]);
    });
    formData.append('collectionName', collectionName);
    onSubmit(formData);
    setShowForm(false);
  };


  return (
    <div className={`fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full ${!showForm && 'hidden'}`}>
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">Upload File</h3>
          <div className="mt-2 px-7 py-3">
            <input type="file" onChange={handleFileChange} className="mb-4" />
            <input
              type="text"
              name="title"
              value={fields.title || ''}
              onChange={handleChange}
              placeholder="Enter title"
              className="mb-4"
            />
            <textarea
              name="description"
              value={fields.description || ''}
              onChange={handleChange}
              placeholder="Enter description"
              className="mb-4"
            />
            <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReusableForm;