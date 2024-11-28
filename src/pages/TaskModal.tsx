import React, { useState } from 'react';
import { Task } from '../types/types';

interface TaskModalProps {
  task: Task | null;
  onSave: (task: Task) => void;
  onClose: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ task, onSave, onClose }) => {
  const [formData, setFormData] = useState<Task>(
    task || {
      id: '',
      marketRef: '',
      marketType: '',
      title: '',
      taskType: '',
      description: '',
      status: 'NON_COMMENCE',
      priority: 'medium',
      coordination: '',
      startDate: '',
      dueDate: '',
      duration: 0,
      budget: 0,
      assignedTo: '',
      documents: [],
      createdAt: '',
      updatedAt: '',
      physicalProgress: 0,
      indicator4: false,
      indicator6: false
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <h2 className="text-lg font-bold mb-4">
          {task ? 'Modifier la tâche' : 'Ajouter une tâche'}
        </h2>
        <div className="space-y-4">
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Titre"
            className="w-full p-3 border rounded"
          />
          <input
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
            placeholder="Responsable"
            className="w-full p-3 border rounded"
          />
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          >
            <option value="high">Haute</option>
            <option value="medium">Moyenne</option>
            <option value="low">Basse</option>
          </select>
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Annuler
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
