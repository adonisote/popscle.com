// ModalClient.tsx
'use client';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

function ResourceFormDialog({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-90">
      <div className="border border-slate-400 bg-black rounded-lg shadow-lg">
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button onClick={onClose} className="text-white hover:text-slate-500">
            &times;
          </button>
        </div>
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
};






export default function AddResourceForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    closeModal();
  };

  return (
    <div>
      <Button onClick={openModal} className="">
        <Plus className='mr-2 h-4 w-4' />
        Add Resource
      </Button>


      <ResourceFormDialog isOpen={isModalOpen} onClose={closeModal} title="Submit Form">
        <form onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>
          <div className="mt-6 flex justify-end">
            <Button type="button" onClick={closeModal} className="px-4 py-2  mr-2">
              Cancel
            </Button>
            <Button type="submit" className="px-4 py-2">
              Submit
            </Button>
          </div>
        </form>
      </ResourceFormDialog>
    </div>
  );
}
