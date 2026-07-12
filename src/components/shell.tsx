import { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Bell,
  ChevronDown,
  LayoutDashboard,
  Menu,
  MoonStar,
  Search,
  Settings,
  SunMedium,
  UserCircle,
  X,
} from 'lucide-react';
import { appRoutes, authRoutes } from '../constants/routes';
import { mockNotifications } from '../data/mock';
import { useAppContext } from '../contexts/app-context';
import { cn } from '../utils/cn';
import { Avatar, Badge, Button, Card, CardContent, CardDescription, CardHeader, Input, NotificationCard, StatusBadge } from './shared';

const navigation = [
  { label: 'Dashboard', href: appRoutes.dashboard, icon: LayoutDashboard },
  { label: 'Organization', href: appRoutes.organization, icon: UserCircle },
  { label: 'Departments', href: appRoutes.departments, icon: Settings },
  { label: 'Categories', href: appRoutes.categories, icon: Settings },
  { label: 'Employees', href: appRoutes.employees, icon: UserCircle },
  { label: 'Assets', href: appRoutes.assets, icon: LayoutDashboard },
  { label: 'Allocations', href: appRoutes.allocations, icon: LayoutDashboard },
  { label: 'Transfers', href: appRoutes.transfers, icon: LayoutDashboard },
  { label: 'Bookings', href: appRoutes.bookings, icon: LayoutDashboard },
  { label: 'Maintenance', href: appRoutes.maintenance, icon: LayoutDashboard },
  { label: 'Audits', href: appRoutes.audits, icon: LayoutDashboard },
  { label: 'Reports', href: appRoutes.reports, icon: LayoutDashboard },
  { label: 'Activity', href: appRoutes.activity, icon: LayoutDashboard },
  { label: 'Notifications', href: appRoutes.notifications, icon: Bell },
  { label: 'Profile', href: appRoutes.profile, icon: UserCircle },
  { label: 'Settings', href: appRoutes.settings, icon: Settings },
];

export function AppLayout() {
  const { sidebarOpen, setSidebarOpen, notificationsOpen, setNotificationsOpen, currentUser, theme, setTheme } = useAppContext();
  const [searchValue, setSearchValue] = useState('');
  const location = useLocation();

  useEffect(() => {
    setSidebarOpen(false);
    setNotificationsOpen(false);
  }, [location.pathname, setSidebarOpen, setNotificationsOpen]);

  const notificationCount = mockNotifications.filter((item) => !item.read).length;

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <aside className={cn('fixed inset-y-0 left-0 z-40 w-72 border-r border-border bg-card/95 backdrop-blur-xl transition-transform duration-300 lg:translate-x-0', sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0')}>
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <Link to={appRoutes.dashboard} className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">AF</div>
              <div>
                <div className="text-sm font-semibold">AssetFlow</div>
                <div className="text-xs text-muted-foreground">Enterprise ERP</div>
              </div>
            </Link>
            <button className="lg:hidden" onClick={() => setSidebarOpen(false)} aria-label="Close sidebar">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <nav className="space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition hover:bg-muted',
                        isActive ? 'bg-primary text-primary-foreground shadow-sm hover:bg-primary' : 'text-muted-foreground'
                      )
                    }
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </nav>
          </div>
          <div className="border-t border-border p-4">
            <Card className="bg-gradient-to-br from-primary/10 to-cyan-500/10 shadow-none">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold">System Status</div>
                    <CardDescription>All services operational</CardDescription>
                  </div>
                  <Badge tone="success">99.9%</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 pt-0">
                <div className="flex items-center justify-between text-sm"><span>Assets synced</span><StatusBadge status="Available" /></div>
                <div className="flex items-center justify-between text-sm"><span>Bookings live</span><StatusBadge status="Completed" /></div>
              </CardContent>
            </Card>
          </div>
        </div>
      </aside>

      <div className="flex min-h-screen flex-1 flex-col lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur-xl">
          <div className="flex items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
            <button className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card lg:hidden" onClick={() => setSidebarOpen(true)} aria-label="Open sidebar">
              <Menu className="h-5 w-5" />
            </button>
            <div className="hidden flex-1 md:block">
              <div className="relative max-w-xl">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input value={searchValue} onChange={(event) => setSearchValue(event.target.value)} placeholder="Search assets, employees, bookings..." className="pl-11" />
              </div>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                {theme === 'dark' ? <SunMedium className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
              </Button>
              <div className="relative">
                <Button variant="ghost" size="sm" onClick={() => setNotificationsOpen(!notificationsOpen)}>
                  <Bell className="h-4 w-4" />
                  <span className="ml-1 hidden sm:inline">Notifications</span>
                  {notificationCount ? <Badge className="ml-1 h-5 min-w-5 px-1 text-[10px]">{notificationCount}</Badge> : null}
                </Button>
                <AnimatePresence>
                  {notificationsOpen ? (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="absolute right-0 top-12 z-40 w-[min(92vw,420px)]">
                      <Card className="shadow-2xl shadow-slate-950/10">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-sm font-semibold">Notifications</div>
                              <CardDescription>Grouped by operational area</CardDescription>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => setNotificationsOpen(false)}>Close</Button>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          {mockNotifications.slice(0, 3).map((notification) => (
                            <NotificationCard key={notification.id} title={notification.title} description={notification.description} time={notification.time} read={notification.read} />
                          ))}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
              <Link to={authRoutes.login}>
                <Button variant="outline" size="sm">
                  Sign Out
                </Button>
              </Link>
              <div className="hidden items-center gap-3 rounded-2xl border border-border bg-card px-3 py-2 sm:flex">
                <Avatar name={currentUser.name} />
                <div className="leading-tight">
                  <div className="text-sm font-medium">{currentUser.name}</div>
                  <div className="text-xs text-muted-foreground">{currentUser.role}</div>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1">
          <Outlet />
        </main>
        <footer className="border-t border-border px-4 py-4 text-center text-sm text-muted-foreground sm:px-6 lg:px-8">
          AssetFlow © 2026. Built for enterprise asset, booking, and maintenance operations.
        </footer>
      </div>

      {sidebarOpen ? <div className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden" onClick={() => setSidebarOpen(false)} /> : null}
    </div>
  );
}

export function AuthLayout() {
  return (
    <div className="grid min-h-screen lg:grid-cols-[1.1fr_0.9fr]">
      <div className="relative hidden overflow-hidden bg-slate-950 text-white lg:block">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.35),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(34,197,94,0.3),_transparent_25%)]" />
        <div className="relative flex h-full flex-col justify-between p-10">
          <div>
            <div className="flex items-center gap-3 text-lg font-semibold">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-slate-950">AF</div>
              AssetFlow
            </div>
            <p className="mt-8 max-w-xl text-4xl font-semibold leading-tight tracking-tight">Enterprise asset and resource operations, without the clutter.</p>
            <p className="mt-4 max-w-lg text-base text-white/70">A polished ERP interface for assets, allocations, maintenance, bookings, audits, and reporting.</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {['Assets synced', 'Bookings managed', 'Maintenance clear'].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <div className="text-sm text-white/70">{item}</div>
                <div className="mt-2 text-2xl font-semibold">100%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
