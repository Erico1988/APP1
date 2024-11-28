import React, { useState, useEffect } from 'react';
import { Plus, Filter, Calendar, Clock, AlertTriangle } from 'lucide-react';
import TaskList from '../components/tasks/TaskList';
import TaskForm from '../components/tasks/TaskForm';
import TaskFilters from '../components/tasks/TaskFilters';
import TaskStats from '../components/tasks/TaskStats';
import TaskTimeline from '../components/tasks/TaskTimeline';
import TaskPriority from '../components/tasks/TaskPriority';
import { Task, TaskStatus } from '../types/taskTypes';

const TaskManagement = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    assignee: '',
    startDate: '',
    endDate: '',
  });

  // Simuler le chargement des tâches
  useEffect(() => {
    const mockTasks: Task[] = [
      {
        id: '1',
        title: 'Mise à jour du système de gestion documentaire',
        description: 'Implémenter la nouvelle version du système GED',
        status: TaskStatus.IN_PROGRESS,
        priority: 'high',
        assignee: 'Marie Lambert',
        startDate: '2024-03-01',
        dueDate: '2024-03-15',
        progress: 65,
        category: 'IT',
        attachments: [],
        comments: [],
        subtasks: [
          { id: '1.1', title: 'Analyse des besoins', completed: true },
          { id: '1.2', title: 'Développement', completed: false },
        ],
      },
      {
        id: '2',
        title: 'Formation des utilisateurs',
        description: 'Former les utilisateurs sur le nouveau système',
        status: TaskStatus.PLANNED,
        priority: 'medium',
        assignee: 'Pierre Martin',
        startDate: '2024-03-20',
        dueDate: '2024-03-25',
        progress: 0,
        category: 'Formation',
        attachments: [],
        comments: [],
        subtasks: [],
      },
    ];
    setTasks(mockTasks);
  }, []);

  const handleCreateTask = (newTask: Task) => {
    setTasks(prev => [...prev, { ...newTask, id: Date.now().toString() }]);
    setIsFormOpen(false);
  };

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks(prev => prev.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
    setSelectedTask(null);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const filteredTasks = tasks.filter(task => {
    const matchesStatus = !filters.status || task.status === filters.status;
    const matchesPriority = !filters.priority || task.priority === filters.priority;
    const matchesAssignee = !filters.assignee || task.assignee === filters.assignee;
    const matchesStartDate = !filters.startDate || new Date(task.startDate) >= new Date(filters.startDate);
    const matchesEndDate = !filters.endDate || new Date(task.dueDate) <= new Date(filters.endDate);

    return matchesStatus && matchesPriority && matchesAssignee && matchesStartDate && matchesEndDate;
  });

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Gestion des Tâches</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
          Nouvelle Tâche
        </button>
      </div>

      <TaskStats tasks={tasks} />

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-9">
          <div className="bg-white rounded-lg shadow-md p-6">
            <TaskFilters
              filters={filters}
              onFilterChange={setFilters}
              tasks={tasks}
            />
            
            <div className="mt-6">
              <TaskList
                tasks={filteredTasks}
                onEdit={setSelectedTask}
                onDelete={handleDeleteTask}
                onUpdateStatus={handleUpdateTask}
              />
            </div>
          </div>
        </div>

        <div className="col-span-3 space-y-6">
          <TaskPriority tasks={tasks} />
          <TaskTimeline tasks={filteredTasks} />
        </div>
      </div>

      {(isFormOpen || selectedTask) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl">
            <TaskForm
              task={selectedTask}
              onSubmit={selectedTask ? handleUpdateTask : handleCreateTask}
              onCancel={() => {
                setIsFormOpen(false);
                setSelectedTask(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskManagement;