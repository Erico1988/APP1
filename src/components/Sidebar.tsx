import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  FileText, 
  Users, 
  Settings, 
  Calendar,
  BarChart,
  FileCheck,
  AlertCircle,
  MessageSquare,
  ChevronDown,
  ChevronRight,
  Briefcase,
  ClipboardList,
  Plane,
  UserCheck
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const [isInternalManagementOpen, setIsInternalManagementOpen] = useState(true);
  
  const mainMenuItems = [
    { icon: Home, label: 'Tableau de bord', path: '/' },
    { icon: FileText, label: 'Marchés', path: '/procedures' },
    { icon: Calendar, label: 'Planning', path: '/planning' },
    { icon: Users, label: 'Équipe', path: '/team' },
    { icon: BarChart, label: 'Rapports', path: '/reports' },
    { icon: FileCheck, label: 'Validation', path: '/validation' },
    { icon: AlertCircle, label: 'Alertes', path: '/alerts' },
    { icon: MessageSquare, label: 'Messages', path: '/chat' },
  ];

  const internalManagementItems = [
    { icon: ClipboardList, label: 'Tâches', path: '/tasks' },
    { icon: Plane, label: 'Missions', path: '/missions' },
    { icon: UserCheck, label: 'Congés', path: '/leave' },
  ];

  const isActive = (path: string) => 
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  const renderMenuItem = (item: { icon: any; label: string; path: string }) => {
    const active = isActive(item.path);
    
    return (
      <Link
        key={item.path}
        to={item.path}
        className={`flex items-center gap-3 rounded-lg p-3 transition-colors ${
          active 
            ? 'bg-gray-800 text-white' 
            : 'text-gray-300 hover:text-white hover:bg-gray-800'
        }`}
      >
        <item.icon className="w-5 h-5" />
        <span>{item.label}</span>
      </Link>
    );
  };

  return (
    <div className="w-64 h-screen bg-gray-900 text-white fixed left-0 top-0">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-8">ProcureTrack</h1>
        <nav className="space-y-2">
          {/* Main Menu Items */}
          {mainMenuItems.map(renderMenuItem)}

          {/* Internal Management Section */}
          <div className="py-2">
            <button
              onClick={() => setIsInternalManagementOpen(!isInternalManagementOpen)}
              className="w-full flex items-center justify-between text-gray-300 hover:text-white p-3 rounded-lg hover:bg-gray-800"
            >
              <div className="flex items-center gap-3">
                <Briefcase className="w-5 h-5" />
                <span>Gestion interne</span>
              </div>
              {isInternalManagementOpen ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
            
            {isInternalManagementOpen && (
              <div className="ml-4 mt-2 space-y-2 border-l border-gray-700">
                {internalManagementItems.map(item => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 rounded-lg p-3 pl-5 transition-colors ${
                      isActive(item.path)
                        ? 'bg-gray-800 text-white'
                        : 'text-gray-300 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Settings */}
          {renderMenuItem({ icon: Settings, label: 'Paramètres', path: '/settings' })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;