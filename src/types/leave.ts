export enum LeaveType {
  PAID = 'PAID',
  UNPAID = 'UNPAID',
  RTT = 'RTT',
  SICK = 'SICK',
}

export enum LeaveStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export interface LeaveDocument {
  id: string;
  name: string;
  url: string;
  type: string;
}

export interface LeaveRequest {
  id?: string;
  employee?: string;
  type: LeaveType;
  startDate: string;
  endDate: string;
  status?: LeaveStatus;
  reason: string;
  documents?: LeaveDocument[];
  createdAt?: string;
  updatedAt?: string;
}