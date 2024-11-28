export enum Role {
  DIRECTOR = 'Directeur',
  COORDINATOR = 'Coordinateur',
  TEAM_LEADER = 'Chef d\'équipe',
  PROJECT_MANAGER = 'Chef de projet',
  TECHNICAL_EXPERT = 'Expert technique',
  TEAM_MEMBER = 'Membre d\'équipe'
}

export enum Department {
  UCP = 'UCP',
  CIR_FIANARANTSOA = 'CIR Fianarantsoa',
  CIR_MANAKARA = 'CIR Manakara',
  CIR_FORT_DAUPHIN = 'CIR Fort-Dauphin'
}

export enum Function {
  PROCUREMENT = 'Passation des marchés',
  FINANCE = 'Finance',
  TECHNICAL = 'Technique',
  ADMINISTRATIVE = 'Administratif',
  IT = 'Informatique',
  LEGAL = 'Juridique'
}

export interface TeamMember {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: Role;
  department: Department;
  function: Function;
  technicalHierarchy?: string;
  functionalHierarchy?: string;
  reportsTo?: string[];
  subordinates?: string[];
  privileges: string[];
  tasks: string[];
  availability: boolean;
  avatar?: string;
  startDate: string;
  status: 'active' | 'inactive';
}

export interface TeamStats {
  totalMembers: number;
  byDepartment: Record<Department, number>;
  byRole: Record<Role, number>;
  byFunction: Record<Function, number>;
}