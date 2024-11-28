// Mettre à jour uniquement les textes en français
const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member, onEdit, onViewDetails }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      {/* ... reste du code ... */}
      <div className="mt-4 pt-4 border-t flex justify-between">
        <button
          onClick={() => onViewDetails(member)}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          Voir les détails
        </button>
        <button
          onClick={() => onEdit(member)}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          Modifier
        </button>
      </div>
    </div>
  );
};