import users from './users.json';
import departments from './departments.json';
import assets from './assets.json';
import bookings from './bookings.json';
import maintenance from './maintenance.json';
import notifications from './notifications.json';
import activity from './activity.json';
import reports from './reports.json';
import type { ActivityItem, Asset, Booking, Department, MaintenanceRequest, NotificationItem, User } from '../types';

export const mockUsers = users as User[];
export const mockDepartments = departments as Department[];
export const mockAssets = assets as Asset[];
export const mockBookings = bookings as Booking[];
export const mockMaintenance = maintenance as MaintenanceRequest[];
export const mockNotifications = notifications as NotificationItem[];
export const mockActivity = activity as ActivityItem[];
export const mockReports = reports as {
  utilization: { name: string; value: number }[];
  maintenance: { month: string; requests: number; resolved: number }[];
  allocations: { name: string; value: number }[];
};
