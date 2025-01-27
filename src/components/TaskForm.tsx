import React, { useEffect, useState } from 'react';
import { Task, User } from '../types/types';

interface TaskFormProps {
  initialData?: Partial<Task>;
  onSubmit: (data: Partial<Task>) => void;
  onCancel: () => void;
  currentUser: User;
  selectedMarketReference?: string; // Ajout de la référence du marché sélectionné
}

const TaskForm: React.FC<TaskFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  currentUser,
  selectedMarketReference
}) => {
  const [formData, setFormData] = useState<Partial<Task>>(
    initialData || {
      marketRef: selectedMarketReference || '', // Remplir automatiquement la référence du marché
      title: '',
      status: 'NON_COMMENCE',
      coordination: currentUser.coordination || 'UCP',
      startDate: '',
      dueDate: '',
      duration: 0,
      assignedResource: '',
      documentName: '', // Ajout du champ pour le nom du document
      documents: [] // Ajout du champ pour les documents téléversés
    }
  );

  const isAdmin = currentUser.role === 'ADMIN_PRINCIPAL' || currentUser.role === 'ADMIN_SECONDAIRE';

  // Calcul automatique des dates et durées prévues
  useEffect(() => {
    if (formData.startDate && formData.dueDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.dueDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setFormData(prev => ({ ...prev, duration: diffDays }));
    } else if (formData.startDate && formData.duration) {
      const start = new Date(formData.startDate);
      const end = new Date(start);
      end.setDate(start.getDate() + (formData.duration || 0));
      setFormData(prev => ({ ...prev, dueDate: end.toISOString().split('T')[0] }));
    } else if (formData.dueDate && formData.duration) {
      const end = new Date(formData.dueDate);
      const start = new Date(end);
      start.setDate(end.getDate() - (formData.duration || 0));
      setFormData(prev => ({ ...prev, startDate: start.toISOString().split('T')[0] }));
    }
  }, [formData.startDate, formData.dueDate, formData.duration]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const needsApproval = currentUser.role !== 'ADMIN_PRINCIPAL' && initialData?.id;
    onSubmit({
      ...formData,
      needsApproval,
      lastModifiedBy: currentUser.id,
      description: formData.title // Assurez-vous que le titre est mappé à la description
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileList = Array.from(files).map(file => ({
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file)
      }));
      setFormData(prev => ({ ...prev, documents: [...prev.documents, ...fileList] }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Référence du marché</label>
        <input
          type="text"
          name="marketRef"
          value={formData.marketRef || ''}
          onChange={(e) => setFormData(prev => ({ ...prev, marketRef: e.target.value }))}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          readOnly
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Titre</label>
        <input
          type="text"
          name="title"
          value={formData.title || ''}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Ressource assignée</label>
        <input
          type="text"
          name="assignedResource"
          value={formData.assignedResource || ''}
          onChange={(e) => setFormData(prev => ({ ...prev, assignedResource: e.target.value }))}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Statut</label>
        <select
          name="status"
          value={formData.status || ''}
          onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="NON_COMMENCE">Non commencé</option>
          <option value="EN_COURS">En cours</option>
          <option value="TERMINE">Terminé</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Date de début prévue</label>
        <input
          type="date"
          name="startDate"
          value={formData.startDate || ''}
          onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Date de fin prévue</label>
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate || ''}
          onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Durée prévue (jours)</label>
        <input
          type="number"
          name="duration"
          value={formData.duration || ''}
          onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Nom du document</label>
        <input
          type="text"
          name="documentName"
          value={formData.documentName || ''}
          onChange={(e) => setFormData(prev => ({ ...prev, documentName: e.target.value }))}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Téléverser des documents</label>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700"
        >
          {initialData ? 'Mettre à jour' : 'Créer'}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
