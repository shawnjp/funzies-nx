import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Define an interface for the form data
interface ContactFormData {
    name: string;
    email: string;
    message: string;
}

const ContactForm: React.FC = () => {
  // Example of using the interface in a state hook
  const [formData, setFormData] = React.useState<ContactFormData>({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (result.success) {
        toast.success('Form submitted successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        toast.error('Submission failed!');
      }
    } catch (error) {
      console.error('Submission Error:', error);
      toast.error('Submission failed!');
    }
  };

  return (
    <form className="container2 grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
        <div className="col-span-1">
            <input
                type="text"
                name="name"
                id="name"
                className="form-input"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
            />
        </div>
        <div className="col-span-1">
            <input
                type="email"
                name="email"
                id="email"
                className="form-input"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
            />
        </div>
        <div className="col-span-1">
            <textarea
                name="message"
                id="message"
                className="form-input"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
            ></textarea>
        </div>
        <div className="col-span-1 flex justify-center">
            <button type="submit" className="form-button">
                Send
            </button>
        </div>
        <ToastContainer />
    </form>
  );
};

export default ContactForm;