import { Link } from 'react-router-dom';
import { ArrowRight, Bell, CalendarRange, CircleDollarSign, History, LayoutGrid, Wrench } from 'lucide-react';
import { appRoutes } from '../constants/routes';
import { mockActivity, mockAssets, mockBookings, mockMaintenance, mockNotifications } from '../data/mock';
import { AllocationChart, AssetForecastChart, MaintenanceTrendChart, UtilizationChart } from '../components/charts';
import { ActivityCard, Badge, Breadcrumbs, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, PageContainer, PageHeader, SectionCard, StatusBadge, Timeline } from '../components/shared';

const kpis = [
  { label: 'Assets available', value: '184', icon: LayoutGrid, tone: 'text-primary' },
  { label: 'Assets allocated', value: '316', icon: CircleDollarSign, tone: 'text-emerald-600 dark:text-emerald-300' },
  { label: 'Maintenance today', value: '12', icon: Wrench, tone: 'text-amber-600 dark:text-amber-300' },
  { label: 'Upcoming returns', value: '28', icon: CalendarRange, tone: 'text-sky-600 dark:text-sky-300' },
];

export function DashboardPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Dashboard"
        description="Monitor asset availability, maintenance activity, allocations, and bookings from a single enterprise overview."
        breadcrumbs={<Breadcrumbs items={[{ label: 'Home', href: appRoutes.dashboard }, { label: 'Dashboard' }]} />}
        action={<Link to={appRoutes.assetRegister}><Button><ArrowRight className="h-4 w-4" />Register asset</Button></Link>}
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.label} className="relative overflow-hidden">
              <CardContent className="flex items-center justify-between p-5">
                <div>
                  <div className="text-sm text-muted-foreground">{kpi.label}</div>
                  <div className="mt-2 text-3xl font-semibold tracking-tight">{kpi.value}</div>
                </div>
                <div className={`rounded-2xl bg-muted/50 p-3 ${kpi.tone}`}><Icon className="h-5 w-5" /></div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <div className="grid gap-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <UtilizationChart />
            <AllocationChart />
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <MaintenanceTrendChart />
            <AssetForecastChart />
          </div>
        </div>
        <div className="grid gap-6">
          <SectionCard title="Recent activities" description="Live operational feed from your asset ecosystem." action={<Badge tone="info">Live</Badge>}>
            <div className="space-y-3">
              {mockActivity.slice(0, 4).map((item) => (
                <ActivityCard key={item.id} title={item.title} description={item.description} time={item.time} />
              ))}
            </div>
          </SectionCard>
          <SectionCard title="Notifications" description="Unread items needing your attention." action={<Link className="text-sm font-medium text-primary" to={appRoutes.notifications}>View all</Link>}>
            <div className="space-y-3">
              {mockNotifications.slice(0, 3).map((item) => (
                <div key={item.id} className="rounded-2xl border border-border bg-card p-4">
                  <div className="flex items-center justify-between gap-3">
                    <h4 className="font-medium">{item.title}</h4>
                    <span className="text-xs text-muted-foreground">{item.time}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </SectionCard>
          <SectionCard title="Quick actions" description="Start common workflows.">
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
              {[
                { label: 'Register asset', href: appRoutes.assetRegister },
                { label: 'Book resource', href: appRoutes.bookings },
                { label: 'Raise maintenance', href: appRoutes.maintenance },
                { label: 'Run audit', href: appRoutes.audits },
              ].map((item) => (
                <Link key={item.label} to={item.href} className="flex items-center justify-between rounded-2xl border border-border bg-card px-4 py-3 text-sm font-medium transition hover:border-primary/40 hover:bg-primary/5">
                  <span>{item.label}</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <SectionCard title="Upcoming returns" description="Assets scheduled to move back into circulation.">
          <div className="space-y-3">
            {mockBookings.slice(0, 3).map((booking) => (
              <div key={booking.id} className="flex items-center justify-between rounded-2xl border border-border bg-card p-4">
                <div>
                  <div className="font-medium">{booking.title}</div>
                  <div className="text-sm text-muted-foreground">{booking.asset} · {booking.time}</div>
                </div>
                <StatusBadge status={booking.status} />
              </div>
            ))}
          </div>
        </SectionCard>
        <SectionCard title="Maintenance queue" description="Work orders that need attention today.">
          <div className="space-y-3">
            {mockMaintenance.slice(0, 3).map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-2xl border border-border bg-card p-4">
                <div>
                  <div className="font-medium">{item.asset}</div>
                  <div className="text-sm text-muted-foreground">Technician {item.technician}</div>
                </div>
                <StatusBadge status={item.status} />
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </PageContainer>
  );
}
