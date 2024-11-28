import React, { useState } from 'react';
import { Plus, Calendar, Clock, Filter, Search, LayoutGrid, LayoutList } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Leave {
  id: string;
  employeeName: string;
  startDate: string;
  endDate: string;
  type: 'CONGE_PAYE' | 'CONGE_SANS_SOLDE' | 'RTT' | 'MALADIE';
  status: 'EN_ATTENTE' | 'APPROUVE' | 'REFUSE';
  reason: string;
  duration: number;
}

const LeaveManagement = () => {
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    status: '',
    startDate: '',
    endDate: '',
  });

  // Mock data
  const leaves: Leave[] = [
    {
      id: '1',
      employeeName: 'Marie Lambert',
      startDate: '2024-03-15',
      endDate: '2024-03-20',
      type: 'CONGE_PAYE',
      status: 'APPROUVE',
      reason: 'Vacances',
      duration: 5,
    },
    {
      id: '2',
      employeeName: 'Pierre Martin',
      startDate: '2024-03-25',
      endDate: '2024-03-26',
      type: 'RTT',
      status: 'EN_ATTENTE',
      reason: 'Personnel',
      duration: 2,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROUVE':
        return 'bg-green-100 text-green-800';
      case 'REFUSE':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'CONGE_PAYE':
        return 'Congé payé';
      case 'CONGE_SANS_SOLDE':
        return 'Congé sans solde';
      case 'RTT':
        return 'RTT';
      case 'MALADIE':
        return 'Arrêt maladie';
      default:
        return type;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Congés</h1>
          <p className="text-gray-600 mt-1">
            Gérez et suivez les demandes de congés de l'équipe
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-white rounded-lg shadow-sm p-1">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${
                viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
              }`}
            >
              <LayoutList className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`p-2 rounded-lg ${
                viewMode === 'calendar' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
              }`}
            >
              <Calendar className="w-5 h-5" />
            </button>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2 rounded-lg ${
              showFilters ? 'bg-blue-50 text-blue-600' : 'bg-white text-gray-600'
            } shadow-sm`}
          >
            <Filter className="w-5 h-5" />
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-5 h-5" />
            Nouvelle demande
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">En attente</p>
              <p className="text-2xl font-bold text-yellow-600">3</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-200" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Approuvés</p>
              <p className="text-2xl font-bold text-green-600">12</p>
            </div>
            <Calendar className="w-8 h-8 text-green-200" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Refusés</p>
              <p className="text-2xl font-bold text-red-600">2</p>
            </div>
            <Clock className="w-8 h-8 text-red-200" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total jours pris</p>
              <p className="text-2xl font-bold text-blue-600">45</p>
            </div>
            <Calendar className="w-8 h-8 text-blue-200" />
          </div>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Recherche
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  className="pl-10 w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Rechercher par nom..."
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              >
                <option value="">Tous les types</option>
                <option value="CONGE_PAYE">Congé payé</option>
                <option value="CONGE_SANS_SOLDE">Congé sans solde</option>
                <option value="RTT">RTT</option>
                <option value="MALADIE">Arrêt maladie</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Statut
              </label>
              <select
                className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              >
                <option value="">Tous les statuts</option>
                <option value="EN_ATTENTE">En attente</option>
                <option value="APPROUVE">Approuvé</option>
                <option value="REFUSE">Refusé</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Période
              </label>
              <div className="flex gap-2">
                <input
                  type="date"
                  className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  value={filters.startDate}
                  onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                />
                <input
                  type="date"
                  className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  value={filters.endDate}
                  onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Leave List */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employé
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Période
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Durée
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {leaves.map((leave) => (
              <tr key={leave.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{leave.employeeName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{getTypeLabel(leave.type)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {format(new Date(leave.startDate), 'dd/MM/yyyy')} - {format(new Date(leave.endDate), 'dd/MM/yyyy')}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{leave.duration} jours</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(leave.status)}`}>
                    {leave.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-4">
                    Modifier
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveManagement;