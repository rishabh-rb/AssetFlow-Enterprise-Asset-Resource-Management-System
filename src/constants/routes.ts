export const appRoutes = {
  dashboard: '/dashboard',
  organization: '/organization',
  departments: '/departments',
  categories: '/categories',
  employees: '/employees',
  assets: '/assets',
  assetRegister: '/assets/register',
  assetDetails: (id: string) => `/assets/${id}`,
  allocations: '/allocations',
  transfers: '/transfers',
  bookings: '/bookings',
  maintenance: '/maintenance',
  audits: '/audits',
  reports: '/reports',
  activity: '/activity',
  notifications: '/notifications',
  profile: '/profile',
  settings: '/settings',
};

export const authRoutes = {
  login: '/login',
  signup: '/signup',
  forgotPassword: '/forgot-password',
};
