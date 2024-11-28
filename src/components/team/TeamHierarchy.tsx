const TeamHierarchy: React.FC<TeamHierarchyProps> = ({ members, onSelectMember }) => {
  // ... reste du code ...
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Organigramme</h3>
      <div className="space-y-2">
        {rootMembers.map(member => renderHierarchyNode(member))}
      </div>
    </div>
  );
};