export type RequestStatus = 'new' | 'in_progress' | 'repaired' | 'scrap';
export type RequestType = 'corrective' | 'preventive';

export interface Equipment {
  id: string;
  name: string;
  serialNumber: string;
  category: string;
  department: string;
  assignedTo?: string;
  location: string;
  purchaseDate: string;
  warrantyExpiry: string;
  maintenanceTeamId: string;
  defaultTechnicianId?: string;
  isActive: boolean;
  imageUrl?: string;
}

export interface Team {
  id: string;
  name: string;
  description: string;
  color: string;
}

export interface Technician {
  id: string;
  name: string;
  email: string;
  teamId: string;
  avatar?: string;
  phone?: string;
}

export interface MaintenanceRequest {
  id: string;
  subject: string;
  description: string;
  equipmentId: string;
  type: RequestType;
  status: RequestStatus;
  priority: 'low' | 'medium' | 'high' | 'critical';
  teamId: string;
  assignedTechnicianId?: string;
  createdBy: string;
  createdAt: string;
  scheduledDate?: string;
  completedAt?: string;
  duration?: number; // in minutes
  isOverdue: boolean;
  notes?: string;
}
