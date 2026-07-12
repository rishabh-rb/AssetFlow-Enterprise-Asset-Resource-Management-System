import { appRoutes } from '../constants/routes';
import { Breadcrumbs, Button, Card, CardContent, CardHeader, CardTitle, PageContainer, PageHeader, SectionCard, StatusBadge, Timeline } from '../components/shared';

export function AllocationsPage() {
  return (
    <PageContainer>
      <PageHeader title="Allocations" description="Allocate, transfer, or return assets with conflict-aware workflows and a full history trail." breadcrumbs={<Breadcrumbs items={[{ label: 'Home', href: appRoutes.dashboard }, { label: 'Allocations' }]} />} action={<Button>Allocate asset</Button>} />
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <SectionCard title="Allocation workflow" description="Choose the action and resolve ownership conflicts before confirming.">
          <div className="grid gap-4 md:grid-cols-3">
            {['Allocate', 'Transfer', 'Return'].map((step) => <Card key={step}><CardContent className="p-4"><div className="text-sm text-muted-foreground">Action</div><div className="mt-1 text-lg font-semibold">{step}</div><div className="mt-3"><StatusBadge status={step === 'Return' ? 'Completed' : 'Upcoming'} /></div></CardContent></Card>)}
          </div>
          <div className="mt-4 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm text-amber-700 dark:text-amber-300">Conflict detected: this asset is already booked for the requested time window.</div>
        </SectionCard>
        <SectionCard title="Allocation history">
          <Timeline items={[{ title: 'Asset transferred', description: 'Moved from Operations to Finance.', time: '2026-07-01' }, { title: 'Return completed', description: 'Returned to shared pool after project close.', time: '2026-06-12' }, { title: 'Conflict reviewed', description: 'Booking overlap resolved by asset coordinator.', time: '2026-06-08' }]} />
        </SectionCard>
      </div>
    </PageContainer>
  );
}
