export type ThemeMode = 'light' | 'dark';

export type AssetStatus = 'Available' | 'Allocated' | 'Maintenance' | 'Reserved' | 'Retired';
export type BookingStatus = 'Upcoming' | 'Completed' | 'Cancelled' | 'Overdue';
export type RequestStatus = 'Open' | 'In Progress' | 'Resolved' | 'Escalated';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  avatar: string;
  status: 'Active' | 'Away' | 'Offline';
}

export interface Department {
  id: string;
  name: string;
  manager: string;
  headcount: number;
  assets: number;
  budget: string;
}

export interface Asset {
  id: string;
  name: string;
  category: string;
  serialNumber: string;
  status: AssetStatus;
  location: string;
  department: string;
  condition: string;
  purchaseDate: string;
  warranty: string;
  bookable: boolean;
  value: string;
  image: string;
}

export interface Booking {
  id: string;
  title: string;
  asset: string;
  user: string;
  date: string;
  time: string;
  status: BookingStatus;
}

export interface MaintenanceRequest {
  id: string;
  asset: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: RequestStatus;
  technician: string;
  dueDate: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  group: string;
  read: boolean;
  time: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'asset' | 'booking' | 'maintenance' | 'audit' | 'system';
}
