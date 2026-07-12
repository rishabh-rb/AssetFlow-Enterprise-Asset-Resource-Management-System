import { Navigate } from 'react-router-dom';
import { authRoutes, appRoutes } from '../constants/routes';
import { LoginPage } from '../pages/login';
import { SignupPage } from '../pages/signup';
import { ForgotPasswordPage } from '../pages/forgot-password';
import { DashboardPage } from '../pages/dashboard';
import { OrganizationPage } from '../pages/organization';
import { DepartmentsPage } from '../pages/departments';
import { CategoriesPage } from '../pages/categories';
import { EmployeesPage } from '../pages/employees';
import { AssetsPage } from '../pages/assets';
import { AssetRegisterPage } from '../pages/assets-register';
import { AssetDetailsPage } from '../pages/asset-details';
import { AllocationsPage } from '../pages/allocations';
import { TransfersPage } from '../pages/transfers';
import { BookingsPage } from '../pages/bookings';
import { MaintenancePage } from '../pages/maintenance';
import { AuditsPage } from '../pages/audits';
import { ReportsPage } from '../pages/reports';
import { ActivityPage } from '../pages/activity';
import { NotificationsPage } from '../pages/notifications';
import { ProfilePage } from '../pages/profile';
import { SettingsPage } from '../pages/settings';
import { NotFoundPage } from '../pages/not-found';

export const routes = {
  auth: [
    { path: authRoutes.login, element: <LoginPage /> },
    { path: authRoutes.signup, element: <SignupPage /> },
    { path: authRoutes.forgotPassword, element: <ForgotPasswordPage /> },
  ],
  app: [
    { path: appRoutes.dashboard, element: <DashboardPage /> },
    { path: appRoutes.organization, element: <OrganizationPage /> },
    { path: appRoutes.departments, element: <DepartmentsPage /> },
    { path: appRoutes.categories, element: <CategoriesPage /> },
    { path: appRoutes.employees, element: <EmployeesPage /> },
    { path: appRoutes.assets, element: <AssetsPage /> },
    { path: appRoutes.assetRegister, element: <AssetRegisterPage /> },
    { path: '/assets/:id', element: <AssetDetailsPage /> },
    { path: appRoutes.allocations, element: <AllocationsPage /> },
    { path: appRoutes.transfers, element: <TransfersPage /> },
    { path: appRoutes.bookings, element: <BookingsPage /> },
    { path: appRoutes.maintenance, element: <MaintenancePage /> },
    { path: appRoutes.audits, element: <AuditsPage /> },
    { path: appRoutes.reports, element: <ReportsPage /> },
    { path: appRoutes.activity, element: <ActivityPage /> },
    { path: appRoutes.notifications, element: <NotificationsPage /> },
    { path: appRoutes.profile, element: <ProfilePage /> },
    { path: appRoutes.settings, element: <SettingsPage /> },
    { path: '/not-found', element: <NotFoundPage /> },
    { path: '*', element: <Navigate to="/not-found" replace /> },
  ],
};
