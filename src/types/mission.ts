export enum MissionType {
  FIELD = 'FIELD',
  TRAINING = 'TRAINING',
  AUDIT = 'AUDIT'
}

export enum MissionStatus {
  PLANNED = 'PLANNED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  ON_HOLD = 'ON_HOLD',
  CANCELLED = 'CANCELLED'
}

export interface MissionDocument {
  id: string;
  name: string;
  url: string;
  type: string;
}

export interface Mission {
  id: string;
  title: string;
  type: MissionType;
  status: MissionStatus;
  startDate: string;
  endDate: string;
  location: string;
  team: string[];
  objectives: string;
  budget: number;
  progress?: number;
  documents?: MissionDocument[];
}