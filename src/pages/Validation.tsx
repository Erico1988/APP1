import React from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const Validation = () => {
  const validations = [
    {
      id: 1,
      title: 'Appel d\'offres - Équipements informatiques',
      status: 'pending',
      requester: 'Marie Lambert',
      date: '2024-03-05',
      priority: 'high',
    },
    {
      id: 2,
      title: 'Marché de services - Maintenance préventive',
      status: 'approved',
      requester: 'Pierre Martin',
      date: '2024-03-04',
      priority: 'medium',
    },
    {
      id: 3,
      title: 'Consultation - Prestations de formation',
      status: 'rejected',
      requester: 'Sophie Dubois',
      date: '2024-03-03',
      priority: 'low',
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Validation</h1>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Demandes en attente</h2>
          <div className="space-y-4">
            {validations.map((validation) => (
              <div key={validation.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  {getStatusIcon(validation.status)}
                  <div>
                    <h3 className="font-medium">{validation.title}</h3>
                    <p className="text-sm text-gray-600">
                      Demandé par {validation.requester} le {new Date(validation.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${getStatusBadge(validation.status)}`}>
                    {validation.status === 'pending' ? 'En attente' : 
                     validation.status === 'approved' ? 'Approuvé' : 'Rejeté'}
                  </span>
                  
                  {validation.status === 'pending' && (
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                        Approuver
                      </button>
                      <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                        Rejeter
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Validation;