// Ajout du type User à types.ts
export interface User {
  id: string;
  email: string;
  name?: string;
  role: 'ADMIN_PRINCIPAL' | 'ADMIN_SECONDAIRE' | 'USER';
  coordination?: string;
  permissions: string[];
  createdAt?: string;
  lastLogin?: string;
  status?: 'active' | 'inactive';
}

// Le reste des types existants reste inchangé...