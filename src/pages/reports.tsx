import { appRoutes } from '../constants/routes';
import { Breadcrumbs, Button, Card, CardContent, PageContainer, PageHeader } from '../components/shared';
import { AssetForecastChart, AllocationChart, MaintenanceTrendChart, UtilizationChart } from '../components/charts';

export function ReportsPage() {
  return (
    <PageContainer>
      <PageHeader title="Reports" description="Operational analytics for utilization, maintenance, and allocation performance." breadcrumbs={<Breadcrumbs items={[{ label: 'Home', href: appRoutes.dashboard }, { label: 'Reports' }]} />} action={<Button>Download bundle</Button>} />
      <div className="grid gap-6 lg:grid-cols-2">
        <UtilizationChart />
        <AllocationChart />
        <MaintenanceTrendChart />
        <AssetForecastChart />
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {['PDF summary', 'CSV export', 'Department view', 'Asset view'].map((item) => <Card key={item}><CardContent className="p-5"><div className="text-sm text-muted-foreground">Download</div><div className="mt-1 text-lg font-semibold">{item}</div></CardContent></Card>)}
      </div>
    </PageContainer>
  );
}
