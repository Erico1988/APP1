import React, { useState, useEffect } from 'react';
import { Plus, Filter, Calendar, Clock, AlertTriangle, Search, LayoutGrid, LayoutList, SlidersHorizontal } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TaskList from '../components/tasks/TaskList';
import TaskForm from '../components/tasks/TaskForm';
import TaskStats from '../components/tasks/TaskStats';
import TaskTimeline from '../components/tasks/TaskTimeline';
import TaskPriority from '../components/tasks/TaskPriority';
import { Task, TaskStatus } from '../types/taskTypes';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    priority: '',
    assignee: '',
    category: '',
    startDate: '',
    endDate: '',
  });

  // Simulate loading tasks
  useEffect(() => {
    const mockTasks: Task[] = [
      {
        id: '1',
        title: 'Mise à jour du système de gestion documentaire',
        description: 'Implémenter la nouvelle version du système GED avec support multi-utilisateurs',
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
          { id: '1.2', title: 'Développement des fonctionnalités', completed: false },
          { id: '1.3', title: 'Tests utilisateurs', completed: false },
        ],
      },
      // Add more mock tasks here...
    ];
    setTasks(mockTasks);
  }, []);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTasks(items);
  };

  const handleCreateTask = (newTask: Task) => {
    setTasks(prev => [...prev, { ...newTask, id: Date.now().toString() }]);
    setIsFormOpen(false);
    toast.success('Tâche créée avec succès');
  };

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks(prev => prev.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
    setSelectedTask(null);
    toast.success('Tâche mise à jour avec succès');
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
    toast.success('Tâche supprimée avec succès');
  };

  const filteredTasks = tasks.filter(task => {
    const searchMatch = task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                       task.description.toLowerCase().includes(filters.search.toLowerCase());
    const statusMatch = !filters.status || task.status === filters.status;
    const priorityMatch = !filters.priority || task.priority === filters.priority;
    const assigneeMatch = !filters.assignee || task.assignee === filters.assignee;
    const categoryMatch = !filters.category || task.category === filters.category;
    const startDateMatch = !filters.startDate || new Date(task.startDate) >= new Date(filters.startDate);
    const endDateMatch = !filters.endDate || new Date(task.dueDate) <= new Date(filters.endDate);

    return searchMatch && statusMatch && priorityMatch && assigneeMatch && 
           categoryMatch && startDateMatch && endDateMatch;
  });

  const renderKanbanBoard = () => {
    const columns = Object.values(TaskStatus);
    
    return (
      <div className="flex gap-6 overflow-x-auto pb-4">
        {columns.map(status => (
          <div key={status} className="flex-shrink-0 w-80">
            <div className="bg-gray-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-700 mb-4">{status}</h3>
              <Droppable droppableId={status}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="space-y-4"
                  >
                    {filteredTasks
                      .filter(task => task.status === status)
                      .map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="bg-white rounded-lg shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow"
                            >
                              <h4 className="font-medium text-gray-900">{task.title}</h4>
                              <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                              <div className="flex items-center justify-between mt-4">
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  task.priority === 'high' ? 'bg-red-100 text-red-800' :
                                  task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-green-100 text-green-800'
                                }`}>
                                  {task.priority}
                                </span>
                                <span className="text-sm text-gray-500">{task.assignee}</span>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Gestion des Tâches</h1>
              <p className="text-gray-600 mt-1">
                {filteredTasks.length} tâche{filteredTasks.length !== 1 ? 's' : ''} au total
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center bg-white rounded-lg shadow-sm p-1">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}
                >
                  <LayoutList className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('kanban')}
                  className={`p-2 rounded ${viewMode === 'kanban' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}
                >
                  <LayoutGrid className="w-5 h-5" />
                </button>
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-2 rounded ${showFilters ? 'bg-blue-50 text-blue-600' : 'bg-white text-gray-600'} shadow-sm`}
              >
                <SlidersHorizontal className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsFormOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm"
              >
                <Plus className="w-5 h-5" />
                Nouvelle Tâche
              </button>
            </div>
          </div>

          {/* Stats */}
          <TaskStats tasks={tasks} />

          {/* Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="col-span-3">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          value={filters.search}
                          onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                          placeholder="Rechercher une tâche..."
                          className="pl-10 w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Statut
                      </label>
                      <select
                        value={filters.status}
                        onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                        className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Tous les statuts</option>
                        {Object.values(TaskStatus).map(status => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Priorité
                      </label>
                      <select
                        value={filters.priority}
                        onChange={(e) => setFilters(prev => ({ ...prev, priority: e.target.value }))}
                        className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Toutes les priorités</option>
                        <option value="high">Haute</option>
                        <option value="medium">Moyenne</option>
                        <option value="low">Basse</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Catégorie
                      </label>
                      <select
                        value={filters.category}
                        onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Toutes les catégories</option>
                        <option value="IT">IT</option>
                        <option value="Formation">Formation</option>
                        <option value="Sécurité">Sécurité</option>
                      </select>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-9">
              {viewMode === 'list' ? (
                <div className="bg-white rounded-lg shadow-sm">
                  <TaskList
                    tasks={filteredTasks}
                    onEdit={setSelectedTask}
                    onDelete={handleDeleteTask}
                    onUpdateStatus={handleUpdateTask}
                  />
                </div>
              ) : (
                renderKanbanBoard()
              )}
            </div>
            <div className="col-span-12 lg:col-span-3 space-y-6">
              <TaskPriority tasks={tasks} />
              <TaskTimeline tasks={filteredTasks} />
            </div>
          </div>
        </div>

        {/* Task Form Modal */}
        {(isFormOpen || selectedTask) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
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
    </DragDropContext>
  );
};

export default Tasks;